<!DOCTYPE html>
<html>
<head>
    <title>Serverless</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</head>

<body>
<p>It works.</p>
<p>Values<span id="counter"></span>.</p>
</body>
<script>
jQuery.ajax("https://c164d3ul86.execute-api.eu-west-1.amazonaws.com/prod/parking-get-usage", {
  headers: {
    "Origin": "http://fi.jperala.parking.s3-website-eu-west-1.amazonaws.com"
  },
  success: function(data) {
    jQuery("#counter").html(data)
}});
</script>
</html>