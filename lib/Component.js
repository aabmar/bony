/*jshint browserify: true */
"use strict";

// Require components
var Backbone = require("backbone");
var View = Backbone.View;
var Model = Backbone.Model;
var Collection = Backbone.Collection;
var _ = require("underscore");

// Globals
var windowComponent = windowComponent;
var animRequested = false;

// Component
// ------------------
//
// Component is an implementation of Backbone.View. The View in Backbone
// is very slim, and contains no rendering logic.
//
// A Component can have child components. Use addComponent() and
// removeComponent() to add and remove children.
//
// If a component has children, it can not have a template.
//
// Never call .render() on a Component instance. Call .dirty() instead. This
// will mark the component for rendering, and on the next animation frame,
// it will be rendered together with all other dirty components.
//
// The .build() function handles all the logic of rendering dirty components.
//
// If you want to change something, instead of re-render everything, on next
// animation frame, call .dirty() with a function containing what to do.
// If this happens, operations will be performed.
// If called several times, functions will be added to a queue.
// Should not be used in combination with .dirty() without a function. If
// you do, operations will be performed first, then the render will happen.
//
// Note: If the dirty flag is set, functions will not be added to the queue,
// and when the dirty flag is set, the queue is emptied.
//
//
// Other behaviours to be avare of:
//
//
// -   If you override .initialize(), make sure you call:
//
//     ````
//     Component.prototype.initialize.call(this, options);
//     ````
//
//     on the first line of your .initialize();
//
//  Supported options:
//      - template
//      - itemTemplate
//      - data
//      - model
//      - collection
//      - el
//      - $el
//
//
var Component = module.exports = View.extend({

    initialize: function(options){

        this.options = options || {};
        if(typeof this.options.template !== "undefined") {
            this.template = this.options.template;
            this.options.template = undefined;
        }

        if(typeof this.options.itemTemplate !== "undefined") {
            this.itemTemplate = this.options.itemTemplate;
            this.options.itemTemplate = undefined;
        }

        if(typeof this.template === "undefined"){
            this.components = [];
        } else {
            this.data = this.options.data || {};
            this.components = undefined;
        }

        if(!windowComponent) windowComponent = this;

        if("function" === this.init) this.init();

        this.dirty();

        return this;
    },

    /**
     * Add a component. You can also add  (tagName*, className, template), and a component will be created.
     * @param {Component|String} component A Bony Component (or a tagName)
     * @param {String} className Only used if parameter 1 is a tagName.
     * @param {Template|String} template Only used if parameter 1 is a tagName.
     */
    addComponent: function(component, className, template){
        if(!this.components) throw new Error("Component.addComponent() called on a component with a template.");

        if("string" === typeof component){
            component = new Component({
                tagName: component,
                className: className || "",
                template: template
            });
        }

        component.parent = this;

        this.components.push(component);
        this.dirty(function(){
            this.$el.append(component.$el);
        });

        return this;
    },

    /**
     * Replace Component: Transist out and Transist in
     * @todo Implement transition.
     */

    replaceComponent: function(component){
        this.clearComponents();
        this.addComponent(component);

        return this;
    },

    removeComponent: function(component){
        if(!this.components) throw new Error("Component.removeComponent() called on a component with a template.");

        if(component instanceof Model){
            for(var i = 0; i < this.components.length; i++){
                if(this.components[i].model == component){
                    component = this.components[i];
                    break;
                }
            }
        }
        var pos = this.components.indexOf(component);
        if(pos === -1) throw new Error("Component.removeComponent(component) Component does not exist:", component);
        this.removeComponentAt(pos);

        return this;
    },

    clearComponents: function(){
        while(this.components.length > 0){
            this.removeComponentAt(this.components.length - 1);
        }

        return this;
    },

    removeComponentAt: function(pos){
        if(!this.components) throw new Error("Component.removeComponent() called on a component with a template.");
        var component = this.components.splice(pos, 1)[0];
        component.stopListening();
        if(component.components) component.clearComponents();
        this.dirty(function(){
            component.remove();
        });

        return this;
    },

    dirty: function(operator){

        if("function" === typeof operator){
            if(!this.dirtyQueue) this.dirtyQueue = [];
            this.dirtyQueue.push(operator);
        } else {
            this.isDirty = true;
        }

        // We are the window element, and must trigger an animation
        // frame if not already done
        if(!animRequested){
            animRequested = true;
            var me = this;
            _.defer(function(){
                window.requestAnimationFrame(function(){
                    var now = Date.now();
                    windowComponent.build();
                    animRequested = false;
                    if(console && console.log) console.log("Component.dirty() #animationFrame --- spent: ", (Date.now() - now));
                });
            });
        }

        return this;
    },

    build: function(){

        // A components can either have a template or supcomponents
        if(this.components && this.template) throw new Error("Component can have either template, or child components.");

        // Run the queue
        if(this.dirtyQueue && this.dirtyQueue.length > 0){
            var operator;
            while( (operator = this.dirtyQueue.shift()) ){
                operator.call(this);
            }
        }

        if(typeof this.template !== "undefined") {
            if(this.isDirty) this.render();
        } else {
            for(var i = 0; i < this.components.length; i++){
                var component = this.components[i];
                component.build();
            }
        }

        this.isDirty = false;
        this.isBuilt = true;

        return this;
    },

    render: function(){
        if(!this.template){
            this.$el.html("");
            return;
        }
        if("string" === typeof this.template){
            this.$el.html(this.template);
            return;
        }

        if(this.model) this.data.item = this.model.toJSON();
        if(this.collection) this.data.list = this.collection.toJSON();

        var html = this.template(this.data);
        this.$el.html(html);

        return this;
    }

});
