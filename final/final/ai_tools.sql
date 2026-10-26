-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-01-11 09:50:42
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ai_tools`
--

-- --------------------------------------------------------

--
-- 資料表結構 `recommendations`
--

CREATE TABLE `recommendations` (
  `id` int(11) NOT NULL,
  `tool_name` varchar(255) DEFAULT NULL,
  `tool_description` text DEFAULT NULL,
  `tool_category` varchar(255) DEFAULT NULL,
  `tool_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `recommendations`
--

INSERT INTO `recommendations` (`id`, `tool_name`, `tool_description`, `tool_category`, `tool_url`) VALUES
(3, 'Clockwise', '這是一個智能日曆工具，可以幫助您優化您的時間安排。', '產品開發工具', 'https://www.getclockwise.com/'),
(4, 'Jasper', '這是一個AI驅動的內容生成工具，可以幫助您快速產生優質的文本內容。', '內容創作工具', 'https://www.jasper.ai/');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
