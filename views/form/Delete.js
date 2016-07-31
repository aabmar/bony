var Component = require("../../Component");

/**
 * An HTML Label.
 *
 * Give the input element as option "for".
 *
 * Options:
 * - for: An input element
 * - label: The text to show. If not given, Label will look at "for.label".
 */

module.exports = Component.extend({
    tagName: "button",
    className: "form-delete",
    template: "X",
    attributes: {
        type: "button"
    },
    events: {
        "click": "click"
    },
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.model) throw new Error("Delete require options 'model'.");
    },
    click: function(options){
        var del = confirm("Er du sikker på at du vil slette?");
        if(del) this.model.destroy();
    }

});
