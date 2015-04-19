<?php
//error_reporting(E_ALL);
require_once 'statusboard/db_connect.php';
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************
// Get Last New Ticket Displayed
$data = mysql_query("SELECT value1 AS lastnewticket FROM statusboard WHERE type = 'lastnewticketid'") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_newticket["lastnewticketid"] = $temp["lastnewticket"];
}
// Get the next new ticket to be displayed
$data = mysql_query("SELECT subject, dateline, ticketid, fullname, departmentid, priorityid, firstpostid  FROM `swtickets` WHERE ticketstatusid = 1 AND ticketid > ".$_newticket["lastnewticketid"]." ORDER BY dateline ASC LIMIT 1") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_newticket = $temp;
}
// Get ticket post contents
$data = mysql_query("SELECT contents FROM  `swticketposts` WHERE ticketpostid =". $_newticket["firstpostid"]) or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_newticket["messagecontents"] = $temp['contents'];
}
// Get what department the ticket belongs to
$data = mysql_query("SELECT title FROM  swdepartments WHERE departmentid =". $_newticket["departmentid"]) or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_newticket["department"] = $temp['title'];
}
// Get what priority the ticket is
$data = mysql_query("SELECT title FROM  swticketpriorities WHERE priorityid =". $_newticket["priorityid"]) or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_newticket["priority"] = $temp['title'];
}
// Store what ticket we are now displaying so it doesn't display it twice
mysql_query("UPDATE statusboard SET value1 = ".$_newticket["ticketid"]." WHERE type = 'lastnewticketid'");

// Make the date pretty
$_newticket["friendlydate"] = date("F j, Y g:i a", $_newticket["dateline"]);

// JSON the data
echo json_encode($_newticket); 

?>
