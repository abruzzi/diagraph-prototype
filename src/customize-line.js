joint.shapes.libreria = {};
joint.shapes.libreria.modelGenerador = 
joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {
  
  markup: [
  '<g class="rotatable">',
  '<g class="scalable">',
  '<rect id="svg_1"/>',
  '<ellipse id="svg_2"/>',
  '<line id="svg_3"/>',
  '<path id="svg_5"/>',
  '<path id="svg_6"/>',
  '</g>',
  '<text class="label"/>',
  '<g class="inPorts"/>',
  '<g class="outPorts"/>',
  '</g>',
  '<g class="link-tools"/>',
  ].join(''),

  portMarkup: '<g class="puerto port<%= id %>"><circle/><text/></g>',

  defaults: joint.util.deepSupplement({
    nombre: 'Generador',
    type: 'libreria.modelGenerador',
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 60,
      height: 55,
    },
    outPorts: [''],
    attrs: {
      '.': {
        magnet: false
      },
      '#svg_1': {
        'width': 60,
        'height': 55,
        'y': 0,
        'x': 0,
        'stroke-width': 0,
        'fill': 'green',
      },
      '.puerto circle': {
        r: 5,
        magnet: true,
      },
      text: {
        fill: '#666',
        'pointer-events': 'none'
      },
      '.inPorts circle': {
        fill: '#E74C3C',
        type: 'output',
        stroke: 0,
      },
      '.outPorts circle': {
        fill: '#E74C3C',
        type: 'output',
        stroke: 0,
      },
    }
  }, joint.shapes.basic.Generic.prototype.defaults),

  /*
  */
  getPortAttrs: function(portName, index, total, selector, type) {
    var attrs = {};
    var portClass = 'port' + index;
    var portSelector = selector + '>.' + portClass;
    var portTextSelector = portSelector + '>text';
    var portCircleSelector = portSelector + '>circle';
    attrs[portTextSelector] = { text: portName };
    attrs[portCircleSelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
    attrs[portSelector] = { ref: 'path', 'ref-y': (index + 0.5) * (1 / total) };
    if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }
    return attrs;
  }
}));

joint.shapes.libreria.modelGeneradorView = joint.shapes.devs.ModelView;

joint.shapes.libreria.modelLink = joint.dia.Link.extend({
  defaults: joint.util.deepSupplement({
    type: 'libreria.modelLink',
    manhattan: true,
    attrs: {
      '.connection': {
        'stroke-width': 1.3,
      },
      '.marker-arrowhead': {
        d: 'M 10 0 L 0 5 L 10 10 z',
      },
      '.marker-vertex': {
        r: 8,
      },
    },
  }, joint.dia.Link.prototype.defaults),
});

joint.shapes.libreria.modelLinkView = joint.dia.LinkView.extend({
  // model: joint.shapes.libreria.modelLinea,
  pointerdown: function(evt, x, y) {
    joint.dia.CellView.prototype.pointerdown.apply(this, arguments);

    this._dx = x;
    this._dy = y;


    if (this.options.interactive === false) return;

    var className = evt.target.getAttribute('class');

    switch (className) {
      case 'marker-vertex':
      this._action = 'vertex-move';
      this._vertexIdx = evt.target.getAttribute('idx');
      break;


      case 'marker-vertex-remove':
      case 'marker-vertex-remove-area':
      this.removeVertex(evt.target.getAttribute('idx'));
      break;


      case 'marker-arrowhead':
      this.startArrowheadMove(evt.target.getAttribute('end'));
      break;


      default:

      var targetParentEvent = evt.target.parentNode.getAttribute('event');

      if (targetParentEvent) {
        if (targetParentEvent === 'remove') {
          this.model.remove();
        } else {
          this.paper.trigger(targetParentEvent, evt, this, x, y);
        }
      }
    }
  },

  pointerdblclick: function (evt, x, y) {
    this._vertexIdx = this.addVertex({ x: x, y: y });
    this._action = 'vertex-move';
  },
});

$(function() {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    var model = new joint.shapes.libreria.modelGenerador({
      position: { x: 10, y: 60 }
    });

    var model2 = new joint.shapes.libreria.modelGenerador({
      position: { x: 100, y: 100}
    });

    var link = new joint.shapes.libreria.modelLink({
      source: { id: model.id },
      target: { id: model2.id },
    });

    // graph.addCells([model, model2, link]);

    $.get('/samples/lines.json', function(data) {
        graph.fromJSON(data);
    });
    $("#save").on('click', function() {
        console.log(graph.toJSON());
    });

});


function save_as() {
  // Save the cells in arrays
  var elementos = graph.getElements();
  var links = graph.getLinks();

  var expElementos = [];
  var expLinks = [];

  for (var i = 0; i < elementos.length; i++) {
    expElementos.push(elementos[i]);
  };

  for (var i = 0; i < links.length; i++) {
    expLinks.push(links[i]);
  };

  // Clear the graph (Genius .__.)
  graph.clear();

  // Wait 1s and add the cells 
  setTimeout(function () {
    for (var i = 0; i < expElementos.length; i++) {
      graph.addCell(expElementos[i]);
    };

    for (var i = 0; i < expLinks.length; i++) {
      graph.addCell(expLinks[i]);
    };
  }, 1000);  
}
