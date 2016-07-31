var Component = require("../../Component");

module.exports = Component.extend({
    tagName: "form",
    className: "form",
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("Form must have option 'collection'.");
        if(!this.options.rowClass) throw new Error("Form must have option 'rowClass'.");

        this.listenTo(this.collection, "add", this._add);
        this.listenTo(this.collection, "remove", this._remove);
        this.listenTo(this.collection, "reset", this._reset);

        // Add initial models
        for(var i = 0; i < this.collection.length; i++) this._add(this.collection.at(i));
    },

    _add: function(model){
        var row = new this.options.rowClass({
            model: model,
            template: this.itemTemplate
        });
        this.addComponent(row);
    },

    _remove: function(i){
        this.removeComponent(i);
    },

    _reset: function(){
        this.clearComponents();
    },

    save: function(){
        for(var i = 0; i < this.collection.length; i++){
            this.collection.at(i).save();
        }
    }

});