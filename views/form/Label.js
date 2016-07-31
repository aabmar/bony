var Component = require("../../Component");

/**
 * An HTML Label.
 *
 * Give the input element as option "for".
 *
 * Options:
 * - for: An input element
 * - label: The text to show. If not given, Label will look at "for.label".
 */

module.exports = Component.extend({
    tagName: "label",
    className: "form-label",
    attributes: {},
    initialize: function(options){
        if(!options.for) throw new Error("Labels require options 'for' = input element");
        this.attributes.for = options.for.cid;
        this.template = options.label || options.for.label;
        Component.prototype.initialize.call(this, options);
    },

});
