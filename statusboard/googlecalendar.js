// Javascript Document that formats Google Calendar entries nicely
function formatGCalTime(gCalTime) { 
  // text for regex matches
  var remtxt = gCalTime;

  function consume(retxt) {
    var match = remtxt.match(new RegExp('^' + retxt));
    if (match) {
      remtxt = remtxt.substring(match[0].length);
      return match[0];
    }
    return '';
  }

  // minutes of correction between gCalTime and GMT
  var totalCorrMins = 0;

  var year = consume('\\d{4}');
  consume('-?');
  var month = consume('\\d{2}');
  consume('-?');
  var dateMonth = consume('\\d{2}');
  var timeOrNot = consume('T');
var todaysdate = new Date();
var todaysmonth = todaysdate.getMonth() + 1;
var todaysday = todaysdate.getDate();

  // if a DATE-TIME was matched in the regex 
  if (timeOrNot == 'T') {
    var hours = consume('\\d{2}');
    consume(':?');
    var mins = consume('\\d{2}');
    consume('(:\\d{2})?(\\.\\d{3})?');
    var zuluOrNot = consume('Z');

    // if time from server is not already in GMT, calculate offset
    if (zuluOrNot != 'Z') {
      var corrPlusMinus = consume('[\\+\\-]');
      if (corrPlusMinus != '') {
        var corrHours = consume('\\d{2}');
        consume(':?');
        var corrMins = consume('\\d{2}');
        totalCorrMins = (corrPlusMinus=='-' ? 1 : -1) * 
            (Number(corrHours) * 60 + 
	    (corrMins=='' ? 0 : Number(corrMins)));
      }
    } 

    // get time since epoch and apply correction, if necessary
    // relies upon Date object to convert the GMT time to the local
    // timezone
    var originalDateEpoch = Date.UTC(year, month - 1, dateMonth, hours, mins);
    var gmtDateEpoch = originalDateEpoch + totalCorrMins * 1000 * 60;
    var ld = new Date(gmtDateEpoch);

    // date is originally in YYYY-MM-DD format
    // time is originally in a 24-hour format
    // this converts it to MM/DD hh:mm (AM|PM) 
	if ((ld.getMonth() + 1) == todaysmonth && ld.getDate() == todaysday) {
    dateString = ((ld.getHours()>12)?(ld.getHours()-12):(ld.getHours()===0?12:
	ld.getHours())) + ((ld.getMinutes()!=0)?(':' + ((ld.getMinutes()<10)?('0' + 
	ld.getMinutes()):(ld.getMinutes()))): '') +  
	((ld.getHours()>=12)?'p':'a');
	} else { 
		
    dateString = (ld.getMonth() + 1) + '/' + ld.getDate() + ' ' + 
       ((ld.getHours()>12)?(ld.getHours()-12):(ld.getHours()===0?12:
	ld.getHours())) + ((ld.getMinutes()!=0)?(':' + ((ld.getMinutes()<10)?('0' + 
	ld.getMinutes()):(ld.getMinutes()))): '') +  
	((ld.getHours()>=12)?'p':'a');
	}
  } else {
    // if only a DATE was matched
	if (parseInt(month, 10) == todaysmonth && parseInt(dateMonth, 10) == todaysday) {
    dateString =  "Today";
	} else {
	dateString =  parseInt(month, 10) + '/' + parseInt(dateMonth, 10);
	}
  }
  return dateString;
}

/**
 * Creates an unordered list of events in a human-readable form
 *
 * @param {json} root is the root JSON-formatted content from GData
 * @param {string} divId is the div in which the events are added
 */ 


/**
 * Callback function for the GData json-in-script call
 * Inserts the supplied list of events into a div of a pre-defined name
 * 
 * @param {json} root is the JSON-formatted content from GData
 */ 
function populateevents(feed) {

  // loop through each event in the feed
  for (var i = 0; i < feed.entry.length; i++) {
    var entry = feed.entry[i];
    var title = entry.title.$t;
    var start = entry['gd$when'][0].startTime;
    var endtime = entry['gd$when'][0].endTime;

    // get the URL to link to the event
    for (var linki = 0; linki < entry['link'].length; linki++) {
      if (entry['link'][linki]['type'] == 'text/html' &&
          entry['link'][linki]['rel'] == 'alternate') {
        var entryLinkHref = entry['link'][linki]['href'];
      }
    }

    var dateString = formatGCalTime(start);
$('#eventdetails').append('<li>' + title+ '</li>'); 
$('#datetime > ul').append('<li>' + dateString + '</li>'); 
 
  }
}

function loadCalendar() {

	$.getJSON("http://www.google.com/calendar/feeds/willoweoc@gmail.com/public/full?alt=json-in-script&callback=?&orderby=starttime&max-results=7&singleevents=true&sortorder=ascending&futureevents=true", function(data){ 
 		feed = data.feed;
		  $('#eoccalendar').children().remove();  

		  // create a new unordered list
		  //var ul = document.createElement('ul');
			$('#eoccalendar').append('<div id="datetime"><ul></ul></div><ul id="eventdetails"></ul>'); 
		populateevents(feed);
	});
}
