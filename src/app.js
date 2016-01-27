$(function() {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    rect.attr({
        rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
        text: {
            text: 'my label', 
            fill: '#3498DB',
            'font-size': 18, 
            'font-weight': 'bold', 
            'font-variant': 'small-caps', 
            'text-transform': 'capitalize'
        }
    });

    var rect2 = rect.clone();
    rect2.translate(300);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    link.attr({
        '.connection': { stroke: '#3498DB' },
        '.marker-source': { fill: 'transparent', d: 'M 10 0 L 0 5 L 10 10 z' },
        '.marker-target': { fill: 'transparent', d: 'M 10 0 L 0 5 L 10 10 z' }
    });

    graph.addCells([rect, rect2, link]);    
});
