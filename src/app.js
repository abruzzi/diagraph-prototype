$(function() {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
    });

    $.get('/api/graph/56b8672cb29ddd49c04d0396', function(data) {
        graph.fromJSON(data);
    });

    $("#save").on('click', function() {

        $.ajax({
            url: '/api/graph/56b8672cb29ddd49c04d0396',
            type: 'PUT',
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify(graph.toJSON()),
            success: function(data) {
                $('#message').html('Graph is saved successfully');
            },
            error: function(err) {
                $('#message').html('something went wrong');
            } 
        })
    });

});
