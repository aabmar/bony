/*jshint browserify: true */
"use strict";

// Import dependencies
var $ = require("jquery");
var App = require("./App.js");

// Wait for page ready
$(function(){
    var body = $("body").html("");

    var app = new App({
        el: body
    });

    // HACK: just to ease debugging
    window.app = app;
});

