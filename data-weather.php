<?php
include("statusboard/class.xml.parser.php");
include("statusboard/class.weather.php");

// Found this PHP class to get weather data via Yahoo and turn it to JSON

//error_reporting(E_ALL);
// ------------------- 
// LOGIC
// -------------------
// Create the new weather object!
// CIXX0020 = Location Code from weather.yahoo.com
// 3600     = seconds of cache lifetime (expires after that)
// C        = Units in Celsius! (Option: F = Fahrenheit)

$timeout=3*60*60;  // 3 hours
if (isset($_ENV["TEMP"]))
  $cachedir=$_ENV["TEMP"];
else if (isset($_ENV["TMP"]))
  $cachedir=$_ENV["TMP"];
else if (isset($_ENV["TMPDIR"]))
  $cachedir=$_ENV["TMPDIR"];
else
// Default Cache Directory  
  $cachedir="/tmp";
  
$cachedir=str_replace('\\\\','/',$cachedir);
if (substr($cachedir,-1)!='/') $cachedir.='/';

$weather_location = new weather("USIL0070", 3600, "F", $cachedir); // <-- Change this for different weather location

// Parse the weather object via cached
// This checks if there's an valid cache object allready. if yes
// it takes the local object data, what's much FASTER!!! if it
// is expired, it refreshes automatically from rss online!

// $weather_location->parsecached(); // => RECOMMENDED!

// allway refreshes from rss online. NOT AS FAST. (I DON"T CARE! I'm refreshing the data every 5min, it'll be ok if it takes a few extra mill)
$weather_location->parse(); // => NOT recommended!

echo json_encode($weather_location->forecast); 
?>
