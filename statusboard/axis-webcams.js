// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

/// Javascript document to parse an AXIS webcam, but small, fixed size at 265x199
function showWebcam(ipaddress, dimmen){
  if ((navigator.appName == "Microsoft Internet Explorer")&&(navigator.platform != "MacPPC")&&(navigator.platform != "Mac68k")) {
                document.write("<OBJECT ID=\"AxisCamControl\" CLASSID=\"CLSID:917623D1-D8E5-11D2-BE8B-00104B06BDE3\" WIDTH=\"265\" HEIGHT=\"199\" CODEBASE=\"/activex/AxisCamControl.cab#Version=2,23,0,0\">");
                document.write("<PARAM NAME=DisplaySoundPanel VALUE=0>");
                document.write("<PARAM NAME=URL VALUE=\"http://" + ipaddress +"/axis-cgi/mjpg/video.cgi?camera=&resolution=" + dimmen + "\">");
                document.write("</OBJECT>");
  } else {
    theDate = new Date();
        var output = "<img height=\"240\" width=\"320\" SRC=\"http://" + ipaddress +"/axis-cgi/mjpg/video.cgi?camera=&resolution=" + dimmen + "&amp;";
    output += theDate.getTime()
    output += "\" ALT=\"No webcam displayed if outside WCCC firewall\">";
    document.write(output);
  }
}
