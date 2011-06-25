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

  this.author    = opts['author']    || 'Jacob P. Silvia';

  this.copyright = opts['copyright'] || "© " + date.getFullYear() + " " + this.author + ". All rights reserved";
  this.fill      = opts['fill']      || 'black';
  this.fontSize  = opts['fontSize']  || 12;
  this.height    = opts['height']    || 300;
  this.subtitle  = opts['subtitle']  || 'Adventures in Coding';
  this.textColor = opts['textColor'] || 'white';
  this.title     = opts['title']     || 'SVGComic';
  this.width     = opts['width']     || 800;
  this.xGutter   = opts['xGutter']   || 10;

//  this.x         = opts['x']         || window.innerWidth / 2 - this.width / 2;
//  this.y         = opts['y']         || window.innerHeight / 2 - this.height / 2;

  this.panels    = new Array();

  this.initialize();
}

SVGComic.prototype.initialize = function() {
  this.initializeSVG();
  this.initializeDefs();
  this.initializeElement();
  this.initializeTitle();
  this.initializeAuthor();
  this.initializeSubtitle();
  this.initializeCopyright();
}

SVGComic.prototype.initializeSVG = function() {
  this.svg.setAttribute('height', this.height);
  this.svg.setAttribute('width', this.width);

//  this.svg.setAttribute('x', this.x);
//  this.svg.setAttribute('y', this.y);
}

SVGComic.prototype.initializeDefs = function() {
  this.defs = this.document.createElementNS(this.ns, "defs");

  this.svg.appendChild(this.defs);
}

SVGComic.prototype.initializeElement = function() {
  this.element = this.document.createElementNS(this.ns, "rect");

  this.element.setAttribute('height', this.height);
  this.element.setAttribute('width', this.width);
  this.element.setAttribute('fill', this.fill);

  this.svg.appendChild(this.element);
}

SVGComic.prototype.initializeTitle = function() {
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
  for (var i = 0; i < this.panels.length; i++) {
    var panel = this.panels[i];

    panel.update();
  }
}

function SVGComicPanel(opts) {
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

  this.initialize();
}

SVGComicPanel.prototype.initialize = function() {
  this.initializeClipPath();
  this.initializeGroupElement();
  this.initializeElement();
}

SVGComicPanel.prototype.initializeClipPath = function() {
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
  this.groupElement = this.document.createElementNS(this.ns, "g");

  this.groupElement.setAttribute('clip-path', 'url(#clip' + this.number + ')');
  this.groupElement.setAttribute('height', this.height);
  this.groupElement.setAttribute('width', this.width);

  this.updateTransform();

  this.svg.appendChild(this.groupElement);
}

SVGComicPanel.prototype.initializeElement = function() {
  this.element = this.document.createElementNS(this.ns, "rect");

  this.element.setAttribute('height', this.height);
  this.element.setAttribute('width', this.width);
  this.element.setAttribute('fill', this.fill);

  this.groupElement.appendChild(this.element);
}

SVGComicPanel.prototype.getAvailableX = function() {
  if (this.number > 0) {
    var previousPanel = this.parent.panels[this.number - 1];

    return previousPanel.x + previousPanel.width + this.parent.xGutter;
  } else {
    return this.parent.xGutter;
  }
}

SVGComicPanel.prototype.getAvailableWidth = function() {
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
  this.updateWidth();
  this.updateX();

  for (var i = 0; i < this.characters.length; i++) {
    var character = this.characters[i];

    character.update();
  }
}

SVGComicPanel.prototype.updateWidth = function() {
  if (! this.fixedWidth) {
    this.width = this.getAvailableWidth();
    this.clipPathElement.setAttribute('width', this.width);
    this.groupElement.setAttribute('width', this.width);
    this.element.setAttribute('width', this.width);
  }
}

SVGComicPanel.prototype.updateX = function() {
  this.x = this.getAvailableX()
  this.updateTransform();
}

SVGComicPanel.prototype.updateTransform = function() {
  updateTransform(this);
}

SVGComicPanel.prototype.addCharacter = function(opts) {
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

  this.document = this.parent.document;
  this.ns       = this.parent.ns;
  this.svg      = this.parent.svg;

  this.initialize();
}

SVGComicCharacter.prototype.initialize = function() {
  this.initializeGroupElement();
  this.initializeResource();

  this.update();
}

SVGComicCharacter.prototype.initializeGroupElement = function() {
  this.groupElement = this.document.createElementNS(this.ns, "g");

  this.groupElement.id = "character" + this.number;

  this.parent.groupElement.appendChild(this.groupElement);
}

SVGComicCharacter.prototype.initializeResource = function() {
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
}

SVGComicCharacter.prototype.update = function() {
  this.updateVAlign();
  this.updateHAlign();
}

SVGComicCharacter.prototype.updateVAlign = function() {
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
  updateTransform(this);
}

function updateTransform(obj) {
  var translate = "translate(" + obj.x + ", " + obj.y + ")";

  obj.groupElement.setAttribute('transform', translate);
}

function cloneToDoc(node, doc, ns) {
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