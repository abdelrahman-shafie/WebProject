-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 06:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `national_ID` varchar(20) DEFAULT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`, `phone_number`, `age`, `national_ID`, `role`) VALUES
(1, 'ahmed', 'hamed', 'ahmed hamed', 'ahmeddhamed179@gmail.com', '759a4bdf691fccb804bab4f3f9958019', '01029279089', 22, '22011938', 'customer'),
(3, 'ahmed', 'yasser', 'ahmed yasser', 'Mselaraby2000@gmail.com', '12c388d2139c184033b00b5eef97b88a', '01029279089', 33, '22011936', 'customer'),
(4, 'bido', 'ihab', 'bido ihab', 'bbido@example.com', 'b885f71fea796c74cce8a3b34e6c7880', '010101010101', 27, '20202021', 'admin'),
(6, 'ahmed', 'hamed', 'ahmed hamed', 'bido@examplee.com', '25d55ad283aa400af464c76d713c07ad', '984098947', 22, '3426428972984', 'customer'),
(7, 'Abdelrahman', 'Ihab', 'Abdelrahman Ihab', 'b@ex.com', '5f4dcc3b5aa765d61d8327deb882cf99', '01015901301', 20, '2206183', 'customer'),
(12, 'test', 'testen', 'test testen', 'bb@example.com', '25d55ad283aa400af464c76d713c07ad', '01015901444', 33, '22061444', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `national_ID` (`national_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
