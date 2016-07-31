// var Component = require("../../Component");
var Input = require("./Input");

/**
 * A simple button class. When clicked, it triggers a "click" event.
 *
 * Options:
 *
 * - template: Template to render or text to show
 * - key: variable to give as parameter on click event. (Optional)
 */
module.exports = Input.extend({
    tagName: "textarea",
    className: "form-input",
    template: "x",
    events:{
        "change": "domChange"
    },

    initialize: function(options){
        Input.prototype.initialize.call(this, options);
        var value = this.model.get(this.options.field);
        this.template = value || " ";
    },

    // domChange: function(e){
    //     var value = $(e.currentTarget).val();
    //     this.model.set(this.options.field, value);
    //     if(this.options.autoSave) this.model.save();
    // },

    // modelChange: function(e){
    //     var value = this.model.get(this.options.field);
    //     var me = this;
    //     this.dirty(function(){
    //         me.$el.val(value);    
    //     });        
    // },

    // clean: function(){
    //     var me = this;
    //     this.trigger("sync", this.model, this.options.field);
    //     this.dirty(function(){
    //         me.$el.removeClass("dirty");
    //     });
    // }
});
