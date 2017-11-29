$(document).ready(function() {
    $.ajax({
        url: "https://c164d3ul86.execute-api.eu-west-1.amazonaws.com/prod/parking-get-usage"
    }).then(function(data) {
       $('.greeting-id').append(data.statusCode);
       $('.greeting-content').append(data.body);
    });
});