/*jshint browserify: true */
"use strict";

var Backbone = require("backbone");
var Model = require("./Model");
var _ = require("underscore");

module.exports = Backbone.Collection.extend({

    initialize: function(options){
        options = options || {};
        Backbone.Collection.prototype.initialize.apply(this, arguments);
        this.cacheKey = (this.url ? "C#" + this.url : undefined);
        if(options.cache !== false){
            this.loadCache();
            this.listenTo(this, "sync", this.saveCache);
        } 
        
        if(this.model === Backbone.Model) this.model = Model;
    },

    sync: function(method, model, options){
        var lastModified = 0;
        this.each(function(m){
            var time = m.get("last_modify_time");
            if(time > lastModified) lastModified = time;
        });

        if(lastModified){
            if(!options) options = {};
            if(!options.headers) options.headers = {};
            options.headers["If-Modified-Since"] = new Date(lastModified);
        }
        return Backbone.sync.call(this, method, model, options);
    },

    loadCache: function(){
        if(!this.cacheKey) return;

        var me = this;
        _.defer(function(){
            var cache = window.localStorage.getItem(me.cacheKey);
            if(cache){
                var data = JSON.parse(cache);
                me.set(data);
            }
        });
    },

    saveCache: function(){
        if(!this.cacheKey) return;

        var data = this.toJSON();
        var string = JSON.stringify(data);
        window.localStorage.setItem(this.cacheKey, string);
    },

});
