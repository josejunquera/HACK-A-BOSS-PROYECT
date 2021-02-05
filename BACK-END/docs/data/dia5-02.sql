-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: PROYECTO_V2
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
  `id_banda` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `busco_solista` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `busco_actuacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `localizacion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `movilidad` enum('local','provincial','nacional','internacional') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `nombre_banda` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_banda`),
  KEY `banda_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `banda_id_usuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banda`
--

LOCK TABLES `banda` WRITE;
/*!40000 ALTER TABLE `banda` DISABLE KEYS */;
INSERT INTO `banda` VALUES (1,2,'no','si','localizacion112!!','local','descripcion ñ 12312121212456','banda7'),(2,7,'si','no','localizacion1','local','descripcion123456','banda8'),(3,5,'si','no','localizacion1','local','descripcion123456','Los Mecanicos');
/*!40000 ALTER TABLE `banda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_contratado_banda`
--

DROP TABLE IF EXISTS `es_contratado_banda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_contratado_banda` (
  `id_banda` int unsigned NOT NULL,
  `id_local_evento` int unsigned NOT NULL,
  `fecha` date NOT NULL,
  `contrato` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `respuesta` enum('Aceptada','Rechazada','Pendiente') COLLATE utf8mb4_spanish_ci DEFAULT 'Pendiente',
  UNIQUE KEY `id_contrato` (`id_contrato`),
  KEY `es_contratado_banda_id_banda_fk` (`id_banda`),
  KEY `es_contratado_banda_id_local_evento_fk` (`id_local_evento`),
  CONSTRAINT `es_contratado_banda_id_banda_fk` FOREIGN KEY (`id_banda`) REFERENCES `banda` (`id_banda`) ON DELETE CASCADE,
  CONSTRAINT `es_contratado_banda_id_local_evento_fk` FOREIGN KEY (`id_local_evento`) REFERENCES `local_evento` (`id_local_evento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_contratado_banda`
--

LOCK TABLES `es_contratado_banda` WRITE;
/*!40000 ALTER TABLE `es_contratado_banda` DISABLE KEYS */;
INSERT INTO `es_contratado_banda` VALUES (3,1,'2021-02-05','Paco quiero que toques en nuestro local',1,'Pendiente'),(3,1,'2021-02-05','Paco quiero que toques en nuestro local',2,'Pendiente');
/*!40000 ALTER TABLE `es_contratado_banda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_contratado_solista`
--

DROP TABLE IF EXISTS `es_contratado_solista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_contratado_solista` (
  `id_solista` int unsigned NOT NULL,
  `id_local_evento` int unsigned NOT NULL,
  `fecha` date NOT NULL,
  `contrato` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `respuesta` enum('Aceptada','Rechazada','Pendiente') COLLATE utf8mb4_spanish_ci DEFAULT 'Pendiente',
  UNIQUE KEY `id_contrato` (`id_contrato`),
  KEY `es_contratado_solista_id_solista_fk` (`id_solista`),
  KEY `es_contratado_solista_id_local_evento_fk` (`id_local_evento`),
  CONSTRAINT `es_contratado_solista_id_local_evento_fk` FOREIGN KEY (`id_local_evento`) REFERENCES `local_evento` (`id_local_evento`) ON DELETE CASCADE,
  CONSTRAINT `es_contratado_solista_id_solista_fk` FOREIGN KEY (`id_solista`) REFERENCES `solista` (`id_solista`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_contratado_solista`
--

LOCK TABLES `es_contratado_solista` WRITE;
/*!40000 ALTER TABLE `es_contratado_solista` DISABLE KEYS */;
INSERT INTO `es_contratado_solista` VALUES (13,1,'2021-02-05','Juanito quiero que toques en nuestro local',1,'Pendiente');
/*!40000 ALTER TABLE `es_contratado_solista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_tocado_banda`
--

DROP TABLE IF EXISTS `es_tocado_banda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_tocado_banda` (
  `id_banda` int unsigned NOT NULL,
  `id_genero` int unsigned NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_genero` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  KEY `es_tocado_banda_id_banda_fk` (`id_banda`),
  KEY `es_tocado_banda_id_genero_fk` (`id_genero`),
  CONSTRAINT `es_tocado_banda_id_banda_fk` FOREIGN KEY (`id_banda`) REFERENCES `banda` (`id_banda`) ON DELETE CASCADE,
  CONSTRAINT `es_tocado_banda_id_genero_fk` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_tocado_banda`
--

LOCK TABLES `es_tocado_banda` WRITE;
/*!40000 ALTER TABLE `es_tocado_banda` DISABLE KEYS */;
INSERT INTO `es_tocado_banda` VALUES (1,5,2,'Trash');
/*!40000 ALTER TABLE `es_tocado_banda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `es_tocado_solista`
--

DROP TABLE IF EXISTS `es_tocado_solista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `es_tocado_solista` (
  `id_solista` int unsigned NOT NULL,
  `id_genero` int unsigned NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_genero` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  KEY `es_tocado_solista_id_solista_fk` (`id_solista`),
  KEY `es_tocado_solista_id_genero_fk` (`id_genero`),
  CONSTRAINT `es_tocado_solista_id_genero_fk` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) ON DELETE CASCADE,
  CONSTRAINT `es_tocado_solista_id_solista_fk` FOREIGN KEY (`id_solista`) REFERENCES `solista` (`id_solista`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `es_tocado_solista`
--

LOCK TABLES `es_tocado_solista` WRITE;
/*!40000 ALTER TABLE `es_tocado_solista` DISABLE KEYS */;
INSERT INTO `es_tocado_solista` VALUES (8,2,2,'Pop'),(8,1,2,'Rock');
/*!40000 ALTER TABLE `es_tocado_solista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int unsigned NOT NULL AUTO_INCREMENT,
  `genero` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'Rock'),(2,'Pop'),(3,'Metal'),(4,'Jazz'),(5,'Trash');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_evento`
--

DROP TABLE IF EXISTS `local_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_evento` (
  `id_local_evento` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `nombre_local_evento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `localizacion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_local_evento`),
  KEY `local_evento_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `local_evento_id_usuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_evento`
--

LOCK TABLES `local_evento` WRITE;
/*!40000 ALTER TABLE `local_evento` DISABLE KEYS */;
INSERT INTO `local_evento` VALUES (1,7,'Jazz Filloa','Coruña','Todo Jazz a tope de power');
/*!40000 ALTER TABLE `local_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multimedia_banda`
--

DROP TABLE IF EXISTS `multimedia_banda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multimedia_banda` (
  `id_multimedia` int unsigned NOT NULL AUTO_INCREMENT,
  `id_banda` int unsigned NOT NULL,
  `tipo` enum('video','imagen','audio') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_multimedia`),
  KEY `multimedia_banda_id_banda_fk` (`id_banda`),
  CONSTRAINT `multimedia_banda_id_banda_fk` FOREIGN KEY (`id_banda`) REFERENCES `banda` (`id_banda`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multimedia_banda`
--

LOCK TABLES `multimedia_banda` WRITE;
/*!40000 ALTER TABLE `multimedia_banda` DISABLE KEYS */;
/*!40000 ALTER TABLE `multimedia_banda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multimedia_solista`
--

DROP TABLE IF EXISTS `multimedia_solista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multimedia_solista` (
  `id_multimedia` int unsigned NOT NULL AUTO_INCREMENT,
  `id_solista` int unsigned NOT NULL,
  `tipo` enum('video','imagen','audio') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_multimedia`),
  KEY `multimedia_solista_id_solista_fk` (`id_solista`),
  CONSTRAINT `multimedia_solista_id_solista_fk` FOREIGN KEY (`id_solista`) REFERENCES `solista` (`id_solista`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multimedia_solista`
--

LOCK TABLES `multimedia_solista` WRITE;
/*!40000 ALTER TABLE `multimedia_solista` DISABLE KEYS */;
/*!40000 ALTER TABLE `multimedia_solista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `se_agrupa`
--

DROP TABLE IF EXISTS `se_agrupa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `se_agrupa` (
  `mensaje` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_solista` int unsigned NOT NULL,
  `id_banda` int unsigned NOT NULL,
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `id_mensaje` (`id_mensaje`),
  KEY `se_agrupa_id_solista_fk` (`id_solista`),
  KEY `se_agrupa_id_banda_fk` (`id_banda`),
  CONSTRAINT `se_agrupa_id_banda_fk` FOREIGN KEY (`id_banda`) REFERENCES `banda` (`id_banda`) ON DELETE CASCADE,
  CONSTRAINT `se_agrupa_id_solista_fk` FOREIGN KEY (`id_solista`) REFERENCES `solista` (`id_solista`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `se_agrupa`
--

LOCK TABLES `se_agrupa` WRITE;
/*!40000 ALTER TABLE `se_agrupa` DISABLE KEYS */;
INSERT INTO `se_agrupa` VALUES ('manuel quiero que toques con nosotros',13,1,1),('manuel quiero que toques con nosotros',13,1,2),('manuel quiero que toques con nosotros',13,1,3),('manuel quiero que toques con nosotros',13,1,4),('manuel quiero que toques con nosotros',13,1,5),('manuel quiero que toques con nosotros',13,1,6),('manuel quiero que toques con nosotros',13,1,7),('Estoy interesado en tocar vosotros',11,3,8);
/*!40000 ALTER TABLE `se_agrupa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solista`
--

DROP TABLE IF EXISTS `solista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solista` (
  `id_solista` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `busco_banda` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `busco_actuacion` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `localizacion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `especialidad` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `movilidad` enum('local','provincial','nacional','internacional') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `nombre_solista` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_solista`),
  KEY `solista_id_usuario_fk` (`id_usuario`),
  CONSTRAINT `solista_id_usuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solista`
--

LOCK TABLES `solista` WRITE;
/*!40000 ALTER TABLE `solista` DISABLE KEYS */;
INSERT INTO `solista` VALUES (8,2,'no','si','Carballo','jaiteiro','local','el putoa mosddddddddd','Antonio'),(10,1,'si','no','localizacion1','especialidad1','local','descripcion123456','solista1'),(11,6,'si','no','localizacion1','especialidad1','local','descripcion123456','solista2'),(12,7,'si','no','localizacion1','especialidad1','local','descripcion123456','solista27'),(13,5,'si','no','localizacion3','especialidad3','local','descripcion123456','Juanito');
/*!40000 ALTER TABLE `solista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_usuario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` enum('admin','reader') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'user1@email.com','$2b$12$tBTw.FNADF8.UCnr7BbO4.NRe92XA5.cKICcxKx4cpj3oIoOjG1Hi','nombre1','apellido1','user1','admin'),(2,'user2@email.com','$2b$12$FCjTlNkBdkM4w6t6hhTZBejU.jwrjxyjc3A46gLD49mFjlK/djJmi','Antonio','Yomismo','Antonio','reader'),(3,'user3@email.com','$2b$12$4kSuE3U15W1z59K6taUwFe2jFfrTiA.fBx6C4tc2Rdyk/HDmHiquC','nombre2','apellido2','user','reader'),(4,'user4@email.com','$2b$12$sOuk4GQ0VipnzujsRv8sc.psrkdLjtDlVM4yn2jex6MaL59NxtAQ.','nombre2','apellido2','user','reader'),(5,'user1906@yopmail.com','$2b$12$G82DvjyzyVexVZhaNdZUEOrYFjkNU/3wFs95Qh0wVrE0chZCH53ca','nombre2','apellido2','user','reader'),(6,'user10@email.com','$2b$12$ebwuESgQWFD7p9seDOkvp.Pzf8.7G8IZlLVTMwUFeeHBnxpyrv5Sy','nombre','apellido','user7','reader'),(7,'user11@email.com','$2b$12$DG2tiCHF0vMezgmgdMI4leTAqIQ4DqpSJzSv3SBUHaN1Vv4B8HJFW','nombre','apellido','user7','reader');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-05 13:48:13
