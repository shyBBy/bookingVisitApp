-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2022 at 09:19 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_visit_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `bookedAt` datetime NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `name`, `address`) VALUES
('06b35d35-64a1-11ec-a96f-d8cb8ae59a7b', 'Medeor Szpital Wielospecjalistyczny w Łodzi', 'Ciesielska 8, 91-308 Łódź'),
('12a55db3-64a1-11ec-a96f-d8cb8ae59a7b', 'Szpital MSWiA', 'Północna 42, 91-425 Łódź'),
('2031d1f6-64a1-11ec-a96f-d8cb8ae59a7b', 'Salve Przychodnia', 'Rzgowska 50A, 93-172 Łódź'),
('2944a567-64a1-11ec-a96f-d8cb8ae59a7b', 'Centrum Medyczne Remedium', 'Ul. Gen. Jarosława Dąbrowskiego 15B, 93-177 Łódź'),
('a44c8e7a-fe7b-4b55-a45a-fe081985ab85', 'test', '3232'),
('b0246b0b-d9e2-4e78-8acd-ef5cd24c69d6', 'Super szpital', 'Kochanowskiego 23'),
('b69cbc7e-c4fa-4588-a09d-4491bd7bb30f', 'Testowy szpital', 'Ulica.jana 2'),
('e343a9f5-64a0-11ec-a96f-d8cb8ae59a7b', 'Wojewódzki Specjalistyczny Szpital im. Mikołaja Pirogowa', 'Wólczańska 191/195, 90-001 Łódź'),
('e4810731-ca2c-4fdf-973f-b2c154cc3ae5', 'antekZmienNazwe', '231321dsa das dsad saasdd');

-- --------------------------------------------------------

--
-- Table structure for table `sessiontbl`
--

CREATE TABLE `sessiontbl` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessiontbl`
--

INSERT INTO `sessiontbl` (`session_id`, `expires`, `data`) VALUES
('lDpd5k_GgSgweyjFMRQzp6cKwKncaPKd', 1643228226, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"message\":{\"type\":\"danger\",\"intro\":\"Empty fields! \",\"message\":\"Please insert the requested information.\"},\"user\":{\"id\":\"9f5dddb9-0a97-4810-998e-5fa56467b884\",\"isAdmin\":1,\"isActive\":\"true\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specialization` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin` int(2) NOT NULL DEFAULT 0,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `last_login` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinytext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `admin`, `password`, `registered`, `last_login`, `active`) VALUES
('4d5b48c7-2612-4aa2-87ae-058cd4af22ca', 'Super', 'Super', 'super@super.com', 0, '$2b$10$1WVtsOUeGd4hNsDhnipameCcdF5QhRS9GNtrlBKqxZej4P3TQMNWi', '2022-01-08', '2022-01-08', 'true'),
('77f093d5-b43a-4521-99d7-a567d8cd2d86', 'Bezpieczny', 'User', '31dadsc@dat.com', 0, '$2b$10$Jv7jEjfRyx6chDl.d.Bxe.cMwr1LNVLHIJh0Hg/GNNxIwlYawI5Bi', '2022-01-02', '2022-01-02', 'true'),
('9f5dddb9-0a97-4810-998e-5fa56467b884', 'Jackowski', 'Jacek', 'gcc22525@cuoly.com', 1, '$2b$10$0xRry9JbtWFqvYXnu/8TM.kcpkTbQxnV7aos8PJgU0DIVViTasRaS', '2022-01-02', '2022/1/25  20:37', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `users_bookings`
--

CREATE TABLE `users_bookings` (
  `id` int(11) NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bookingId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_admins_users` (`userId`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bookings_users` (`userId`),
  ADD KEY `FK_bookings_places` (`placeId`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessiontbl`
--
ALTER TABLE `sessiontbl`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_staff_users` (`userId`),
  ADD KEY `FK_staff_places` (`placeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_bookings`
--
ALTER TABLE `users_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_users_bookings_users` (`userId`),
  ADD KEY `FK_users_bookings_bookings` (`bookingId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_bookings`
--
ALTER TABLE `users_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `FK_admins_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_bookings_places` FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bookings_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `FK_staff_places` FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_staff_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_bookings`
--
ALTER TABLE `users_bookings`
  ADD CONSTRAINT `FK_users_bookings_bookings` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_users_bookings_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
