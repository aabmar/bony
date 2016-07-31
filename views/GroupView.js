var Component = require("../Component");
var ListView = require("./ListView");
var ItemView = require("./ItemView");
var Collection = require("../Collection");
var Model = require("../Model");

module.exports = Component.extend({
    tagName: "ul",
    className: "list",
    initialize: function(options){
        Component.prototype.initialize.call(this, options);
        if(!this.collection) throw new Error("Backbone.GroupView must have option collection.");
        if(!this.options.itemClass) this.options.itemClass = ItemView;
        if(!this.itemTemplate) throw new Error("Backbone.GroupView must have option itemTemplate.");
        if(!options.groupBy) throw new Error("Backbone.GroupView must have option groupBy.");
        if(!options.itemHeaderTemplate) throw new Error("Backbone.GroupView must have option itemHeaderTemplate.");

        this.groupBy = options.groupBy;
        this.itemHeaderTemplate = options.itemHeaderTemplate;

        this.listenTo(this.collection, "add", this._add);
        this.listenTo(this.collection, "remove", this._remove);
        this.listenTo(this.collection, "reset", this._reset);

        this._reset();
    },

    _add: function(model){

        var group = model.get(this.groupBy);
        var groupView = this.groupViews[group];
        var x, y;

        if(!groupView){
            var li = new Component({
                tagName: "li"
            });
            groupView = new ListView({
                collection: new Collection(),
                itemTemplate: this.itemTemplate,
                itemClass: this.options.itemClass
            });
            this.groupViews[group] = groupView;
            this.addComponent(new Component({
                tagName: "li",
                template: this.itemHeaderTemplate,
                model: new Model({title: group})
            }));
            li.addComponent(groupView);
            this.addComponent(li);
        }

        groupView.collection.add(model);
    },

    _remove: function(){
        // TODO: Optimize (find correct groupView and remove from that view)
        this._reset();
    },

    _reset: function(){
        this.clearComponents();
        this.groupViews = {};

        // Add initial models
        this.collection.each(this._add, this);
    }

});
