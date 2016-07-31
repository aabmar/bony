/*jshint browserify: true */
"use strict";

var Component = require("bony/Component");
var Backbone = require("backbone");
var _ = require("underscore");

module.exports = Component.extend({

    initialize: function(options) {
        Component.prototype.initialize.call(this, options);

        this.router = options.router || new Backbone.Router();

        // Build routes
        // Using router.route here to name the route. Backbone does not give the routes names when
        // passing them as an object.
        if (this.options.routes) {
            for(var route in this.options.routes){
                var Page = this.options.routes[route];
                this.router.route(route, route, this.makeRouteFunction(Page));
            }
        }


        Backbone.history.start();
    },

    displayPage: function(Page, args) {
        this.clearComponents();
        var page = new Page({app: this}, args);
        this.addComponent(page);
    },

    makeRouteFunction: function(Page){
        var app = this;

        return function(){
            var args = arguments;
            _.defer(function(){
                app.displayPage(Page, args);
            });
        };
    }

});
