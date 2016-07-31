(function (window) {
    
    // Import dependencies
    var $ =require("jquery");
    var _ = require("underscore");
    
    var Backbone = require("backbone");
    var Model = Backbone["Model"];
    var Collection = Backbone["Collection"];
    var View = Backbone["View"];
    var Component = require("../lib/Component");
    var ListView = require("../lib/Component");
    var ItemView = require("../lib/Component");
    var Handlebars = window["Handlebars"];

    var App = Component.extend({
    
        initialize: function(options){
            Component.prototype.initialize.call(this, options);

            this.parseTemplates();

            this.collection = new Collection([
                {name: "Marius", age: 39},
                {name: "Matias", age: 24},
                {name: "Thomas", age: 25},
                {name: "Jesper", age: 31},
                {name: "Halfdan", age: 26}
            ]);

            var page = new Component({tagName: "article", className: "page bony_page"});

            page.addComponent(new App.Header());

            page.addComponent(new ListView({
                collection: this.collection,
                itemClass: ItemView
            }));

            this.addComponent(page);

        },
    
        parseTemplates: function(){
            var els = $('script[type="text/template"]');
            for(var i = 0; i < els.length; i++){
                var template = els[i];
                var id = template.id;
                var source = template.innerHTML;
                window.templates[id] = Handlebars.compile(source);
                console.log(id);
                template.remove();
            }
        }
    });

    App.Header = Component.extend({
        template: "header",
        tagName: "header"
    });



    $(function(){
        var body = $("body").html("");
        window.app = new App({el: body});
    });

}(window));