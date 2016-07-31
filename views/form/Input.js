var Component = require("../../Component");

/**
 * A simple button class. When clicked, it triggers a "click" event.
 *
 * Options:
 *
 * - template: Template to render or text to show
 * - key: variable to give as parameter on click event. (Optional)
 */
module.exports = Component.extend({
    tagName: "input",
    className: "form-input",
    template: "x",
    events:{
        "change": "domChange"
    },

    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.model) throw new Error("Input must have option 'model'.");
        if(!this.options.field) throw new Error("Input must have option 'field'.");
        this.label = this.options.label || this.options.field;
        this.listenTo(this.model, "change:" + this.options.field, this.modelChange);
        this.modelChange();

    },

    domChange: function(e){
        var value = $(e.currentTarget).val();
        this.model.set(this.options.field, value);
        if(this.options.autoSave) this.model.save();
    },

    modelChange: function(e){
        var value = this.model.get(this.options.field);
        var me = this;
        this.dirty(function(){
            me.$el.val(value);    
        });        
    },

    clean: function(){
        var me = this;
        this.trigger("sync", this.model, this.options.field);
        this.dirty(function(){
            me.$el.removeClass("dirty");
        });
    }
});
