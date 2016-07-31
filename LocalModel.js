/*jshint browserify: true */
"use strict";

var Model = require("./Model");

// The LocalModel is not saved to the server, only to LocalStorage
module.exports = Model.extend({
    save: function(){
        if(!this.collection) return;
        this.collection.saveCache();
    }
});