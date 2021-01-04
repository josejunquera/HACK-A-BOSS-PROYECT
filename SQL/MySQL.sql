-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banda`
--

DROP TABLE IF EXISTS `banda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banda` (
  `email_banda` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `multimedia` blob,
  `busco` enum('busco musico','busco actuaciones','busco musicos y actuaciones') COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_banda` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `genero_musical` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `movilidad` enum('local','provincial','nacional','internacional') COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`email_banda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banda`
--

LOCK TABLES `banda` WRITE;
/*!40000 ALTER TABLE `banda` DISABLE KEYS */;
/*!40000 ALTER TABLE `banda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_contratado_banda_local`
--

DROP TABLE IF EXISTS `es_contratado_banda_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_contratado_banda_local` (
  `email_local_evento` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email_banda` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrato` tinyblob NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`email_local_evento`,`email_banda`),
  KEY `es_contratado_email_banda_fk` (`email_banda`),
  CONSTRAINT `es_contratado_email_banda_fk` FOREIGN KEY (`email_banda`) REFERENCES `banda` (`email_banda`) ON DELETE CASCADE,
  CONSTRAINT `es_contratado_email_local_evento_banda_fk` FOREIGN KEY (`email_local_evento`) REFERENCES `local_evento` (`email_local_evento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_contratado_banda_local`
--

LOCK TABLES `es_contratado_banda_local` WRITE;
/*!40000 ALTER TABLE `es_contratado_banda_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `es_contratado_banda_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_contratado_musico_local`
--

DROP TABLE IF EXISTS `es_contratado_musico_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_contratado_musico_local` (
  `email_local_evento` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email_musico` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrato` tinyblob NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`email_local_evento`,`email_musico`),
  KEY `es_contratado_email_musico_fk` (`email_musico`),
  CONSTRAINT `es_contratado_email_local_evento_musico_fk` FOREIGN KEY (`email_local_evento`) REFERENCES `local_evento` (`email_local_evento`) ON DELETE CASCADE,
  CONSTRAINT `es_contratado_email_musico_fk` FOREIGN KEY (`email_musico`) REFERENCES `musico` (`email_musico`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_contratado_musico_local`
--

LOCK TABLES `es_contratado_musico_local` WRITE;
/*!40000 ALTER TABLE `es_contratado_musico_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `es_contratado_musico_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_evento`
--

DROP TABLE IF EXISTS `local_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_evento` (
  `email_local_evento` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `multimedia` blob,
  `contrasena` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_local` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`email_local_evento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_evento`
--

LOCK TABLES `local_evento` WRITE;
/*!40000 ALTER TABLE `local_evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musico`
--

DROP TABLE IF EXISTS `musico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musico` (
  `email_musico` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `multimedia` blob,
  `busco` enum('busco banda','busco actuacion','Busco banda y/o actuacion') COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `genero_musical` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `instrumento` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `movilidad` enum('local','provincial','nacional','internacional') COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`email_musico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musico`
--

LOCK TABLES `musico` WRITE;
/*!40000 ALTER TABLE `musico` DISABLE KEYS */;
/*!40000 ALTER TABLE `musico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `se_agrupa`
--

DROP TABLE IF EXISTS `se_agrupa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `se_agrupa` (
  `email_banda` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email_musico` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrato` tinyblob NOT NULL,
  PRIMARY KEY (`email_banda`,`email_musico`),
  KEY `se_agrupa_email_musico_fk` (`email_musico`),
  CONSTRAINT `se_agrupa_email_banda_fk` FOREIGN KEY (`email_banda`) REFERENCES `banda` (`email_banda`) ON DELETE CASCADE,
  CONSTRAINT `se_agrupa_email_musico_fk` FOREIGN KEY (`email_musico`) REFERENCES `musico` (`email_musico`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `se_agrupa`
--

LOCK TABLES `se_agrupa` WRITE;
/*!40000 ALTER TABLE `se_agrupa` DISABLE KEYS */;
/*!40000 ALTER TABLE `se_agrupa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-28 19:13:38
