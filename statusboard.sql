-- phpMyAdmin SQL Dump
-- version 3.2.2.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 13, 2010 at 10:45 PM
-- Server version: 5.1.37
-- PHP Version: 5.2.10-2ubuntu6.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `prodsys-support`
--

-- --------------------------------------------------------

--
-- Table structure for table `statusboard`
--

CREATE TABLE IF NOT EXISTS `statusboard` (
  `indexnumber` int(11) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  `value1` text NOT NULL,
  `value2` text NOT NULL,
  PRIMARY KEY (`indexnumber`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `statusboard`
--

INSERT INTO `statusboard` (`indexnumber`, `type`, `value1`, `value2`) VALUES
(3, 'twittersearch', 'WillowEOC+OR+sators+OR+WillowCreekCC+OR+ctdrt+OR+churchtech+OR+MonsterChurch+OR+wcagls+OR+chugger127+OR+jsstewart', ''),
(4, 'tickettotalcomparedate', '1281675601', ''),
(5, 'ticketcount', 'nonclosed', '274'),
(6, 'ticketcount', 'closed', '1317'),
(7, 'lastnewticketid', '1805', ''),
(8, 'rssfeed', 'wccc.png', 'http://staffroom.willowcreek.org/?feed=rss2'),
(9, 'rssfeed', 'engadget.png', 'http://www.engadget.com/rss.xml'),
(10, 'rssfeed', 'msnbc.png', 'http://pheedo.msnbc.msn.com/id/3032091/device/rss'),
(11, 'lastfeed', '5', ''),
(14, 'rssfeed', 'yamaha.png', 'http://www.yamahaproaudio.com/rss/news.xml'),
(13, 'rssfeed', 'apple.png', 'http://images.apple.com/main/rss/hotnews/hotnews.rss'),
(12, 'rssfeed', 'wccc.png', 'http://wccc.blogs.com/willow_news/rss.xml'),
(16, 'rssfeed', 'sony.png', 'http://www.sonybiz.net/biz/rss/en_EU/Sony-BC-RSS.rss'),
(17, 'rssfeed', 'churchproduction.png', 'http://www.churchproduction.com/go.php/rss'),
(18, 'rssfeed', 'meyer.png', 'http://feeds.feedburner.com/MeyerSoundNews'),
(20, 'countdown', '10/9/2010', '35th Anniversary');
