

Bony
====

Fast rendering Backbone toolkit.


Background
----------

Bony is a small library adding rendering to Backbone. It uses a diff based algorithm running all changes done during an animation frame in the following animation frame. The goal is to prove that Backbone.js can render as fast as React.js and follow the "reactive programming" paradigm.


Usage
-----

The library is only made for use with browserify for now.

The base view of Bony is called "Component". It can operate in two modes:

1. As a parent component to several sub component.
2. As a component to be rendered.

Two view classes is bundled with Bony:

-   ListView

    Takes a collection, item class and item template, and will mirror the collection with one item per model.

-   ItemView

    Takes a model and a template and will render the template with data from the model.


Both views will update when data is changed in a model or a collection. All things to be changed on screen is to be done on model/collection level.


Implement your own view
-----------------------

__Never call .render() on a view. Call .dirty()__ to mark the component for rendering. The render function will be called during the next animation frame.
