SVGComic
--------

SVGComic is a Dynamic SVG-based Webcomic-generating JavaScript Engine.

DEPENDENCIES
------------

SVGComic is dependent on d3.js (http://d3js.org/). Please have this library loaded before you use SVGComic.

USAGE
-----

You include the svg-comic.js script into your SVG and then create a new SCRIPT block for your code. See the included sample for a suggested usage.

First, create the comic object:

    var comic = new SVGComic(selector, {ARG : 'VALUE'});

Options include:

* author    : The author (you!), defaults to A. N. Onymous
* copyright : Copyright (or -left), defaults to "© YYYY AUTHOR. All rights reserved"
* fill      : Color of the background/gutters, defaults to black
* fontSize  : Preferred font size, defaults to 12
* height    : Preferred comic height, defaults to 300
* subtitle  : The subtitle, or epsiode title, defaults to blank
* textColor : Preferred text color for title, et al, defaults to white
* title     : Preferred title, defaults to 'SVGComic'
* width     : Preferred comic width, defaults to 800
* xGutter   : Preferred gutter width, defaults to 10

Then create panels:

    comic.addPanel({ARG : 'VALUE'});

(This sets comic.panel to be the latest created panel).

Options include:

* width  : Preferred panel width, defaults to remaining available space
* height : Preferred panel height, defaults to comic height minus yGutter
* x      : Preferred x location of panel, defaults to next available spot
* y      : Preferred y location of panel, defaults to top minus yGutter
* fill   : Preferred panel color, defaults to aliceblue

Then, create characters:

    comic.panel.addCharacter({ARG : 'VALUE'});

(This sets panel.character to be latest created character).

Options include:

* resource  : URL for SVG character file, defaults to a circley guy
* vAlign    : Vertical align (bottom, middle, top), defaults to bottom
* hAlign    : Horizontal align (left, center, right), defaults to left
* direction : Direction character is facing (left, right), defaults to left
* x         : Character's x-position, defaults to 0
* y         : Character's y-position, defaults to 0

Then, when you're done creating panels and characters:

    comic.draw();

(This isn't necessary, but usually catches anything I overlooked, unless I overlooked it...)

BUT WHY?
--------

Why not?

TO DO
-----

 1. Add dialogue
