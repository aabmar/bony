var Component = require("../Component");
var Button = require("./Button");

/**
 * Create a menu from a Collection.
 *
 * Options:
 *
 * - list: A list of objects to show in the menu.
 * - keyField: Which field to use for the callback ID when item is clicked (default: '_id').
 * - valueField: Which field to display in the menu (default: 'name').
 * - itemTemplate: A template to render for each menu item (default: undefined, use text from valueField).
 * - itemClass: Which class to use for the items (default: Button).
 * - selected: Which component to select from the start (number).
 * - selectable: Maintain a selected component.
 */
module.exports = Component.extend({
    tagName: "ul",
    className: "menu",
    initialize: function(options) {
        this.itemTemplate = options.itemTemplate;
        Component.prototype.initialize.call(this, options);
        if (!this.options.list) throw new Error("Menu must have option list.");
        this.keyField = this.options.keyField || "_id";
        this.valueField = this.options.valueField || "name";
        this.ItemClass = this.options.itemClass || Button;
        for (var i = 0; i < this.options.list.length; i++) {
            this._add(this.options.list[i], this.selected === i);
        }

        if ("number" === typeof this.options.selected) {
            this.select(this.options.selected);
        }
    },

    _add: function(item, selected) {
        var value = item[this.valueField];
        var key = item[this.keyField];
        var template = this.itemTemplate || value;

        var button = new this.ItemClass({
            key: key,
            template: template,
            tagName: "li",
            className: "item",
            data: {
                item: item
            }
        });
        this.listenTo(button, "click", this.click);
        this.addComponent(button);
    },

    select: function(i) {
        if (!this.options.selectable) return;
        if (this.selected) this.selected.deselect();

        if ("number" === typeof i) {
            if (i < 0 || i >= this.components.length) return;
            this.selected = this.components[i];
        } else {
            this.selected = i;
        }
        this.selected.select();
    },

    click: function(key, source) {
        this.select(source);
        this.trigger("click", key);
    }
});