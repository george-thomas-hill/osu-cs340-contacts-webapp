-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_hillge
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `communicationModes`
--

DROP TABLE IF EXISTS `communicationModes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communicationModes` (
  `comId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`comId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communicationModes`
--

LOCK TABLES `communicationModes` WRITE;
/*!40000 ALTER TABLE `communicationModes` DISABLE KEYS */;
INSERT INTO `communicationModes` VALUES (1,'SMS Message'),(2,'Voice Call'),(3,'Meeting');
/*!40000 ALTER TABLE `communicationModes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `contactId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `emergencyContactId` int(11) DEFAULT NULL,
  PRIMARY KEY (`contactId`),
  KEY `contacts_fk_user` (`userId`),
  KEY `contacts_fk_emergency_contact` (`emergencyContactId`),
  CONSTRAINT `contacts_fk_emergency_contact` FOREIGN KEY (`emergencyContactId`) REFERENCES `contacts` (`contactId`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `contacts_fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,1,'Jung','Jordan','617-555-1004','jordan@example.com','Owes me $15.',NULL),(2,1,'Smith','Sydney','617-555-1005','sydney@example.com','Has a dog.',1),(3,1,'Rogers','Robin','617-555-1006','robin@example.com','Software engineer.',NULL),(4,2,'Moore','Murphy','617-555-1007','murphy@example.com','Birthday is Jan. 1.',NULL),(5,2,'Hall','Hollis','617-555-1008','hollis@example.com','',4),(6,2,'Brown','Brighton','617-555-1009','brighton@example.com','',NULL);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactionDetails`
--

DROP TABLE IF EXISTS `interactionDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interactionDetails` (
  `interactId` int(11) NOT NULL,
  `comId` int(11) NOT NULL,
  `details` varchar(255) NOT NULL,
  KEY `interactionDetails_fk_interaction` (`interactId`),
  KEY `interactionDetails_fk_comType` (`comId`),
  CONSTRAINT `interactionDetails_fk_comType` FOREIGN KEY (`comId`) REFERENCES `communicationModes` (`comId`),
  CONSTRAINT `interactionDetails_fk_interaction` FOREIGN KEY (`interactId`) REFERENCES `interactions` (`interactId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactionDetails`
--

LOCK TABLES `interactionDetails` WRITE;
/*!40000 ALTER TABLE `interactionDetails` DISABLE KEYS */;
INSERT INTO `interactionDetails` VALUES (1,1,'Made plans to meet up over coffee or lunch.'),(2,2,'Chose a spot and time for lunch.'),(3,3,'Met up for lunch at Queen Margherita Pizza; he forgot his wallet so I covered.'),(4,1,'Reminded him he owes me for lunch.'),(4,2,'He called me apologize for taking so long to repay him.');
/*!40000 ALTER TABLE `interactionDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interactions` (
  `interactId` int(11) NOT NULL AUTO_INCREMENT,
  `contactId` int(11) NOT NULL,
  `start` datetime NOT NULL,
  PRIMARY KEY (`interactId`),
  KEY `interactions_fk_contact` (`contactId`),
  CONSTRAINT `interactions_fk_contact` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`contactId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

LOCK TABLES `interactions` WRITE;
/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
INSERT INTO `interactions` VALUES (1,1,'2000-01-01 09:00:00'),(2,1,'2000-01-02 10:00:00'),(3,1,'2000-01-03 11:00:00'),(4,1,'2000-01-13 12:00:00');
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Macintosh','Morgan','555-555-1001','morgan@example.com'),(2,'Stone','Skyler','555-555-1002','skyler@example.com'),(3,'Adams','Armani','555-555-1003','armani@example.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-24  7:42:49