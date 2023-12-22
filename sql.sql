-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: atsuo_judge
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contests` (
  `id` varchar(20) NOT NULL,
  `problems` text,
  `public` tinyint(1) DEFAULT NULL,
  `name` text,
  `editor` text,
  `tester` text,
  `start` datetime DEFAULT NULL,
  `period` bigint DEFAULT NULL,
  `rated` text,
  `rated_users` text,
  `unrated_users` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
INSERT INTO `contests` VALUES ('aac001','[\"test_a\"]',1,'AAC001 (4b)','[\"yama_can\"]','[]','2023-11-08 16:48:25',100000000000,'0-inf','[]','[]','## AtsuoCoderとは\nAtsuoCoderは、PCプログラミング部の公式の競技プログラミング用ジャッジサーバーです。\n## 4bコンテスト\nAAC001は4bコンテスト（For Beginners コンテスト）で、通常のコンテストより簡単になるように作られていますが、最後の方の問題は難しいです。');
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_token`
--

DROP TABLE IF EXISTS `ct_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_token` (
  `id` char(36) NOT NULL,
  `use_to` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_token`
--

LOCK TABLES `ct_token` WRITE;
/*!40000 ALTER TABLE `ct_token` DISABLE KEYS */;
INSERT INTO `ct_token` VALUES ('013c0c4f-5486-4410-a193-95b127f90537','SUBMIT','2023-12-21 12:01:47','yama_can'),('0164bfab-dec5-4870-805a-cc9d9424c506','SUBMIT','2023-11-14 19:22:07','yama_can'),('01e437bd-812b-4468-ab3f-4b69a5c289bb','SUBMIT','2023-11-13 19:44:06','yama_can'),('035c9fd7-1acf-4860-8940-495b73669188','SUBMIT','2023-12-21 10:39:21','yama_can'),('0a232e8b-0f67-40a8-95b3-5b6bbfeebcf9','SUBMIT','2023-11-14 19:49:46','yama_can'),('0e1c5ce9-2785-42b7-aecc-1d647f08653d','SUBMIT','2023-12-21 12:03:15','yama_can'),('0eca3bb5-a4cc-46c9-945e-5196fdb70a19','SUBMIT','2023-12-21 12:01:38','yama_can'),('15bf6a75-26a8-4225-8c2a-b28559e7df3c','SUBMIT','2023-11-13 19:44:31','yama_can'),('16dd1a4d-8291-45fb-aed6-45286bdabdfc','LOGIN','2023-12-20 19:33:32',NULL),('19449bdc-92cd-4e21-a365-22de96360ccb','LOGIN','2023-12-21 11:18:03',NULL),('1ea06db3-5b21-4db5-b8a7-70c68271276c','SUBMIT','2023-12-21 12:02:20','yama_can'),('20ee795c-08fd-4aa7-a81d-ae16ba3bf665','SUBMIT','2023-12-20 23:15:44','yama_can'),('22dbd704-5ec7-4d53-aaf3-753208996d1f','SUBMIT','2023-12-20 23:15:32','yama_can'),('2422e192-5158-4509-978b-2f126fcaee96','LOGIN','2023-12-20 19:33:31',NULL),('247def4d-d489-44cc-8eae-e3dfdaf094bf','SUBMIT','2023-12-20 23:20:53','yama_can'),('24cb2951-c54a-4871-92a0-43d66aa09179','SUBMIT','2023-11-14 17:44:44','yama_can'),('27682c2f-cb4e-4fd3-b2b5-15fca52d781e','SUBMIT','2023-11-13 19:44:54','yama_can'),('2cc7faed-95c4-4cd9-9bd9-2bfc909e313e','SUBMIT','2023-11-13 19:43:51','yama_can'),('2fe43331-04a5-4ab7-85cd-eff2de54e5e5','SUBMIT','2023-12-20 23:15:23','yama_can'),('335e9cc0-7c6c-4d4b-8d9f-d5cf6e954a3b','SUBMIT','2023-12-21 12:02:12','yama_can'),('3832613a-6858-4dcb-9c47-c49b3f57e232','LOGIN','2023-12-20 19:25:06',NULL),('3cb7fbf6-2f24-4a5c-a2f1-5ff26ee22826','LOGIN','2023-12-21 11:20:05',NULL),('3e33332d-d6a3-4b39-9eeb-12a326fb1a69','SUBMIT','2023-12-20 23:19:22','yama_can'),('3e6879ee-d0b9-495b-8572-a062089f3e48','LOGIN','2023-12-21 10:54:45',NULL),('3f93dd1e-e164-47b2-8f98-e0cff1726261','LOGIN','2023-12-20 19:35:39',NULL),('3fd7eb85-f84c-4a6e-b197-88015488b819','SUBMIT','2023-12-20 23:11:33','yama_can'),('462b413b-0a7c-48df-b700-10d90cafbe5a','LOGIN','2023-12-20 19:33:29',NULL),('4720d0d2-8826-4b02-8f5a-19bb5be03d1b','SUBMIT','2023-12-21 12:06:17','yama_can'),('4ca2df66-c8b8-47b8-be26-296bbd9c11cd','SUBMIT','2023-12-21 12:00:01','yama_can'),('4cc44a13-1e90-47a7-ad11-8a46e86d93bf','SUBMIT','2023-11-14 17:41:45','yama_can'),('4f76e0e6-6b08-4177-b08a-74e132535d74','SUBMIT','2023-12-21 10:57:17','yama_can1'),('51cbee3f-5b3c-4e82-a0fd-1df9b550e144','SUBMIT','2023-12-21 12:01:49','yama_can'),('53bc0534-62dc-4fa0-b226-3b9db1468d0d','SUBMIT','2023-12-20 23:17:47','yama_can'),('54533b4b-7046-4e9b-87f0-24bb381ccb53','SUBMIT','2023-12-20 23:15:22','yama_can'),('56908617-40b3-4db6-b719-75c2e78e8b45','LOGIN','2023-12-21 11:18:42',NULL),('578aff67-bca9-4527-864e-2a88e3dad184','SUBMIT','2023-12-20 23:10:37','yama_can'),('59915977-cf38-4c2c-8850-e8257a90a8c6','SUBMIT','2023-12-20 23:12:48','yama_can'),('59ea446b-1a94-419e-9549-32859e95441f','SUBMIT','2023-11-14 19:49:46','yama_can'),('5bc7be40-2e61-470c-9186-f370614ac363','LOGIN','2023-11-13 17:52:31',NULL),('5c517b6a-7198-425d-bb6b-99a2f0f7dbbd','SUBMIT','2023-12-21 10:56:35','yama_can1'),('614fb059-610a-4513-a877-c4b64fc7eb08','SUBMIT','2023-12-20 23:19:23','yama_can'),('62dc3539-89b1-45b9-82af-4c625815de5b','SUBMIT','2023-12-21 12:03:14','yama_can'),('64e1f1a2-f972-47c3-b057-55ec23fe99a7','SUBMIT','2023-12-21 12:03:18','yama_can'),('6864bfd1-7bc3-4f08-8a46-8195cd6b57b3','SUBMIT','2023-11-14 19:49:46','yama_can'),('68687ef9-0dc9-40f3-ade0-c5b97e603c1f','SUBMIT','2023-11-14 17:41:34','yama_can'),('68d4774e-bf2c-4795-9ea9-df6dcc3644f0','LOGIN','2023-12-20 19:35:40',NULL),('6926d8bf-f094-4590-a521-0d5dd93b58f5','SUBMIT','2023-11-13 19:45:33','yama_can'),('6927e737-7a01-4b5e-aeef-b75c47535f59','SUBMIT','2023-11-15 15:51:40','yama_can'),('6c82277b-cbf2-4eea-8f63-c508459ba63e','SUBMIT','2023-12-20 23:17:45','yama_can'),('6f9adb4f-b3df-4fc0-bfd6-e5536d41953e','SUBMIT','2023-12-20 23:13:25','yama_can'),('7298a215-0682-4792-8399-b47bfb633315','LOGIN','2023-12-21 11:18:00',NULL),('72fcb0e4-9cda-4cc1-b041-a79e4e2810e8','SUBMIT','2023-12-20 23:09:49','yama_can'),('76818dd1-3822-43cc-93e0-222940fa1942','SUBMIT','2023-12-21 12:00:42','yama_can'),('783cbbca-b350-4e92-a225-b44541a3dd37','SUBMIT','2023-12-21 12:02:21','yama_can'),('7bde0608-1c62-4502-8114-2b755bd1de8b','LOGIN','2023-12-20 19:35:40',NULL),('7c60c136-7eed-4985-95a1-50706ee983b3','SUBMIT','2023-12-21 12:02:23','yama_can'),('826e097b-26ec-44bf-9019-3c7a4a486471','SUBMIT','2023-12-20 23:13:13','yama_can'),('83094c22-2fcb-4f00-aefd-54adda7ec290','SUBMIT','2023-12-21 14:08:01','yama_can'),('8325e495-eb34-4075-a200-51adeca08d2c','LOGIN','2023-12-20 19:25:15',NULL),('89a3eeea-5887-49f5-af8f-1539148f7456','LOGIN','2023-12-21 11:18:43',NULL),('89d412da-8ddf-4666-b9b1-ab4bd82720ea','SUBMIT','2023-12-20 23:21:11','yama_can'),('8a5042e9-f652-45b8-8cc0-31ab1db651e4','LOGIN','2023-12-20 19:25:20',NULL),('8a79e4ff-f703-4cf6-b4a1-96ba10f2997d','SUBMIT','2023-12-21 12:30:22','yama_can'),('8b2171e0-f7db-4abf-bd34-6ef0f0c17bed','SUBMIT','2023-11-13 19:44:25','yama_can'),('91f86d9f-97c7-436d-bb89-fb835ad945d0','SUBMIT','2023-11-14 17:44:55','yama_can'),('920b80f4-2549-4db8-99c7-a875e28a932e','LOGIN','2023-12-21 11:18:27',NULL),('921e2265-c510-44cc-b6b7-f3a91e227d1b','SUBMIT','2023-12-20 23:21:10','yama_can'),('9257b5d6-b651-4e8c-8914-62108f3b7016','SUBMIT','2023-12-20 23:15:46','yama_can'),('93bc8b65-0ff6-46c5-99da-46454506d404','SUBMIT','2023-12-20 23:11:13','yama_can'),('9ade7954-47a3-46df-a780-521ae5ac69c2','SUBMIT','2023-12-20 23:10:49','yama_can'),('9bd0033a-8a23-46d9-9ef2-11cf22a7a998','SUBMIT','2023-12-20 23:20:30','yama_can'),('9d69e495-add9-4ef5-bc2e-df99e3a4508e','LOGIN','2023-12-20 19:35:38',NULL),('9d7dd05b-e0fd-4148-b863-7b619bb3a777','SUBMIT','2023-12-20 23:17:59','yama_can'),('9e249170-ca08-41b4-abaa-36ea01a7d3c2','LOGIN','2023-12-20 23:11:24',NULL),('a121a34d-9f27-41bb-8d3b-76912c5e8653','LOGIN','2023-12-21 11:18:21',NULL),('a4b05d3a-5678-47b0-8a59-8acc187096f3','LOGIN','2023-12-21 11:18:41',NULL),('a4d518ac-f639-47fc-b4c3-83d91e615c0f','SUBMIT','2023-12-21 12:01:03','yama_can'),('a67d0d6a-f548-40d0-ba71-1976ec8acdf3','SUBMIT','2023-12-20 23:11:32','yama_can'),('a726fe82-8e70-4fb0-a2bf-9f5578881c71','SUBMIT','2023-12-21 12:01:34','yama_can'),('a8662926-b01c-437a-839e-7e161d0b0392','SUBMIT','2023-11-14 17:41:28','yama_can'),('a93900d2-cca3-4bf6-9f5e-1e176d1e0c9e','SUBMIT','2023-11-14 18:34:07','yama_can'),('ab78d0b8-bc9a-40cf-ab6d-1b95ae908eb4','LOGIN','2023-12-21 11:18:36',NULL),('ac094666-b844-4e73-8bdd-1c951e6e8a6d','LOGIN','2023-12-20 19:35:51',NULL),('acb2cf75-a4d0-4ba2-a986-e60145eb3df1','SUBMIT','2023-12-21 10:57:25','yama_can1'),('ae81a8c8-1765-40a4-9fdd-e033096528c0','SUBMIT','2023-12-21 10:57:27','yama_can1'),('aee6bac6-f68c-4323-89fd-456d6b2fc900','SUBMIT','2023-12-20 23:10:47','yama_can'),('af7c7a7a-93c1-459f-88d3-81a464f11cae','SUBMIT','2023-12-20 23:20:58','yama_can'),('b41cdbac-a3dc-4ee6-b1f1-7e7c41d6c1ca','SUBMIT','2023-12-20 23:19:25','yama_can'),('b582766b-f53e-477a-8127-efd3d248fe59','SUBMIT','2023-12-20 23:18:07','yama_can'),('b757853d-961d-4929-9b5e-36b1e222351a','SUBMIT','2023-11-14 17:28:51','yama_can'),('c8254a5f-e7a8-4751-b43a-885275f30b30','SUBMIT','2023-12-20 23:20:31','yama_can'),('cba5d809-4478-4b36-8fbe-68fc31181c2e','SUBMIT','2023-12-20 23:19:52','yama_can'),('cdcae023-129b-4684-8ce8-428a6d53270c','SUBMIT','2023-12-20 23:13:31','yama_can'),('ce106b56-0000-44a0-908a-844b1ca4d492','SUBMIT','2023-12-20 23:11:56','yama_can'),('cede8c73-ba84-4db7-b398-8d3e790b82de','LOGIN','2023-12-20 19:31:19',NULL),('cf73076d-0be0-4907-a12f-8cccee583ee3','SUBMIT','2023-12-20 23:15:37','yama_can'),('d2452ded-dcdf-4ca5-9616-11be96496f61','SUBMIT','2023-12-21 14:04:16','yama_can'),('d44a35d5-2736-4cbe-8078-f7272cec5806','SUBMIT','2023-12-21 10:57:15','yama_can1'),('d476eff3-f08c-4463-bdf4-a00cbc2581cb','SUBMIT','2023-12-21 12:00:49','yama_can'),('d5a05918-d69e-4135-b97a-2030622ee985','SUBMIT','2023-12-21 12:02:52','yama_can'),('d5d14451-77ad-4433-9570-b6046b5cf17f','SUBMIT','2023-12-20 23:16:36','yama_can'),('d72d4324-50b7-4f9c-93aa-13664eb92de5','LOGIN','2023-12-21 11:13:56',NULL),('da79d169-580b-4459-a378-06eead3f5e2a','SUBMIT','2023-12-21 12:03:17','yama_can'),('dcc2f3dd-8cd8-4b66-a238-eea17b1b2c61','SUBMIT','2023-12-21 10:57:17','yama_can1'),('de214313-10cb-46bc-bd1b-ea78364eaca4','SUBMIT','2023-11-13 19:44:38','yama_can'),('df753f87-9b7a-4fd1-9bfa-a9e419663070','SUBMIT','2023-11-14 17:45:00','yama_can'),('e1a276e0-fd64-4203-b37b-4f4812a6c54b','LOGIN','2023-12-20 19:33:23',NULL),('e38d560c-221e-4c60-a026-972f5982f187','SUBMIT','2023-12-21 12:02:11','yama_can'),('e3b382f9-9129-40f1-b219-df865c06df14','SUBMIT','2023-12-21 14:07:59','yama_can'),('e535d2ae-becd-42e8-8e24-b70cae2561a6','SUBMIT','2023-11-14 17:28:36','yama_can'),('e6dee3ea-dffb-480b-9f3f-48b031d4946d','SUBMIT','2023-12-21 12:01:55','yama_can'),('e74119e1-47b9-4b4b-8ef6-58328ae0c129','SUBMIT','2023-12-20 23:12:50','yama_can'),('e9010373-b750-495d-b200-963f9432da69','SUBMIT','2023-12-21 12:02:24','yama_can'),('e923f460-bb15-4968-96ea-eb66546cdb7c','SUBMIT','2023-12-20 23:20:28','yama_can'),('e97cc248-89f9-4b48-ac22-9e4f013611c9','SUBMIT','2023-12-20 23:16:26','yama_can'),('eb1b4e56-f97f-406a-bedf-b0fc9879d20c','SUBMIT','2023-12-20 23:17:13','yama_can'),('ec72dbb1-7cdb-49f3-a475-38bd980b9a0d','SUBMIT','2023-12-21 12:01:35','yama_can'),('eca2b9c5-4eac-4470-9f83-7bc1e7886b0b','LOGIN','2023-12-21 11:18:23',NULL),('edde333a-701d-4e29-8848-00bdb7602eb0','SUBMIT','2023-12-20 23:12:08','yama_can'),('eeabf0a9-e8da-4d49-9128-6d8b424737dc','SUBMIT','2023-12-21 12:00:52','yama_can'),('f3b0a073-e7a7-436c-9642-f117c03cdfe7','SUBMIT','2023-12-20 23:15:38','yama_can'),('f5ad76c9-216b-4495-9997-6b029b659def','SUBMIT','2023-12-20 23:15:57','yama_can');
/*!40000 ALTER TABLE `ct_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` char(36) NOT NULL,
  `sourceCode` text,
  `contest` varchar(20) DEFAULT NULL,
  `task` varchar(40) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `judge` text,
  `language` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES ('00c79899-836c-42ba-93f3-fcaafeeae467','# include <bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << \"Hello?world!\" << endl;    \r\n}','aac001','test_a','yama_can','2023-12-21 12:31:21','{\"status\":3,\"message\":\"\"}','cpp23'),('aceb22fb-084c-43e4-ad0c-ca7f4b437680','# include <bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    string str;\r\n    cin >> str;\r\n    cout << str << endl;\r\n}','aac001','test_a','yama_can','2023-12-20 20:38:40','[[0,400],[[0,200],[0,200]],[[[0,100],[0,100]],[[0,100],[0,100]]]]','cpp23'),('d5882090-7a70-4771-9e7f-bcc6365873e3','# include <bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << \"Hello?world!\" << endl;\r\n}','aac001','test_a','yama_can','2023-12-21 12:31:59','[[1,200],[[1,0],[0,200]],[[[0,100],[1,0]],[[0,100],[0,100]]]]','cpp23'),('f8814087-e927-4bf3-a244-f2c04596224b','# include <bits/stdc++.h>\r\nusing namespace std;\r\nint main()\r\n{\r\n    string str;\r\n    cin >> str;\r\n    cout << str << endl;\r\n}','aac001','test_a','yama_can','2023-12-20 20:53:50','[[1,200],[[1,0],[0,200]],[[[0,100],[1,0]],[[0,100],[0,100]]]]','cpp23');
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` varchar(40) NOT NULL,
  `question` text,
  `judge_type` bigint DEFAULT NULL,
  `editor` text,
  `tester` text,
  `name` text,
  `score` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('test_a','## 問題\n東郷平八郎くんは暇になったので、以下のような数列を考えることにしました。\n$$A_1=x$$\n$$A_2=y$$\n$$A_i=A_{i-2}+A_{i-1} (3\\leq i)$$\nこれから、整数$$x,y,N$$が与えられます。この数列のN番目を$$998244353$$で割った余りを出力してください。\n## 制約\n$$1\\leq x,y,N\\leq 10^{18}$$',0,'[\"yama_can\"]','[\"yama_can\"]','Ex. Heihachiro',100);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` char(36) NOT NULL,
  `ct` char(36) DEFAULT NULL,
  `user` char(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES ('001080db-29d1-45f8-92df-19acec306c6d','b56d2128-b1b0-4a6e-bb4d-b04508d0cc0d','yama_can1','2023-12-21 11:19:02'),('18f545c5-2c59-4fe4-acf4-742ea55800a9','5a8d8492-ac34-43c3-85c6-269be25f176b','yama_can','2023-12-21 12:14:01'),('4e32c507-5b34-473f-9c9a-91fb5bf0b4d5','0883a306-8a3c-449a-9a16-b09aa9a72a6f','yama_can1','2023-12-21 12:13:50'),('55bc082d-4ca6-47b2-8e6e-16c925ce6dea','cd90bf0e-1dcb-4dd9-bb6a-79db2baef631','yama_can1','2023-12-21 10:54:48'),('7e296b17-4909-4180-ada5-853036b24a2a','0f80372a-15d3-4eea-8759-713ab1ce7232','yama_can','2023-12-20 19:36:01'),('99a8486b-b6e0-4c35-9563-f45c0f17f6d8','5baaed45-9c7b-4b15-90a4-31e23c7b7dcd','yama_can','2023-12-21 11:16:12'),('b7018dbf-463a-454c-940f-6c3d67730890','2d8e7295-0838-4950-a925-158d174321dc','yama_can','2023-12-21 12:14:24'),('bc9901ea-666c-4c13-833d-a5d56ad52114','95158c6d-61df-4a71-8e5e-907f80b2f3bd','yama_can','2023-12-21 11:20:10'),('d41a5bae-0e7b-4293-b28e-946a4310cc2e','2062cb31-d19b-485f-93cd-bd4087ea3e76','yama_can1','2023-12-21 12:14:16'),('ee8443ec-3713-4f0b-994e-23d53e810ec0','641511cf-3cd1-484a-8b69-e1328b8ba6d8','aaaaaaaaaa','2023-12-20 19:26:30');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(20) NOT NULL,
  `password` text,
  `rating` bigint DEFAULT NULL,
  `name` text,
  `grade` bigint DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('yama_can','c9a583c9103ff9c0cb106d8e5a975d1231a1d67f3ab74129181c894d7b4e5aa8',3200,'[\"中山\", \"幹太\"]',130,1),('yama_can1','c9a583c9103ff9c0cb106d8e5a975d1231a1d67f3ab74129181c894d7b4e5aa8',0,'[\"中山\",\"幹太\"]',130,0);
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

-- Dump completed on 2023-12-21 16:21:35
