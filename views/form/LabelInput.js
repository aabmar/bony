var Component = require("../../Component");

var Label = require("./Label");
var Input = require("./Input");

/**
 * Bundles Input field and Label
 *
 * Options:
 *
 * - template: Template to render or text to show
 * - key: variable to give as parameter on click event. (Optional)
 */
module.exports = Component.extend({
    tagName: "section",
    className: "form-group",
    InputClass: Input,
    initialize: function(options){
        var attributes = this.attributes;
        delete this.attributes;
        Component.prototype.initialize.call(this, options);
        if(!options.model) throw new Error("LabelInput must have option 'model'.");
        if(!options.field) throw new Error("LabelInput must have option 'field'.");
        if(!options.label) throw new Error("LabelInput must have option 'label'.");
        if(options.InputClass) this.InputClass = options.InputClass;

        var wrapper = new Component({className: "form-input-wrapper"});

        this.input = new this.InputClass({
            model: options.model,
            field: options.field,
            attributes: attributes
        });

        this.label = new Label({
            'for': this.input,
            label: options.label
        });

        wrapper.addComponent(this.input);
        this.addComponent(this.label);
        this.addComponent(wrapper);
    }
});
