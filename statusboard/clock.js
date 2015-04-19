// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

// JavaScript Document for Clock Updating Magic
<!--

function updateClock ( )
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
  var currentMonth = currentTime.getMonth ( );
  var currentDate = currentTime.getDate ( );
  var currentDay = currentTime.getDay ( );
  
  var month_name=new Array(12);
	month_name[0]="January";
	month_name[1]="February";
	month_name[2]="March";
	month_name[3]="April";
	month_name[4]="May";
	month_name[5]="June";
	month_name[6]="July";
	month_name[7]="August";
	month_name[8]="September";
	month_name[9]="October";
	month_name[10]="November";
	month_name[11]="December";

  var day_name = new Array(7);
	day_name[0]="Sunday";
	day_name[1]="Monday";
	day_name[2]="Tuesday";
	day_name[3]="Wednesday";
	day_name[4]="Thursday";
	day_name[5]="Friday";
	day_name[6]="Saturday";

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  // Update the time display
  $("#clock").html(currentTimeString);
  $("#day").html(currentDate);
  $("#month").html(month_name[currentMonth]);
  $("#timeofday > .title > .float-left").html(day_name[currentDay]);
}

// -->
