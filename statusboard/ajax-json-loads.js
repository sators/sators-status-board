// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

// AJAX JSON Loading JavaScript Document
//Load ticket data into various DIVs
function loadTickets() {
	$.getJSON("data-tickets.php", function(data){ 
	//If there are updated numbers, slide the total counts up and down for smooth updating
	if ($("#count-open").html() !== data['totalcounts'][1]) { $("#count-open").slideUp("slow", function(){ $("#count-open").html(data['totalcounts'][1]); $("#count-open").slideDown("slow");}); }
	if ($("#count-onhold").html() !== data['totalcounts'][2]) { $("#count-onhold").slideUp("slow", function(){ $("#count-onhold").html(data['totalcounts'][2]); $("#count-onhold").slideDown("slow");}); }
	totaloverdue = parseInt(data['General Systems']['overdue'])+parseInt(data['Audio/Comm']['overdue'])+parseInt(data['Lighting']['overdue'])+parseInt(data['Video']['overdue'])+parseInt(data['CAD']['overdue'])+parseInt(data['Equipment Request']['overdue']) + '';
	if ($("#count-overdue").html() !== totaloverdue) { $("#count-overdue").slideUp("slow", function(){ $("#count-overdue").html(totaloverdue); $("#count-overdue").slideDown("slow");}); }
	if ($("#count-closed").html() !== data['totalcounts'][3]) { $("#count-closed").slideUp("slow", function(){ $("#count-closed").html(data['totalcounts'][3]); $("#count-closed").slideDown("slow");}); }
	if ($("#count-repair").html() !== data['totalcounts'][4]) { $("#count-repair").slideUp("slow", function(){ $("#count-repair").html(data['totalcounts'][4]); $("#count-repair").slideDown("slow");}); }
	if ($("#count-parts").html() !== data['totalcounts'][5]) { $("#count-parts").slideUp("slow", function(){ $("#count-parts").html(data['totalcounts'][5]); $("#count-parts").slideDown("slow");}); }
	if ($("#count-out").html() !== data['totalcounts'][6]) { $("#count-out").slideUp("slow", function(){ $("#count-out").html(data['totalcounts'][6]); $("#count-out").slideDown("slow");}); }
	//If open/closed ticket trends are even, hide trends box, otherwise show and do smooth slide transitions upon new data
	if ($('#trend-number').html() !== (data['tickettrend']['total']+ '%')) {
		if (data['tickettrend']['total'] == 0) { $("#total-trend").slideUp("slow", function(){ 
				$("#trend-number").html(data['tickettrend']['total'] + '%');
				$("#direction").html('&#9679;');$("#count-trend").css("color", "white");
				});
		} else {
		$("#count-trend").slideUp("slow", function(){
			if($('#trend-number').html() == '0%') {  $("#total-trend").slideDown("slow") }
			$("#trend-number").html(data['tickettrend']['total'] + '%');
			if (data['tickettrend']['direction'] == 'up') {$("#direction").html('&#9650;');$("#count-trend").css("color", "red"); } else if (data['tickettrend']['direction'] == 'down'){$("#direction").html('&#9660;');$("#count-trend").css("color", "green");} else { $("#direction").html('&#9679;');$("#count-trend").css("color", "white"); }
			$("#count-trend").slideDown("slow");
		}); 
		}
	} 
// Create bar graphs and Overdue / Open numbers
	$("#general > .graph-frame > .stats > .overdue").html(data['General Systems']['overdue']); 
	$("#general > .graph-frame > .stats > .open").html(data['General Systems']['open']); 
	$("#general > .graph-frame ").css("height", data['General Systems']['height']+"%"); 
	$("#general > .graph ").animate({height: data['General Systems']['height']+"%"}, 500); 
	$("#audio > .graph-frame > .stats > .overdue").html(data['Audio/Comm']['overdue']); 
	$("#audio > .graph-frame > .stats > .open").html(data['Audio/Comm']['open']); 
	$("#audio > .graph-frame ").css("height", data['Audio/Comm']['height']+"%"); 
	$("#audio > .graph ").animate({height: data['Audio/Comm']['height']+"%"}, 500); 
	$("#lighting > .graph-frame > .stats > .overdue").html(data['Lighting']['overdue']); 
	$("#lighting > .graph-frame > .stats > .open").html(data['Lighting']['open']);
	$("#lighting > .graph-frame ").css("height", data['Lighting']['height']+"%");  
	$("#lighting > .graph ").animate({height: data['Lighting']['height']+"%"}, 500); 
	$("#video > .graph-frame > .stats > .overdue").html(data['Video']['overdue']); 
	$("#video > .graph-frame > .stats > .open").html(data['Video']['open']); 
	$("#video > .graph-frame ").css("height", data['Video']['height']+"%"); 
	$("#video > .graph ").animate({height: data['Video']['height']+"%"}, 500); 
	$("#cad > .graph-frame > .stats > .overdue").html(data['CAD']['overdue']); 
	$("#cad > .graph-frame > .stats > .open").html(data['CAD']['open']); 
	$("#cad > .graph-frame ").css("height", data['CAD']['height']+"%"); 
	$("#cad > .graph ").animate({height: data['CAD']['height']+"%"}, 500); 
	$("#equipreq > .graph-frame > .stats > .overdue").html(data['Equipment Request']['overdue']);
	$("#equipreq > .graph-frame > .stats > .open").html(data['Equipment Request']['open']);  
	$("#equipreq > .graph-frame ").css("height", data['Equipment Request']['height']+"%"); 
	$("#equipreq > .graph ").animate({height: data['Equipment Request']['height']+"%"}, 500); 
	$('#newtickets').children().remove();
	$('#overduetickets').children().remove();
	$('#changedtickets').children().remove();
	
	//Create Ticket Lists
	$('#newtickets').append('<div class="title">NEW TICKETS</div>');
	$('#overduetickets').append('<div class="title">TOP 5 OVERDUE TICKETS</div>');
	//$('#changedtickets').append('<div class="title">RECENT ACTIVITY</div>');
	newticketcount = 0;
	$.each(data['newtickets'], function(i,item){
		if(item.isoverdue == 1){overdueimage = '<img class="exclamation" src="statusboard/exclamation.png" />';} else { overdueimage = '';}
		if(item.isnew == 1){newclass = ' newticket'; newticketcount = 1; loadNewTickets(); } else { newclass = '';}
		$('#newtickets').append('<div class="entry'+newclass+'"><img src="statusboard/resultset_next.png" />'+item.subject+overdueimage+'</div>'); 
	});
	//Determine if user is local or not, if so, turn on new ticket light relay, otherwise turn relay off.
	if (ip.substr(0,2) == '10'){ newticketlisturl = "http://10.205.2.96/state.xml?relay1State="; $("#newticketlight").attr('src', newticketlisturl + newticketcount);}
	$.each(data['overduetickets'], function(i,item){
		$('#overduetickets').append('<div class="entry"><img src="statusboard/resultset_next.png" />'+item+'<img class="exclamation" src="statusboard/exclamation.png" /></div>'); 
	});
	//$.each(data['changedtickets'], function(i,item){
	//	if(item.isoverdue == 1){overdueimage = '<img class="exclamation" src="statusboard/exclamation.png" />';} else { overdueimage = '';}
	//	if(item.isnew == 1){newclass = ' newticket';  } else { newclass = '';}
	///	$('#changedtickets').append('<div class="entry'+newclass+'"><img src="statusboard/resultset_next.png" />'+item.subject+overdueimage+'</div>'); 
	//});
	
})

}; //End loadTickets 

//loadNewTickets - Display an alert window containing data of new ticket information
 function loadNewTickets() {
	if( $("#subject").html() == '' && ip.substr(0,3) == '10.') {
	$.getJSON("data-newticket.php", function(data){ 
		if(data.ticketid !== data.lastnewticketid){
			$("#subject").html(data.subject);
			$("#posteddate > .name").html(data.friendlydate);
			$("#from > .name").html(data.fullname);
			$("#department > .name").html(data.department);
			$("#priority > .name").html(data.priority);
			$("#message > .message").html(data.messagecontents);
			$("#dimmer").fadeIn("slow", function(){ $("#newticketcontainer").fadeIn(); });
			$("#alertwav").attr('src', 'statusboard/soundcommunicator.wav');
			setTimeout('clearNewTicket()', 15000)
		}
	});
	}
}; 
function clearNewTicket() {
	$("#newticketcontainer").fadeOut("slow", function(){ $("#dimmer").fadeOut(); $("#subject").html(''); $("#alertwav").attr('src', 'statusboard/soundcommunicator.wav'); });

}
// Load Google Calendar
function loadGoogleCalendar() {
	$.getJSON("http://www.google.com/calendar/feeds/video%40willowcreek.org/public/full?alt=json", function(data){ 
		$('#countdown').children().remove();
		$.each(data, function(i,item){
			 $('#countdown').append('<div><img src="statusboard/star.png" /> <span class="timeleft" id="countdown'+item.key+'">'+item.daysleft+' days</span> till <span class="title">'+item.title+'</span></div>'); 
		})
	});
};


//Parse countdown timers, as many as there are returned from data-countdown.php
function loadCountdown() {
	$.getJSON("data-countdown.php", function(data){ 
		$('#countdown').children().remove();
		$.each(data, function(i,item){
			 $('#countdown').append('<div><img src="statusboard/star.png" /> <span class="timeleft" id="countdown'+item.key+'">'+item.daysleft+' days</span> till <span class="title">'+item.title+'</span></div>'); 
		})
	});
}; //End loadCountdown

//Start Twitter
// Need searchquery to be a global variable
var searchquery;
function loadTwitter() {
	//Get Twitter Query
	$.getJSON("data-twitter.php", function(datareturn){ 
		searchquery = datareturn.query;
	// Once we have the query, send to twitter and get the results
	$.getJSON("http://search.twitter.com/search.json?q="+searchquery+"&rpp=1&lang=en&callback=?", function(data){ 
		//The query above limits the results to just one...but just in case multiple come back...
		$.each(data['results'], function(i,item){
			//Figure out if the returned tweet is already being displayed
			if ($("#tweet").html() !== item.text) {
			//If it's a new tweet, fade out the old, fade in the new...but not until the previous is done fading out!
			$("#username").fadeOut("fast", function(){$("#username").html(item.from_user);$("#username").fadeIn("fast");});
			$("#tweet").fadeOut("fast", function(){$("#tweet").html(item.text); $("#tweet").fadeIn("fast");});
			$("#userimage > img ").fadeOut("fast", function(){ $("#userimage > img").attr('src', item.profile_image_url);$("#userimage > img ").fadeIn("fast"); });
			$("#tweettime").fadeOut("fast", function(){$("#tweettime").html(relative_time(item.created_at)); $("#tweettime").fadeIn("fast");});
			} else if ($("#tweettime").html() !== relative_time(item.created_at)) {
			// If the tweet returned is the same being displayed, then just update how long ago it was posted, of course beautifully fading out and then back in.  jQuery I love you.
			$("#tweettime").fadeOut("fast", function(){$("#tweettime").html(relative_time(item.created_at)); $("#tweettime").fadeIn("fast");});
			}
		});
	});
});

}; //End loadTwitter

function loadWeather(){
	$.getJSON("data-weather.php", function(data){ 
		//Remove the large image so we can load a new one
		$('#currentimage > img').remove();
		//Parse returned data
		$("#currently > .temp ").html(data.CURRENT.TEMP + '°'); 
		$("#currently > .title ").html(data.CURRENT.TEXT); 
		$("#currently > .location ").html(data.CITY + ', ' + data.REGION ); 
		$("#forecast .icon ").css("background-image", "url(statusboard/icons.png)"); 
		$("#forecast > #forecast0 > .icon ").css("background-position", data[0].CODE * -61 +"px 0px"); 
		$("#forecast > #forecast0  > .title ").html(data[0].TEXT); 
		$("#forecast > #forecast0 > .temp > .high ").html(data[0].HIGH + '°'); 
		$("#forecast > #forecast0 > .temp > .low ").html(data[0].LOW + '°'); 
		$("#forecast > #forecast1 > .icon ").css("background-position", data[1].CODE * -61 +"px 0px"); 
		$("#forecast > #forecast1  > .title ").html(data[1].TEXT); 
		$("#forecast > #forecast1 > .temp > .high ").html(data[1].HIGH + '°'); 
		$("#forecast > #forecast1 > .temp > .low ").html(data[1].LOW + '°'); 
		//Do some date creations to figure out if it is after sunrise and before sunset
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate()
		var year = currentTime.getFullYear()
		var sunrise = data.SUNRISE.substr(0,4);
		var sunsethour = data.SUNSET.substr(0,1);
		var sunsetminute = data.SUNSET.substr(2,2);
		var sunset24hour = parseInt(sunsethour) + 12;
		sunrisedate = new Date(month + "/" + day + "/" + year + " " + sunrise + ":00");
		sunsetdate = new Date(month + "/" + day + "/" + year + " " + sunset24hour + ":" + sunsetminute + ":00");
		sunrisedate = Date.parse(sunrisedate);
		sunsetdate = Date.parse(sunsetdate);
		//If it's daytime, show the day/sun weather image, otherwise, show the night/moon image.
		if ( sunrisedate < Date.parse(currentTime) && Date.parse(currentTime)  < sunsetdate ) { daynight = "d"; } else { daynight = "n"; };
		$('#currentimage').append('<img src="http://l.yimg.com/a/i/us/nws/weather/gr/'+ data.CURRENT.CODE + daynight + '.png" />');
		// Display when the weather was last updated
		timeposition = (data.CURRENT.DATE.search(":"));
		updated = data.CURRENT.DATE.substr(timeposition-2, 8);
		$('#asof > .time').html(updated);
		// Display if the forecast for today is for today or tonight.
		if ( 3 < currentTime.getHours() && currentTime.getHours() < 14) { $("#forecast > #forecast0  > .day ").html('Today'); } else { $("#forecast > #forecast0  > .day ").html('Tonight');}
	});
}; //End loadWeather

// loadRSSFeed

function loadRSSFeed(){
		// Remove everything that the last instance of liScroll left	
		$("#rsstickercontainer").children().remove(); 
		$("#rsstickercontainer").append('<ul id="rssticker"></ul>');
	//Get the New RSS Items		
	$.getJSON("data-rss.php", function(data){ 
		for (i=0;i < 5; i++) {	
			$("ul#rssticker").append('<li><span>'+data.rss[i].title+'</span></li>'); 			
		}
		// Cute thumbnail
		$("#rsstickercontainer").append('<div class="feedicon"><img src="statusboard/'+data.feedicon+'" id="feedicon" />');
		// Using liScroll for the animation
		$("ul#rssticker").liScroll({travelocity: 0.05});
	});
}

// This function displays in friendly english how long ago the displayed twitter message was posted
    function relative_time(time_value) {
      var parsed_date = Date.parse(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
      if(delta < 60) {
      return 'less than a minute ago';
      } else if(delta < 120) {
      return 'about a minute ago';
      } else if(delta < (45*60)) {
      return (parseInt(delta / 60)).toString() + ' minutes ago';
      } else if(delta < (90*60)) {
      return 'about an hour ago';
      } else if(delta < (24*60*60)) {
      return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
      return '1 day ago';
      } else {
      return (parseInt(delta / 86400)).toString() + ' days ago';
      }
    }
