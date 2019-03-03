-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 03, 2019 at 03:35 PM
-- Server version: 5.6.35
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hse_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `actiontracker`
--

CREATE TABLE IF NOT EXISTS `actiontracker` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `project` int(250) DEFAULT NULL,
  `unresolved` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `duration` varchar(350) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(200) NOT NULL,
  `companyid` int(250) NOT NULL,
  `branchid` int(250) DEFAULT NULL,
  `category` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `kind` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `banner` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(250) NOT NULL,
  `companylogo` varchar(450) NOT NULL,
  `companyname` varchar(500) NOT NULL,
  `companycode` varchar(100) NOT NULL,
  `companytype` varchar(250) NOT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `companystaffidformat` bigint(250) NOT NULL,
  `laststaffid` varchar(350) NOT NULL,
  `companysiteurl` varchar(450) NOT NULL,
  `companywebsite` varchar(200) NOT NULL,
  `sitetitle` varchar(350) NOT NULL,
  `companyaddress` varchar(300) NOT NULL,
  `companycity` varchar(200) NOT NULL,
  `companystate` varchar(200) NOT NULL,
  `companycountry` varchar(300) NOT NULL,
  `activationcode` varchar(300) NOT NULL,
  `activated` varchar(200) NOT NULL,
  `companyphone` varchar(100) DEFAULT NULL,
  `companyemail` varchar(100) DEFAULT NULL,
  `webmaillink` varchar(500) NOT NULL,
  `suspended` varchar(200) NOT NULL,
  `expirydate` varchar(200) NOT NULL,
  `package` varchar(350) NOT NULL,
  `maximumstaffs` int(250) NOT NULL,
  `maximumdepartments` int(250) DEFAULT NULL,
  `updateddate` varchar(200) NOT NULL,
  `optimizeddate` varchar(100) NOT NULL,
  `status` varchar(250) DEFAULT NULL,
  `sessionid` varchar(1000) DEFAULT NULL,
  `date` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `documentfiles`
--

CREATE TABLE IF NOT EXISTS `documentfiles` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `mediafile` varchar(500) NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emergencymgt`
--

CREATE TABLE IF NOT EXISTS `emergencymgt` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(200) NOT NULL,
  `companyid` int(250) NOT NULL,
  `branchid` int(250) DEFAULT NULL,
  `groupname` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE IF NOT EXISTS `incidents` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `projectid` int(250) NOT NULL,
  `project` varchar(250) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `assignedto` varchar(350) NOT NULL,
  `startdate` varchar(350) NOT NULL,
  `enddate` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jobalerts`
--

CREATE TABLE IF NOT EXISTS `jobalerts` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `loginattempts`
--

CREATE TABLE IF NOT EXISTS `loginattempts` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `branchid` int(250) DEFAULT NULL,
  `loginid` varchar(250) NOT NULL,
  `logintype` varchar(200) NOT NULL,
  `ipaddress` varchar(450) NOT NULL,
  `date` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `branchid` int(250) DEFAULT NULL,
  `from` varchar(350) COLLATE utf8_unicode_ci NOT NULL,
  `to` varchar(350) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `action` text COLLATE utf8_unicode_ci,
  `time` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `duration` varchar(350) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE IF NOT EXISTS `staffs` (
  `id` int(250) NOT NULL,
  `companyid` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `companyname` varchar(250) DEFAULT NULL,
  `staffid` int(250) NOT NULL,
  `photo` varchar(450) NOT NULL,
  `title` varchar(200) NOT NULL,
  `username` varchar(600) NOT NULL,
  `firstname` varchar(350) NOT NULL,
  `middlename` varchar(350) NOT NULL,
  `lastname` varchar(350) NOT NULL,
  `dob` varchar(200) NOT NULL,
  `address` varchar(350) NOT NULL,
  `city` varchar(300) NOT NULL,
  `state` varchar(300) NOT NULL,
  `country` varchar(300) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `role` varchar(250) NOT NULL,
  `location` varchar(350) DEFAULT NULL,
  `position` varchar(250) NOT NULL,
  `nextofkin` varchar(350) NOT NULL,
  `nextofkincontact` varchar(450) NOT NULL,
  `bio` text NOT NULL,
  `details` text,
  `password` varchar(1000) NOT NULL,
  `passsalt` varchar(1000) NOT NULL,
  `passwordsalt` varchar(1000) NOT NULL,
  `logincode` varchar(50) NOT NULL,
  `logindevice` varchar(500) NOT NULL,
  `logintoken` varchar(500) NOT NULL,
  `pushtoken` varchar(500) NOT NULL,
  `passwordremindercode` varchar(300) NOT NULL,
  `passwordreminderdate` varchar(300) NOT NULL,
  `authorid` varchar(250) NOT NULL,
  `author` varchar(350) NOT NULL,
  `date` varchar(200) NOT NULL,
  `currentpage` varchar(600) NOT NULL,
  `activated` varchar(50) DEFAULT NULL,
  `lastactivitydatetime` varchar(600) NOT NULL,
  `lastlogindate` varchar(250) NOT NULL,
  `updatedauthor` varchar(450) NOT NULL,
  `updateddate` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(200) NOT NULL,
  `companyid` int(250) NOT NULL,
  `branchid` int(250) DEFAULT NULL,
  `category` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `subcategory` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `banner` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trainings`
--

CREATE TABLE IF NOT EXISTS `trainings` (
  `id` int(250) NOT NULL,
  `companyid` int(250) NOT NULL,
  `userid` int(250) DEFAULT NULL,
  `username` varchar(250) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL,
  `details` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actiontracker`
--
ALTER TABLE `actiontracker`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documentfiles`
--
ALTER TABLE `documentfiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emergencymgt`
--
ALTER TABLE `emergencymgt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobalerts`
--
ALTER TABLE `jobalerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loginattempts`
--
ALTER TABLE `loginattempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actiontracker`
--
ALTER TABLE `actiontracker`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `documentfiles`
--
ALTER TABLE `documentfiles`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `emergencymgt`
--
ALTER TABLE `emergencymgt`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jobalerts`
--
ALTER TABLE `jobalerts`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loginattempts`
--
ALTER TABLE `loginattempts`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trainings`
--
ALTER TABLE `trainings`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
