-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: poppy_streets
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `southwest_longitude` decimal(12,8) DEFAULT NULL,
  `southwest_latitude` decimal(12,8) DEFAULT NULL,
  `northeast_longitude` decimal(12,8) DEFAULT NULL,
  `northeast_latitude` decimal(12,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Richmond','BC','Canada',-123.20062900,49.12470200,-123.09215300,49.17722600);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `streets`
--

DROP TABLE IF EXISTS `streets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `streets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `southwest_longitude` decimal(10,6) NOT NULL,
  `southwest_latitude` decimal(10,6) NOT NULL,
  `northeast_longitude` decimal(10,6) NOT NULL,
  `northeast_latitude` decimal(10,6) NOT NULL,
  `street_sign_image_url` varchar(255) DEFAULT NULL,
  `story` varchar(5000) DEFAULT NULL,
  `resources` varchar(255) DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `streets`
--

LOCK TABLES `streets` WRITE;
/*!40000 ALTER TABLE `streets` DISABLE KEYS */;
INSERT INTO `streets` VALUES (1,'Allison Street',49.150313,-123.116380,49.151717,-123.116281,NULL,'Lyle Melburn Allison enlisted in Winnipeg March 18, 1943, and had his current address at the time of enlistment as General Delivery, Swan River, Manitoba; Lyle changed his next of kin address to Marpole in 1943. His parents were Thomas and Florence Allison and they moved to Richmond in 1942. Their address was listed as both Sub Post Office 32, Marpole, BC and 371 Patterson Rd Lulu Island, Marpole, BC.┬áLyle had three sisters Thelma, Audrey and Doreen.\nOn his attestation paper Lyle lists his religion as United Church, he was single, and worked as a farm labourer, having a Grade 3 education. On enlistment he was sent to North Bay, Ontario for training where he was assigned to the Infantry. He attended driver training courses in Woodstock, Ontario and Shilo, Manitoba before embarkation.┬á┬áHowever, he failed to qualify as a driver/mechanic. He left for England with the Canadian Army, attached to the Royal Regiment of Canada in April 1944. He was reported as wounded August 1, 1944 and was killed in action in France on August 12, 1944.',NULL,'Richmond','BC'),(2,'Ambercrombie Drive',49.156635,-123.140269,49.158795,-123.138071,NULL,'John James (Jack) Watson Abercrombie lived with his parents Mr. and Mrs. John Abercrombie and sisters May and Doris. After graduation from Richmond High School, Jack was employed by Boeing Aircraft on Sea Island. He would have preferred to join the Royal Canadian Air Force, but there were no opportunities for this when he was of age. On enlistment in January 1944, Jack joined the Calgary Highlanders. He received basic training in Canada and went overseas from Halifax in June 1944. In his letters home, he told his family that he was enjoying his short time in England. Jack arrived in France on September 1, 1944 and was fatally wounded on September 8, 1944.',NULL,'Richmond','BC');
/*!40000 ALTER TABLE `streets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15  0:23:34
