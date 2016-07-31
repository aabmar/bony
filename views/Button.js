var Component = require("../Component");

/**
 * A simple button class. When clicked, it triggers a "click" event.
 *
 * Options:
 *
 * - template: Template to render or text to show
 * - key: variable to give as parameter on click event. (Optional)
 */
module.exports = Component.extend({
    tagName: "button",
    className: "btn",
    events:{
        "click": "click"
    },
    attributes: {
        type: "button"
    },
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.template) throw new Error("Button must have option template.");
    },

    select: function(s){
        if(s === false) return this.deselect();
        var me = this;
        this.dirty(function(){
            me.$el.addClass("selected");
        });
    },

    deselect: function(){
        var me = this;
        this.dirty(function(){
            me.$el.removeClass("selected");
        });
    },

    click: function(){
        this.trigger("click", this.options.key, this);
    }
});
