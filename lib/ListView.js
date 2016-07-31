/*jshint browserify: true */
"use strict";

var Component = require("./Component");

module.exports = Component.extend({
    tagName: "ul",
    className: "list",
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("ListView must have option collection.");
        if(!this.options.itemClass) this.options.itemClass = require("./ItemView");
        if(!this.itemTemplate) throw new Error("ListView must have option itemTemplate.");

        this.listenTo(this.collection, "add", this._add);
        this.listenTo(this.collection, "remove", this._remove);
        this.listenTo(this.collection, "reset", this._reset);

        // Add initial models
        this.collection.each(this._add, this);
    },

    _add: function(model){
        var item = new this.options.itemClass({
            model: model,
            template: this.itemTemplate
        });
        this.addComponent(item);
    },

    _remove: function(i){
        this.removeComponent(i);
    },

    _reset: function(){
        this.clearComponents();
    }

});
