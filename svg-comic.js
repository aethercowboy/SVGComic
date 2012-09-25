// svg-comic.js

//**************************************************************************//
// (c) 2011 Jacob P. Silvia.                                                //
// Licensed under the Apache License, Version 2.0 (the "License");          //
// you may not use this file except in compliance with the License.         //
// You may obtain a copy of the License at                                  //
//                                                                          //
//     http://www.apache.org/licenses/LICENSE-2.0                           //
//                                                                          //
// Unless required by applicable law or agreed to in writing, software      //
// distributed under this License is distributed on as "AS IS" BASIS,       //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. //
// See the License for the specific language governing permissions and      //
// limitations under the License.                                           //
//**************************************************************************//

function SVGComic(evt, opts) {
  /// <summary>The main SVGComic object</summary>
  /// <param name="evt">The calling event</param>
  /// <param name="opts">The desired options</param>
  /// <option name="author">The author's name (defaults to A. N. Onymous)</option>
  /// <option name="copyright">The preferred copyright statement (defaults to "&copy YEAR AUTHOR. All rights 
  /// reserved")</option>
  /// <option name="fill">Preferred gutter color (defaults to black)</option>
  /// <option name="fontSize">Preferred font size for title/author/subtitle/copyright (defaults to 12)</option>
  /// <option name="height">Preferred comic height (defaults to 300)</option>
  /// <option name="subtitle">Preferred secondary/episode title (defaults to blank)</option>
  /// <option name="textColor">Preferred color for title/etc. text (defaults to white)</option>
  /// <option name="title">Preferred title (defaults to "untitled")</option>
  /// <option name="width">Preferred comic width (defaults to 800)</option>
  /// <option name="xGutter">Preferred horizontal gutter (defaults to 10)</option>
  
  if (window.svgDocument == null) {
    svgDocument = evt.target.ownerDocument;
  }

  this.document = svgDocument;
  this.svg      = this.document.rootElement;
  this.ns       = 'http://www.w3.org/2000/svg';

  if (opts == null) {
    opts = new Array();
  }

  var date = new Date();

  this.author    = opts['author']    || 'A. N. Onymous';

  this.copyright = opts['copyright'] || "© " + date.getFullYear() + " " + this.author + ". All rights reserved.";
  this.fill      = opts['fill']      || 'black';
  this.fontSize  = opts['fontSize']  || 12;
  this.height    = opts['height']    || 300;
  this.subtitle  = opts['subtitle']  || '';
  this.textColor = opts['textColor'] || 'white';
  this.title     = opts['title']     || 'Untitled';
  this.width     = opts['width']     || 800;
  this.xGutter   = opts['xGutter']   || 10;

//  this.x         = opts['x']         || window.innerWidth / 2 - this.width / 2;
//  this.y         = opts['y']         || window.innerHeight / 2 - this.height / 2;

  this.panels    = new Array();

  this.initialize();
}

SVGComic.prototype.initialize = function() {
  /// <summary>Initializes the comic using the specified settings</summary>
  
  this.initializeSVG();
  this.initializeDefs();
  this.initializeElement();
  this.initializeTitle();
  this.initializeAuthor();
  this.initializeSubtitle();
  this.initializeCopyright();
}

SVGComic.prototype.initializeSVG = function() {
  /// <summary>Initialzies the SVG element.</summary>
  
  this.svg.setAttribute('height', this.height);
  this.svg.setAttribute('width', this.width);

//  this.svg.setAttribute('x', this.x);
//  this.svg.setAttribute('y', this.y);
}

SVGComic.prototype.initializeDefs = function() {
  /// <summary>Initializes DEFS element (for storing SVG defs)</summary>
  
  this.defs = this.document.createElementNS(this.ns, "defs");

  this.svg.appendChild(this.defs);
}

SVGComic.prototype.initializeElement = function() {
  /// <summary>Initializes comic RECT</summery>
  
  this.element = this.document.createElementNS(this.ns, "rect");

  this.element.setAttribute('height', this.height);
  this.element.setAttribute('width', this.width);
  this.element.setAttribute('fill', this.fill);

  this.svg.appendChild(this.element);
}

SVGComic.prototype.initializeTitle = function() {
  /// <summary>Initializes comic title element</summary>
  
  this.titleElement = this.document.createElementNS(this.ns, "text");

  var data = this.document.createTextNode(this.title);
  this.titleElement.appendChild(data);

  this.titleElement.setAttribute('fill', this.textColor);
  this.titleElement.setAttribute('x', 0 + this.xGutter);
  this.titleElement.setAttribute('y', this.fontSize + 1);
  this.titleElement.setAttribute('text-anchor', 'start');
  this.titleElement.style.fontWeight = 'bold';

  this.svg.appendChild(this.titleElement);
}

SVGComic.prototype.initializeAuthor = function() {
  /// <summary>Initializes comic author element</summary>
  
  this.authorElement = this.document.createElementNS(this.ns, "text");

  var data = this.document.createTextNode(this.author);
  this.authorElement.appendChild(data);

  this.authorElement.setAttribute('fill', this.textColor);
  this.authorElement.setAttribute('x', this.width - this.xGutter);
  this.authorElement.setAttribute('y', this.fontSize + 1);
  this.authorElement.setAttribute('text-anchor', 'end');
  this.authorElement.style.fontWeight = 'bold';

  this.svg.appendChild(this.authorElement);
}

SVGComic.prototype.initializeSubtitle = function() {
  /// <summary>Initializes secondary title element</summary>
  
  this.subtitleElement = this.document.createElementNS(this.ns, "text");

  var data = this.document.createTextNode(this.subtitle);
  this.subtitleElement.appendChild(data);

  this.subtitleElement.setAttribute('fill', this.textColor);
  this.subtitleElement.setAttribute('x', 0 + this.xGutter);
  this.subtitleElement.setAttribute('y', this.height - this.fontSize / 2);
  this.subtitleElement.setAttribute('text-anchor', 'start');
  this.subtitleElement.style.fontWeight = 'bold';

  this.svg.appendChild(this.subtitleElement);
}


SVGComic.prototype.initializeCopyright = function() {
  /// <summary>Initializes copyright element</summary>
  
  this.copyrightElement = this.document.createElementNS(this.ns, "text");

  var data = this.document.createTextNode(this.copyright);
  this.copyrightElement.appendChild(data);

  this.copyrightElement.setAttribute('fill', this.textColor);
  this.copyrightElement.setAttribute('x', this.width - this.xGutter);
  this.copyrightElement.setAttribute('y', this.height - this.fontSize / 2);
  this.copyrightElement.setAttribute('text-anchor', 'end');
  this.copyrightElement.style.fontWeight = 'bold';

  this.svg.appendChild(this.copyrightElement);
}

SVGComic.prototype.addPanel = function(opts) {
  /// <summary>Creates a panel for the comic</summary>
  /// <param name="opts">The options for the panel (See options for SVGComicPanel)</param>
  
  if (opts == null) {
    opts = new Array();
  }

  opts['parent'] = this;
  opts['number'] = this.panels.length || 0;

  var panel = new SVGComicPanel(opts);

  this.panels.push(panel);

  this.panel = this.panels[this.panels.length - 1];

  this.update();
}

SVGComic.prototype.update = function() {
  /// <summary>Updates the metrics for the comic and children elements</summary>
  
  for (var i = 0; i < this.panels.length; i++) {
    var panel = this.panels[i];

    panel.update();
  }
}

SVGComic.prototype.draw = function() {
  /// <summary>Draws the comic and children</summary>
  
  this.update();
}

function SVGComicPanel(opts) {
  /// <summary>The Comic Panel object</summary>
  /// <param name="opts">The options for the comic panel</param>
  /// <option name="parent">The parent element (defaults to calling SVGComic object)</option>
  /// <option name="number">The order of panels (defaults to previous + 1, or 0 if first)</option>
  /// <option name="width">The width of the panel (defaults to be proportional to number of panels)</option>
  /// <option name="height">The height of the panel (defaults to comic height minus the gutters)</option>
  /// <option name="x">The preferred x-position (defaults to next available x-position)</option>
  /// <option name="y">The preferred y-position (defaults to top minus gutter)</option>
  /// <option name="fill">The default background color (defaults to aliceblue)</option>
  
  if (opts == null) {
    opts = new Array();
  }

  this.parent = opts['parent'];

  if (opts['width']) {
    this.fixedWidth = true;
  }

  this.number = opts['number'] || 0;

  this.width  = opts['width']  || this.parent.width - this.parent.xGutter * (this.parent.panels.length + 1 + 1);
  this.height = opts['height'] || this.parent.height - this.parent.fontSize * 3;
  this.x      = opts['x']      || this.getAvailableX();
  this.y      = opts['y']      || this.parent.fontSize + 3;
  this.fill   = opts['fill']   || 'aliceblue';

  this.document = this.parent.document;
  this.ns       = this.parent.ns;
  this.svg      = this.parent.svg;

  this.characters = new Array();
  this.dialogs    = new Array();

  this.initialize();
}

SVGComicPanel.prototype.initialize = function() {
  /// <summary>Initializes SVGComicPanel</summary>
  
  this.initializeClipPath();
  this.initializeGroupElement();
  this.initializeElement();
}

SVGComicPanel.prototype.initializeClipPath = function() {
  /// <summary>Initializes panel's clip path (to keep stuff inside the panel)</summary>
  
  this.clipPath = this.document.createElementNS(this.ns, "clipPath");

  var id = 'clip' + this.number;

  this.clipPath.id = id;

  this.clipPathElement = this.document.createElementNS(this.ns, "rect");
  
  this.clipPathElement.setAttribute('height', this.height);
  this.clipPathElement.setAttribute('width', this.width);

  this.clipPath.appendChild(this.clipPathElement);

  this.parent.defs.appendChild(this.clipPath);
}

SVGComicPanel.prototype.initializeGroupElement = function() {
  /// <summary>Initializes group element (to store panel content)</summary>
  
  this.groupElement = this.document.createElementNS(this.ns, "g");

  this.groupElement.setAttribute('clip-path', 'url(#clip' + this.number + ')');
  this.groupElement.setAttribute('height', this.height);
  this.groupElement.setAttribute('width', this.width);

  this.updateTransform();

  this.svg.appendChild(this.groupElement);
}

SVGComicPanel.prototype.initializeElement = function() {
  /// <summary>Initializes panel RECT element</summary>
  
  this.element = this.document.createElementNS(this.ns, "rect");

  this.element.setAttribute('height', this.height);
  this.element.setAttribute('width', this.width);
  this.element.setAttribute('fill', this.fill);

  this.groupElement.appendChild(this.element);
}

SVGComicPanel.prototype.getAvailableX = function() {
  /// <summary>Gets the next available X</summary>
  /// <returns type="Number">value of next available x-position</returns>
  
  if (this.number > 0) {
    var previousPanel = this.parent.panels[this.number - 1];

    return previousPanel.x + previousPanel.width + this.parent.xGutter;
  } else {
    return this.parent.xGutter;
  }
}

SVGComicPanel.prototype.getAvailableWidth = function() {
  /// <summary>Gets available width based on other panels (only if width is unspecified)</summary>
  /// <returns type="Number">The available width for this panel</returns>
  
  var availableWidth = this.parent.width;

  var length = this.parent.panels.length;

  availableWidth -= this.parent.xGutter * (length + 1);

  var fixed = 0;

  for (var i = 0; i < length; i++) {
    var panel = this.parent.panels[i];

    if (panel.fixedWidth) {
      availableWidth -= panel.width;

      fixed++;
    }
  }

  if (fixed != length) {
    return availableWidth / (length - fixed);
  } else {
    return 0;
  }
}

SVGComicPanel.prototype.update = function() {
  /// <summary>Updates the panel and its children</summary>
  
  this.updateWidth();
  this.updateX();

  for (var i = 0; i < this.characters.length; i++) {
    var character = this.characters[i];

    character.update();
  }
  
  for (var i = 0; i < this.dialogs.length; i++) {
    var dialog = this.dialogs[i];
    
    dialog.update();
  }
}

SVGComicPanel.prototype.updateWidth = function() {
  /// <summary>Updates available width for panel</summary>
  
  if (! this.fixedWidth) {
    this.width = this.getAvailableWidth();
    this.clipPathElement.setAttribute('width', this.width);
    this.groupElement.setAttribute('width', this.width);
    this.element.setAttribute('width', this.width);
  }
}

SVGComicPanel.prototype.updateX = function() {
  /// <summary>Updates next available x-position for panel)</summary>
  
  this.x = this.getAvailableX()
  this.updateTransform();
}

SVGComicPanel.prototype.updateTransform = function() {
  /// <summary>Updates the Transform (see below)</summary>
  
  updateTransform(this);
}

SVGComicPanel.prototype.addCharacter = function(opts) {
  /// <summary>Adds a character to the panel</summary>
  /// <param name="opts">The character options (see SVGComicCharacter)</param>
  
  if (opts == null) {
    opts = new Array();
  }

  opts['parent'] = this;
  opts['number'] = this.characters.length || 0;

  var character = new SVGComicCharacter(opts);

  this.characters.push(character);

  this.character = this.characters[this.characters.length - 1];

  this.update();
}

function SVGComicCharacter(opts) {
  /// <summary>A SVGComicCharacter object</summary>
  /// <param name="opts">The specified options</param>
  /// <option name="parent">The parent object (defaults to calling Panel)</option>
  /// <option name="resource">An SVG file to represent the character (defaults to defualt.svg)</option>
  /// <option name="vAlighn">The vertical alignment {top, middle, bottom} (defaults to bottom)</option>
  /// <option name="hAlighn">The horizontal alignment {left, center, right} (defaults to left)</option>
  /// <option name="direction">The direction the character is facing (default right). Assumes character SVG is facing 
  /// the right</option>
  /// <option name="x">The preferred x-offset (default is 0)</option>
  /// <option name="y">The preferred y-offset (default is 0)</option>
  
  if (opts == null) {
    opts = new Array();
  }

  this.parent = opts['parent'];

  this.number    = opts['number']    || 0;
  this.resource  = opts['resource']  || 'assets/characters/default.svg';
  this.vAlign    = opts['vAlign']    || 'bottom';
  this.hAlign    = opts['hAlign']    || 'left';
  this.direction = opts['direction'] || 'right';
  this.x         = opts['x']         || 0;
  this.y         = opts['y']         || 0;
  
  this.width     = 0;

  this.document = this.parent.document;
  this.ns       = this.parent.ns;
  this.svg      = this.parent.svg;

  this.dialogs = new Array();

  this.initialize();
}

SVGComicCharacter.prototype.initialize = function() {
  /// <summary>Initializes the character</summary>
  
  this.initializeGroupElement();
  this.initializeResource();

  this.update();
}

SVGComicCharacter.prototype.initializeGroupElement = function() {
  /// <summary>Initializes group element that stores character</summary>
  
  this.groupElement = this.document.createElementNS(this.ns, "g");

  this.groupElement.id = "character" + this.number + "_" + this.parent.number;

  this.parent.groupElement.appendChild(this.groupElement);
}

SVGComicCharacter.prototype.initializeResource = function() {
  /// <summary>Loads the SVG resource that represents the character</summary>
  
  var obj = this;

  var xhr = new XMLHttpRequest;
  xhr.open('get', this.resource, false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    var g = xhr.responseXML.getElementsByTagName('g')[0];
    var p = obj.groupElement;
    var n = obj.ns;

    obj.element = cloneToDoc(g, document, n);

    p.appendChild(obj.element);

    setTimeout(null, 100);
  };

  xhr.send();
  
  this.width = this.element.getAttribute("width");
}

SVGComicCharacter.prototype.update = function() {
  /// <summary>Updates character and children</summary>
  
  this.updateVAlign();
  this.updateHAlign();
}

SVGComicCharacter.prototype.updateVAlign = function() {
  /// <summary>Updates the vertical alignment based on value and character/panel height</summary>
  
  if (this.vAlign == 'bottom') {
    this.y = this.parent.height - this.element.getAttribute('height');
    this.updateTransform();
  } else if (this.vAlign == 'middle') {
    this.y = this.parent.height / 2 - this.element.getAttribute('height') / 2;
    this.updateTransform();
  } else if (this.vAlign == 'top') {
    this.y = 0;
    this.updateTransform();
  } else {
    this.vAlign = 'bottom';
    this.updateVAlign();
  }
}

SVGComicCharacter.prototype.updateHAlign = function() {
  /// <summary>Updates the horizontal alignment based on value and character/panel width</summary>
  
  if (this.hAlign == 'left') {
    this.x = 0;
    this.updateTransform();
  } else if (this.hAlign == 'center') {
    this.x = this.parent.width / 2 - this.element.getAttribute('width') / 2;
    this.updateTransform();
  } else if (this.hAlign == 'right') {
    this.x = this.parent.width - this.element.getAttribute('width');
    this.updateTransform();
  } else {
    this.hAlign = 'left';
    this.updateHAlign();
  }
}

SVGComicCharacter.prototype.updateTransform = function() {
  /// <summary>Updates the transform (see below)</summary>
  
  updateTransform(this);
}

SVGComicCharacter.prototype.addDialog = function(opts) {
  /// <summary>Adds a piece of dialog to the comic</summary>

  if (opts == null) {
    opts = new Array();
  }

  opts['parent']    = this.parent;
  opts['character'] = this;
  opts['hAlign']    = this.hAlign;
  opts['number']    = this.parent.dialogs.length || 0;

  var dialog = new SVGComicDialog(opts);

  this.parent.dialogs.push(dialog);

  this.parent.dialog = this.parent.dialogs[this.parent.dialogs.length - 1];

  this.update();
}

function SVGComicDialog(opts) {
  /// <summary>The Comic Dialog object</summary>
  
  if (opts == null) {
    opts = new Array();
  }

  this.parent = opts['parent'];

  this.number = opts['number'] || 0;
  this.text   = opts['text']  || "";
  this.style  = opts['style'] || "rounded";
  this.hAlign = opts['hAlign'] || "left";
  this.vAlign = opts['vAlign'] || "top";

  this.document = this.parent.document;
  this.ns       = this.parent.ns;
  this.svg      = this.parent.svg;

  this.initialize();
}

SVGComicDialog.prototype.initialize = function() {
  // <summary>Initializes Dialog element</summary>

  this.initalizeTextElement();

  this.update();
}

SVGComicDialog.prototype.initalizeTextElement = function() {
  this.textElement = this.document.createElementNS(this.ns, "text");

  var data = this.document.createTextNode(this.text);
  this.textElement.appendChild(data);
  
  var textAnchor;
  
  if (this.hAlign == "left") {
    textAnchor = "start";
  } else if (this.hAlign == "center") {
    textAnchor = "middle";
  } else if (this.hAlign == "right") {
    textAnchor = "end";
  } else {
    textAnchor = "start";
  }

  this.textElement.setAttribute('fill', this.textColor);
  this.textElement.setAttribute('text-anchor', textAnchor);
  
  this.groupElement = this.textElement;
  this.element      = this.textElement;

  this.parent.groupElement.appendChild(this.textElement);
}

SVGComicDialog.prototype.update = function() {
  // <summary>Updates Dialog Element</summary>
  this.updateVAlign();
  this.updateHAlign();
}

SVGComicDialog.prototype.updateVAlign = function() {
  /// <summary>Updates the vertical alignment based on value and text/panel height</summary>
  
  if (this.vAlign == 'bottom') {
    this.y = this.parent..height - this.element.getAttribute('height');
    this.updateTransform();
  } else if (this.vAlign == 'middle') {
    this.y = this.parent.height / 2 - this.element.getAttribute('height') / 2;
    this.updateTransform();
  } else if (this.vAlign == 'top') {
    this.y = (this.parent.parent.fontSize + 3) * (this.number + 1);
    this.updateTransform();
  } else {
    this.vAlign = 'top';
    this.updateVAlign();
  }
}

SVGComicDialog.prototype.updateHAlign = function() {
  /// <summary>Updates the horizontal alignment based on value and text/panel width</summary>
  
  if (this.hAlign == 'left') {
    this.x = 0;
    this.updateTransform();
  } else if (this.hAlign == 'center') {
    this.x = this.parent.width / 2 - this.element.getAttribute('width') / 2;
    this.updateTransform();
  } else if (this.hAlign == 'right') {
    this.x = this.parent.width - this.element.getAttribute('width');
    this.updateTransform();
  } else {
    this.hAlign = 'left';
    this.updateHAlign();
  }
}

SVGComicDialog.prototype.updateTransform = function() {
  updateTransform(this);
}

function updateTransform(obj) {
  /// <summary>Translates the specified object depending on it's x- and y-offset</summary>
  /// <param name="obj">The specified object (e.g., SVGComicPanel, SVGComicCharacter)</param>
  
  var local_x = 0; // x-position
  var local_y = 0; // y-position
  var local_a = 1; // x-scale
  var local_b = 1; // y-scale
  var local_w = 0; // width
  
  if (obj.x != null) {
    local_x = +obj.x;
  }
  
  if (obj.y != null) {
    local_y = +obj.y;
  }
  
  if (obj.width != null) {
    local_w = +obj.width;
  }
  
  if (obj.direction == "left") {
    local_a = -1;
    local_x += local_w;
  }
  
  var translate = "translate(" + local_x + ", " + local_y + ")";
  var scale     = "scale(" + local_a + ", " + local_b + ")";
  
  var transform = translate + "," + scale

  obj.groupElement.setAttribute('transform', transform);
}

function cloneToDoc(node, doc, ns) {
  /// <summary>Clones an element into the specified namespace</summary>
  /// <param name="node">The node to clone</param>
  /// <param name="doc">The current document</param>
  /// <param name="ns">The namespace</param>
  /// <returns type="Object">The cloned element</returns>
  
  if (! doc) doc = document;

  var clone = doc.createElementNS(ns, node.nodeName);

  for (var i = 0; i < node.attributes.length; i++) {
    var a = node.attributes[i];

    clone.setAttribute(a.nodeName, a.nodeValue);
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    var c = node.childNodes[i];

    clone.insertBefore(
      c.nodeType == 1 ? cloneToDoc(c, doc, ns) : doc.createTextNode(c.nodeValue),
      null
    );
  }

  return clone;
}
