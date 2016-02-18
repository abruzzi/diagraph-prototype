$(function() {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({

        markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

        defaults: joint.util.deepSupplement({

            type: 'basic.DecoratedRect',
            size: { width: 100, height: 60 },
            attrs: {
                'rect': { fill: '#FFFFFF', stroke: 'black', width: 100, height: 60 },
                'text': { 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
                'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 16, height: 16 }
            }

        }, joint.shapes.basic.Generic.prototype.defaults),


    });

    // var decoratedRect = new joint.shapes.basic.DecoratedRect({
    //     position: { x: 150, y: 80 },
    //     size: { width: 100, height: 60 },
    //     attrs: { 
    //         text: { text: 'My Element' },
    //         image: { 'xlink:href': 'http://placehold.it/16x16' }
    //     },
    //     waterMark: "Juntao Qiu"   
    // });

    // var decoratedRect2 = new joint.shapes.basic.DecoratedRect({
    //     position: { x: 80, y: 80 },
    //     size: { width: 60, height: 60 },
    //     attrs: { 
    //         text: { text: 'Your Element' },
    //         image: { 'xlink:href': 'http://placehold.it/16x16' }
    //     },
    //     waterMark: "Guo Degang"
    // });
    
    // graph.addCell([decoratedRect, decoratedRect2]);

    $.get('/samples/decorated-rect.json', function(data) {
        graph.fromJSON(data);
    });

    $("#save").on('click', function() {
        console.log(graph.toJSON());
    });

});
