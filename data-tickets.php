<?php
//error_reporting(E_ALL);

require_once 'statusboard/db_connect.php';
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

// Get the total number of tickets by status
$data = mysql_query("SELECT ticketstatusid, COUNT(*) AS totals FROM swtickets GROUP BY ticketstatusid") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_ticketcnt[$temp['ticketstatusid']] = $temp['totals'];
}
// Save that in the final array
$totals["totalcounts"] = $_ticketcnt;
// Get all of the nonclosed counts
$data = mysql_query("SELECT SUM(CASE WHEN ticketstatusid !=3 THEN 1 ELSE 0 END ) AS nonclosed FROM swtickets WHERE ticketstatusid !=3") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$totalnonclosed = $temp['nonclosed'];
}
// The closed count
$totalclosed = $_ticketcnt["3"];


// Store Daily Total Ticket Counts for Comparison
$data = mysql_query("SELECT value1 AS lastupdated FROM statusboard WHERE type = 'tickettotalcomparedate'") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$lastupdateddate = $temp["lastupdated"];
}
$todaymidnight = date("U", mktime(0, 0, 0, date("m"), date("d"), date("Y")));
if ($lastupdateddate < $todaymidnight) { 
	mysql_query("UPDATE statusboard SET value1 = ".time()." WHERE type = 'tickettotalcomparedate'");
	mysql_query("UPDATE statusboard SET value2 = ".$totalnonclosed." WHERE indexnumber =5");
	mysql_query("UPDATE statusboard SET value2 = ".$totalclosed." WHERE indexnumber =6");
}
// Do Ticket Comparison
$data = mysql_query("SELECT value1, value2 FROM statusboard WHERE type = 'ticketcount'") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$midnightcount[$temp['value1']] = $temp['value2'];
}
$closedbalance = $midnightcount["closed"] - $totalclosed;
$nonclosedbalance = $midnightcount["nonclosed"] - $totalnonclosed;
$balancedifference = $nonclosedbalance - $closedbalance;

$changepercent["total"] = round(((abs($balancedifference) / ($totalclosed + $totalnonclosed))*100), 2); 

if ( $balancedifference > 0 ) { 
	$changepercent["direction"] = "down"; 
} elseif ($balancedifference < 0){
	$changepercent["direction"] = "up"; 
} else {
	$changepercent["direction"] = "none"; 
}
$totals["tickettrend"] = $changepercent;

//Department Names
 $data = mysql_query("SELECT title FROM swdepartments WHERE departmentmodule = 'tickets'") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
$_deptname [] = $temp['title'];
}
//Get Total Open Tickets by Department
 $data = mysql_query("SELECT SUM(CASE WHEN ticketstatusid = 1 THEN 1 ELSE 0 END) AS deptopen FROM swtickets WHERE ticketstatusid = 1 GROUP BY departmentid")or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
$_deptopen [] = $temp['deptopen'];
}
//Get Total Overdue Tickets by Department
 $data = mysql_query("SELECT SUM(CASE WHEN duetime < ".time()." AND duetime > 0 AND ticketstatusid = 1 THEN 1 ELSE 0 END) AS deptoverdue FROM swtickets GROUP BY departmentid ") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
$_deptoverdue [] = $temp['deptoverdue'];
}

// Set a top open ticket number for the dynamic column height of 100%.  We'll throw in 40, but only use 40 if no department has more than 40.  This way, if all departments only have a few open tickets, their columns are not all at 100% height
$_deptopen["maxoverride"] = 40;
$mostopentickets = max($_deptopen);

//Printing and Combining all to one array
foreach ($_deptname as $key => $title) {
	$totals[$title] = array('overdue' => $_deptoverdue[$key],  'open' => $_deptopen[$key], 'height' => round($_deptopen[$key]/$mostopentickets,2)*100);
}


// Last 5 Tickets
 $data = mysql_query("SELECT subject, dateline, duetime FROM swtickets WHERE ticketstatusid != 3 ORDER BY dateline DESC LIMIT 5") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
if (time() - $temp["dateline"] <= 3600) { $isnew = 1; } else { $isnew = 0; }
if ($temp["duetime"] < time() && $temp["duetime"] > 0) { $isoverdue = 1; } else { $isoverdue = 0; }
if( strlen($temp["subject"]) > 40) { $newsubject = substr($temp["subject"],0,40).'...'; } else { $newsubject = $temp["subject"];}
$_newtickets [] = array( 'subject' => $newsubject, 'isnew' => $isnew, 'isoverdue' => $isoverdue) ;
}
 


// Top 5 Overdue Tickets
 $data = mysql_query("SELECT subject FROM swtickets WHERE duetime < ".time()." AND duetime > 0 AND ticketstatusid = 1 ORDER BY dateline ASC LIMIT 5") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
if( strlen($temp["subject"]) > 40) { $newsubject = substr($temp["subject"],0,40).'...'; } else { $newsubject = $temp["subject"];}
$_overduetickets [] = $newsubject;
}


// Last 5 Changed Tickets -- depreciated
 $data = mysql_query("SELECT subject, dateline, duetime FROM swtickets ORDER BY lastactivity DESC LIMIT 5") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
if (time() - $temp["dateline"] <= 3600) { $isnew = 1; } else { $isnew = 0; }
if ($temp["duetime"] < time() && $temp["duetime"] > 0) { $isoverdue = 1; } else { $isoverdue = 0; }
if( strlen($temp["subject"]) > 40) { $newsubject = substr($temp["subject"],0,40).'...'; } else { $newsubject = $temp["subject"];}
$_changedtickets [] = array( 'subject' => $newsubject, 'isnew' => $isnew, 'isoverdue' => $isoverdue) ;
}


//Totals packaging
$totals['newtickets'] = $_newtickets;
$totals['overduetickets'] = $_overduetickets;
$totals['changedtickets'] = $_changedtickets;

//JSON this guy
echo json_encode($totals); 

?>
