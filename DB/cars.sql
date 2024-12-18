-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 06:14 AM
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
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `car_id` int(11) NOT NULL,
  `car_image` varchar(255) DEFAULT NULL,
  `car_name` varchar(37) DEFAULT NULL,
  `price_per_day` varchar(20) DEFAULT NULL,
  `brand` varchar(11) DEFAULT NULL,
  `model` varchar(28) DEFAULT NULL,
  `car_logo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`car_id`, `car_image`, `car_name`, `price_per_day`, `brand`, `model`, `car_logo`) VALUES
(1, '../Images/image_2.png', 'Ferrari 488 Spider', 'USD 2499 $', 'Ferrari', '488 Spider', '../Images/ferrari.png'),
(2, '../Images/image_3.png', 'Ferrari F8 Spider', 'USD 3499 $', 'Ferrari', 'F8 Spider', '../Images/ferrari.png'),
(3, '../Images/image_4.png', 'Ferrari 488 Spider', 'USD 2499 $', 'Ferrari', '488 Spider', '../Images/ferrari.png'),
(4, '../Images/image_5.png', 'Ferrari Portofino', 'USD 2499 $', 'Ferrari', 'Portofino', '../Images/ferrari.png'),
(5, '../Images/image_6.png', 'Ferrari SF90', 'USD 7000 $', 'Ferrari', 'SF90', '../Images/ferrari.png'),
(6, '../Images/image_7.png', 'Ferrari Roma', 'USD 3799 $', 'Ferrari', 'Roma', '../Images/ferrari.png'),
(7, '../Images/image_8.png', 'Ferrari Purosangue', 'USD 9999 $', 'Ferrari', 'Purosangue', '../Images/ferrari.png'),
(8, '../Images/image_9.png', 'Ferrari SF90', 'USD 7000 $', 'Ferrari', 'SF90', '../Images/ferrari.png'),
(9, '../Images/image_10.png', 'Lamborghini Urus Mansory', 'USD 3999 $', 'Lamborghini', 'Urus Mansory', '../Images/Lamborghini.png'),
(10, '../Images/image_11.png', 'Lamborghini Urus Verde Citrea', 'USD 3099 $', 'Lamborghini', 'Urus Verde Citrea', '../Images/Lamborghini.png'),
(11, '../Images/image_12.png', 'Lamborghini Urus', 'USD 3099 $', 'Lamborghini', 'Urus', '../Images/Lamborghini.png'),
(12, '../Images/image_13.png', 'Lamborghini Huracan Evo Spider', 'USD 2999 $', 'Lamborghini', 'Huracan Evo Spider', '../Images/Lamborghini.png'),
(13, '../Images/image_14.png', 'Lamborghini Evo Spider', 'USD 2999 $', 'Lamborghini', 'Evo Spider', '../Images/Lamborghini.png'),
(14, '../Images/image_15.png', 'Lamborghini Urus Pearl Capsule', 'USD 2999 $', 'Lamborghini', 'Urus Pearl Capsule', '../Images/Lamborghini.png'),
(15, '../Images/image_16.png', 'Lamborghini Huracan STO', 'USD 4500 $', 'Lamborghini', 'Huracan STO', '../Images/Lamborghini.png'),
(16, '../Images/image_17.png', 'Lamborghini Aventador', 'USD 6500 $', 'Lamborghini', 'Aventador', '../Images/Lamborghini.png'),
(17, '../Images/image_18.png', 'Lamborghini Evo Coupe', 'USD 2999 $', 'Lamborghini', 'Evo Coupe', '../Images/Lamborghini.png'),
(18, '../Images/image_19.png', 'Lamborghini Evo Coupe', 'USD 2999 $', 'Lamborghini', 'Evo Coupe', '../Images/Lamborghini.png'),
(19, '../Images/image_20.png', 'Rolls Royce Cullinan', 'USD 3599 $', 'Rolls Royce', 'Cullinan', '../Images/Rolls.png'),
(20, '../Images/image_21.png', 'Rolls Royce Ghost', 'USD 3899 $', 'Rolls Royce', 'Ghost', '../Images/Rolls.png'),
(21, '../Images/image_22.png', 'Rolls Royce Cullinan 2023', 'USD 3899 $', 'Rolls Royce', 'Cullinan 2023', '../Images/Rolls.png'),
(22, '../Images/image_23.png', 'Rolls Royce Dawn', 'USD 3499 $', 'Rolls Royce', 'Dawn', '../Images/Rolls.png'),
(23, '../Images/image_24.png', 'Rolls Royce Dawn', 'USD 3800 $', 'Rolls Royce', 'Dawn', '../Images/Rolls.png'),
(24, '../Images/image_25.png', 'Rolls Royce Ghost', 'USD 3899 $', 'Rolls Royce', 'Ghost', '../Images/Rolls.png'),
(25, '../Images/image_26.png', 'Rolls Royce Wraith', 'USD 4000 $', 'Rolls Royce', 'Wraith', '../Images/Rolls.png'),
(26, '../Images/image_27.png', 'Rolls Royce Cullinan', 'USD 4500 $', 'Rolls Royce', 'Cullinan', '../Images/Rolls.png'),
(27, '../Images/image_28.png', 'Range Rover Vogue', 'USD 1799 $', 'Range Rover', 'Vogue', '../Images/Range.png'),
(28, '../Images/image_29.png', 'Range Rover Sport First Edition', 'USD 1399 $', 'Range Rover', 'Sport First Edition', '../Images/Range.png'),
(29, '../Images/image_30.png', 'Land Rover Defender Kahn Edition', 'USD 1099 $', 'Land Rover', 'Defender Kahn Edition', '../Images/Land.png'),
(30, '../Images/image_31.png', 'Range Rover Vogue', 'USD 1499 $', 'Range Rover', 'Vogue', '../Images/Range.png'),
(31, '../Images/image_32.png', 'Land Rover Defender 2024', 'USD 1099 $', 'Land Rover', 'Defender 2024', '../Images/Land.png'),
(32, '../Images/image_33.png', 'Range Rover Velar', 'USD 649 $', 'Range Rover', 'Velar', '../Images/Range.png'),
(33, '../Images/image_34.png', 'Range Rover SVR', 'USD 999 $', 'Range Rover', 'SVR', '../Images/Range.png'),
(34, '../Images/image_35.png', 'Range Rover Evoque', 'USD 499 $', 'Range Rover', 'Evoque', '../Images/Range.png'),
(35, '../Images/image_36.png', 'Range Rover Sport - Matt', 'USD 799 $', 'Range Rover', 'Sport - Matt', '../Images/Range.png'),
(36, '../Images/image_37.png', 'Range Rover Vogue', 'USD 1699 $', 'Range Rover', 'Vogue', '../Images/Range.png'),
(37, '../Images/image_38.png', 'Range Rover Velar', 'USD 749 $', 'Range Rover', 'Velar', '../Images/Range.png'),
(38, '../Images/image_39.png', 'Range Rover Sport', 'USD 799 $', 'Range Rover', 'Sport', '../Images/Range.png'),
(39, '../Images/image_40.png', 'Range Rover Velar', 'USD 749 $', 'Range Rover', 'Velar', '../Images/Range.png'),
(40, '../Images/image_41.png', 'Range Rover Svr', 'USD 999 $', 'Range Rover', 'Svr', '../Images/Range.png'),
(41, '../Images/image_42.png', 'Land Rover Discovery Sport', 'USD 450 $', 'Land Rover', 'Discovery Sport', '../Images/Land.png'),
(42, '../Images/image_43.png', 'Range Rover Sport', 'USD 799 $', 'Range Rover', 'Sport', '../Images/Range.png'),
(43, '../Images/image_44.png', 'Porsche 911 Carrera 4 GTS', 'USD 1699 $', 'Porsche', '911 Carrera 4 GTS', '../Images/Porsche.png'),
(44, '../Images/image_45.png', 'Porsche Boxster 718 GTS', 'USD 900 $', 'Porsche', 'Boxster 718 GTS', '../Images/Porsche.png'),
(45, '../Images/image_46.png', 'Porsche 911 GT3', 'USD 3700 $', 'Porsche', '911 GT3', '../Images/Porsche.png'),
(46, '../Images/image_47.png', 'Bentley Bentayga V8', 'USD 2099 $', 'Bentley', 'Bentayga V8', '../Images/Bentley.png'),
(47, '../Images/image_48.png', 'Bentley Bentayga S', 'USD 2099 $', 'Bentley', 'Bentayga S', '../Images/Bentley.png'),
(48, '../Images/image_49.png', 'Bentley Continental GTC', 'USD 3800 $', 'Bentley', 'Continental GTC', '../Images/Bentley.png'),
(49, '../Images/image_50.png', 'Bentley Flying Spur', 'USD 3500 $', 'Bentley', 'Flying Spur', '../Images/Bentley.png'),
(50, '../Images/image_51.png', 'Bentley Gt V12', 'USD 3000 $', 'Bentley', 'Gt V12', '../Images/Bentley.png'),
(51, '../Images/image_52.png', 'Bentley Bentayga V8', 'USD 2099 $', 'Bentley', 'Bentayga V8', '../Images/Bentley.png'),
(52, '../Images/image_53.png', 'Bentley Bentayga S', 'USD 2099 $', 'Bentley', 'Bentayga S', '../Images/Bentley.png'),
(53, '../Images/image_54.png', 'Bentley Continental GTC', 'USD 3800 $', 'Bentley', 'Continental GTC', '../Images/Bentley.png'),
(54, '../Images/image_55.png', 'Bentley Flying Spur', 'USD 3500 $', 'Bentley', 'Flying Spur', '../Images/Bentley.png'),
(55, '../Images/image_56.png', 'Bentley Gt V12', 'USD 3000 $', 'Bentley', 'Gt V12', '../Images/Bentley.png'),
(56, '../Images/image_57.png', 'Mercedes G63 Maybach Rims', 'USD 1699 $', 'Mercedes', 'G63 Maybach Rims', '../Images/Mercedes.png'),
(57, '../Images/image_58.png', 'Mercedes AMG G63 Matt Edition', 'USD 1699 $', 'Mercedes', 'AMG G63 Matt Edition', '../Images/Mercedes.png'),
(58, '../Images/image_59.png', 'Mercedes AMG G63 Magno Hero Edition', 'USD 1699 $', 'Mercedes', 'AMG G63 Magno Hero Edition', '../Images/Mercedes.png'),
(59, '../Images/image_60.png', 'Mercedes GLS 600 Maybach', 'USD 2399 $', 'Mercedes', 'GLS 600 Maybach', '../Images/Mercedes.png'),
(60, '../Images/image_61.png', 'Mercedes S500', 'USD 1199 $', 'Mercedes', 'S500', '../Images/Mercedes.png'),
(61, '../Images/image_62.png', 'Mercedes E200', 'USD 599 $', 'Mercedes', 'E200', '../Images/Mercedes.png'),
(62, '../Images/image_63.png', 'Mercedes AMG GTR', 'USD 2300 $', 'Mercedes', 'AMG GTR', '../Images/Mercedes.png'),
(63, '../Images/image_64.png', 'MERCEDES C200', 'USD 499 $', 'MERCEDES', 'C200', '../Images/Mercedes.png'),
(64, '../Images/image_65.png', 'Mercedes E350', 'USD 499 $', 'Mercedes', 'E350', '../Images/Mercedes.png'),
(65, '../Images/image_66.png', 'Mercedes AMG G63 55 Edition', 'USD 1699 $', 'Mercedes', 'AMG G63 55 Edition', '../Images/Mercedes.png'),
(66, '../Images/image_67.png', 'Mercedes CLA 250', 'USD 500 $', 'Mercedes', 'CLA 250', '../Images/Mercedes.png'),
(67, '../Images/image_68.png', 'Mercedes AMG G63 Black Edition', 'USD 1600 $', 'Mercedes', 'AMG G63 Black Edition', '../Images/Mercedes.png'),
(68, '../Images/image_69.png', 'Mercedes C300', 'USD 349 $', 'Mercedes', 'C300', '../Images/Mercedes.png'),
(69, '../Images/image_70.png', 'Mercedes AMG C43', 'USD 600 $', 'Mercedes', 'AMG C43', '../Images/Mercedes.png'),
(70, '../Images/image_71.png', 'Mercedes E350 With 53 Body Kit', 'USD 499 $', 'Mercedes', 'E350 With 53 Body Kit', '../Images/Mercedes.png'),
(71, '../Images/image_72.png', 'Mercedes G63 (4×4)', 'USD 3800 $', 'Mercedes', 'G63 (4×4)', '../Images/Mercedes.png'),
(72, '../Images/image_73.png', 'Mercedes G63 AMG', 'USD 1699 $', 'Mercedes', 'G63 AMG', '../Images/Mercedes.png'),
(73, '../Images/image_74.png', 'Mercedes Brabus', 'USD 4000 $', 'Mercedes', 'Brabus', '../Images/Mercedes.png'),
(74, '../Images/image_75.png', 'Mercedes C200', 'USD 550 $', 'Mercedes', 'C200', '../Images/Mercedes.png'),
(75, '../Images/image_76.png', 'Mercedes AMG G63 Double Night Package', 'USD 1699 $', 'Mercedes', 'AMG G63 Double Night Package', '../Images/Mercedes.png'),
(76, '../Images/image_77.png', 'Mercedes A220', 'USD 400 $', 'Mercedes', 'A220', '../Images/Mercedes.png'),
(77, '../Images/image_78.png', 'Mercedes C300 Coupe', 'USD 400 $', 'Mercedes', 'C300 Coupe', '../Images/Mercedes.png'),
(78, '../Images/image_79.png', 'Cadillac Escalade Black Edition', 'USD 1099 $', 'Cadillac', 'Escalade Black Edition', '../Images/Cadillac.png'),
(79, '../Images/image_80.png', 'Cadillac Escalade', 'USD 999 $', 'Cadillac', 'Escalade', '../Images/Cadillac.png'),
(80, '../Images/image_81.png', 'Cadillac Escalade', 'USD 1199 $', 'Cadillac', 'Escalade', '../Images/Cadillac.png'),
(81, '../Images/image_82.png', 'Cadillac Escalade', 'USD 599 $', 'Cadillac', 'Escalade', '../Images/Cadillac.png'),
(82, '../Images/image_83.png', 'Cadillac Escalade', 'USD 1599 $', 'Cadillac', 'Escalade', '../Images/Cadillac.png'),
(85, 'https://agricool.co/carsimgm/hyundai-verna-sedan-1.jpg', 'Hyundai Verna', 'USD 5 $', 'Tonaya', 'Verna', '../Images/tonaya4.png'),
(86, 'https://www.contactcars.com/_next/image?url=https%3A%2F%2Fcontactcars.fra1.cdn.digitaloceanspaces.com%2Fcontactcars-production%2FImages%2FSmall%2FUsedCars%2Fb9034ae1-fd78-4e58-9a9b-3910c2756308.jpeg&w=3840&q=75', 'Tonaya Suzuki', 'USD 10 $', 'Tonaya', 'Suzuki', '../Images/tonaya4.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
