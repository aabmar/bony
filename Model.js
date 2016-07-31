/*jshint browserify: true */
"use strict";

var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
    idAttribute: "_id",

    initialize: function(attributes, options){
        Backbone.Model.prototype.initialize.call(this, attributes, options);

        var me = this;
        this.listenTo(this, "change", function(){
            this.dirty = true;
        });
        this.listenTo(this, "sync", function(){
            this.dirty = false;
        });
    },

    save: function(attributes, options){
        if(!this.dirty) return;
        Backbone.Model.prototype.save.call(this, attributes, options);
    }


});