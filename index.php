<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Author" content="Matt Satorius, http://www.sators.com/" />
<title>WCCC Production Systems Status Board</title>
<link href="statusboard/statusboard.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" language="javascript">
//What's your IP? Are you local or outside?
var ip = "<?php echo $_SERVER['REMOTE_ADDR']?>";
</script><br />
</head>

<body>
<div id="total-trend" class="border-gray"><h1 id="count-trend"><span id="direction"></span><span id="trend-number"></span></h1>TRENDS</div>
<div id="totalcounts"><div id="total-open" class="border-gray"><h1 id="count-open"></h1>OPEN</div><div id="total-overdue" class="border-gray"><h1 id="count-overdue"></h1>DUE</div><div id="total-onhold" class="border-gray"><h1 id="count-onhold"></h1>HOLD</div><div id="total-repair" class="border-gray"><h1 id="count-repair"></h1>REPAIR</div><div id="total-parts" class="border-gray"><h1 id="count-parts"></h1>PARTS</div><div id="total-out" class="border-gray"><h1 id="count-out"></h1>OUT</div><div id="total-closed" class="border-gray"><h1 id="count-closed"></h1>CLOSED</div></div>
<div id="bargraphs">
<div id="general" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">GENERAL</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
<div id="audio" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">AUDIO</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
<div id="lighting" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">LIGHTING</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
<div id="video" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">VIDEO</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
<div id="cad" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">CAD</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
<div id="equipreq" class="container-graph"><div class="graph"></div><div class="graph-frame"><div class="title">EQUIP REQ</div><div class="stats"><span class="overdue">0</span> / <span class="open">0</span></div></div></div>
</div>
<div class="container-ticketlists">
<div id="newtickets" class="ticketlist"></div>
<div id="overduetickets" class="ticketlist"></div>
<div id="twitter" class="border-gray"><div id="bird"><img src="statusboard/twitter-bird.png" /></div><div id="userimage"><img src="" /></div><div id="userdetails"><div id="username"></div><div id="tweettime"></div></div><div id="tweet"></div></div>
</div>
<div id="bottomboxes">
<div id="countdown"></div>
<div id="timeofday" class="border-gray"><div class="icon"><img src="statusboard/calendar.png" /></div><div class="title"><div class="float-left"></div>Coming Up</div><div class="float-left"><div id="month"></div><div id="day"></div><div id="clock"></div></div><div id="eoccalendar"></div></div>
<div id="weather" class="border-gray"><div id="asof">Updated: <span class="time">12:00 AM</span></div><div id="currentimage"></div><div id="currently"><div class="temp"></div><div class="title"></div><div class="location"></div></div><div id="forecast"><div id="forecast0"><div class="day">Today</div><div class="icon"></div><div class="title"></div><div class="temp"><span class="high"></span> / <span class="low"></span></div></div><div id="forecast1"><div class="day">Tomorrow</div><div class="icon"></div><div class="title"></div><div class="temp"><span class="high"></span> / <span class="low"></span></div></div></div></div>
<div id="webcam" class="border-gray"><div class="image"></div><div class="icon"><img src="statusboard/webcam.png" /></div></div>
</div>
<div id="rsstickercontainer"><div class="feedicon"><img src="" id="feedicon" /></div><ul id="rssticker"></ul></div>
<div id="dimmer"></div>
<div id="newticketcontainer">
<div class="alertbanner">NEW TICKET</div>
<div class="alertbannerbottom">NEW TICKET</div>
<div id="subject"></div>
<div id="posteddate" class="details"><div class="label">Date:</div><span class="name"></span></div>
<div id="from" class="details"><div class="label">From:</div><span class="name"></span></div>
<div id="department" class="details"><div class="label">Department:</div><span class="name"></span></div>
<div id="priority" class="details"><div class="label">Priority:</div><span class="name"></span></div>
<div id="message" class="details"><div class="label">Messsage:</div><div class="message"></span></div>
</div>
<embed id="alertwav" src="" style="height: 0; width: 0" autostart="true" loop="0" >
</embed>
<iframe height="0" width="0" id="newticketlight" src="" style="display:none"></iframe>
<script language="JavaScript" src="statusboard/jquery-1.4.2.min.js" type="text/javascript"></script> 
<script type="text/javascript" src="statusboard/jquery.li-scroller.1.0.js" language="javascript"></script>
<script type="text/javascript" src="statusboard/clock.js" language="javascript"></script>
<script type="text/javascript" src="statusboard/htmlentities.js" language="javascript"></script>
<script type="text/javascript" src="statusboard/ajax-json-loads.js" language="javascript">//Most of the Core lives in here</script>
<script type="text/javascript" src="statusboard/googlecalendar.js" language="javascript">//Parse Google Calendar</script>

<script language="JavaScript" type="text/javascript"> 
$(document).ready(function() {
//Load all initial content
loadWeather();
 loadTickets();
 updateClock(); 
 loadTwitter();
 loadCountdown();
loadRSSFeed();
loadCalendar();
$("#subject").html('');
 //I got your IP above...Determine if you are local or not.  If so, webcam, if not, Monster Church logo - http://10.8.5.91/axis-cgi/mjpg/video.cgi?camera=&resolution=320x240
 if(ip.substr(0,3) == '10.') { $('#webcam > .image').css("background-image", "url(http://10.8.5.91/axis-cgi/mjpg/video.cgi?resolution=320x240)"); } else { $('#webcam > .image').css("background-image", "url(http://a3.twimg.com/profile_background_images/83329981/MonsterChurch.jpg)"); 
 $('#webcam > .image').css("background-position", "center 0px");}
 //Set Timers for AJAX refresh
 setInterval('updateClock()', 10000 )
 setInterval('loadTickets()', 5000 )
 setInterval('loadTwitter()', 15000 )
 setInterval('loadCountdown()', 600000 )
 setInterval('loadWeather()', 300000 )
setInterval('loadCalendar()', 30000 )
setTimeout(function(){window.scrollTo(0,1);}, 100);

 //All your base are belong to us
}); //End Document Ready
</script>
</body>
</html> 
