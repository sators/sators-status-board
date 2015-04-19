<?php
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

// Database Connection User/Pass
mysql_connect("localhost", "username", "password") or die(mysql_error()); 
// Database Selection
mysql_select_db("database_name") or die(mysql_error()); 
?>
