var Component = require("../Component");

var ItemView = module.exports = Component.extend({
    tagName: "li",
    className: "item",
    events:{
        "click .destroy": "destroy",
        "click .remove": "rem",
    },
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.model) throw new Error("ItemView must have parameter model.");
        if(!this.template) throw new Error("ItemView must have parameter template.");
        this.listenTo(this.model, "change", this.dirty);
    },
    del: function(){
        this.model.destroy();
    },
    rem: function(){
        this.model.collection.remove(this.model);
    }
});
