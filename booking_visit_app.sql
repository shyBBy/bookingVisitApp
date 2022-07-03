-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2022 at 05:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
  `createdAt` datetime DEFAULT NULL,
  `bookingDate` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedToStaffId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedToPlaceId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdByUserId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `describe` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userPhoneNumber` int(9) DEFAULT NULL,
  `userName` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userSurname` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userEmail` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeName` varchar(90) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `createdAt`, `bookingDate`, `status`, `assignedToStaffId`, `assignedToPlaceId`, `updatedAt`, `createdByUserId`, `describe`, `userPhoneNumber`, `userName`, `userSurname`, `userEmail`, `placeName`) VALUES
('69637cc8-1e81-451a-a5ac-a169ddba6282', '2022-07-02 12:39:00', '2022-07-25', 'active', '4d5b48c7-2612-4aa2-87ae-058cd4af22ca', '12a55db3-64a1-11ec-a96f-d8cb8ae59a7b', '2022-07-02 12:39:00', 'daa83026-e0aa-4331-8b64-8c7eee353004', 'Dupa mnie boli', 777666555, 'Dawid', 'Super', 'edekkredek1910@gmail.com', 'Szpital MSWiA'),
('e0fd5598-2430-481c-82fb-ff64fa8d228c', '2022-07-02 12:38:00', '2022-07-28', 'pending', '4d5b48c7-2612-4aa2-87ae-058cd4af22ca', '12a55db3-64a1-11ec-a96f-d8cb8ae59a7b', '2022-07-02 12:38:00', 'daa83026-e0aa-4331-8b64-8c7eee353004', 'Bardzo boli mnie głowa', 565785443, 'Dawid', 'Super', 'edekkredek1910@gmail.com', 'Szpital MSWiA');

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
('fDtDaDeQXoGBUkgYU1SG36R4ehJMyse_', 1656948050, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"successLogin\":[\"Success Login, welcome!\"]},\"user\":{\"id\":\"daa83026-e0aa-4331-8b64-8c7eee353004\",\"role\":\"staff\",\"isActive\":\"true\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `placeId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `staffName` varchar(72) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staffSurname` varchar(72) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staffEmail` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `staffPhoneNumber` int(9) DEFAULT 0,
  `staffPhoto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `assignedToPlaceName` varchar(90) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `userId`, `placeId`, `staffName`, `staffSurname`, `staffEmail`, `staffPhoneNumber`, `staffPhoto`, `assignedToPlaceName`, `title`) VALUES
(3, '4d5b48c7-2612-4aa2-87ae-058cd4af22ca', '12a55db3-64a1-11ec-a96f-d8cb8ae59a7b', 'Super', 'Super', 'super@super.com', 456456456, 'brak', 'Szpital MSWiA', 'Cardiologists'),
(4, '77f093d5-b43a-4521-99d7-a567d8cd2d86', '12a55db3-64a1-11ec-a96f-d8cb8ae59a7b', 'Bezpieczny', 'User', '31dadsc@dat.com', 233233233, '', 'Szpital MSWiA', 'Geriatricians'),
(5, 'a5e9573e-128b-435a-92ec-8ecef392deeb', '06b35d35-64a1-11ec-a96f-d8cb8ae59a7b', 'Klaudia', '321', 'goo38907@boofx.com', 454345345, '', 'Medeor Szpital Wielospecjalistyczny w Łodzi', 'Renal physicians');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `last_login` varchar(70) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `activation_code` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `role`, `password`, `registered`, `last_login`, `active`, `activation_code`) VALUES
('4d5b48c7-2612-4aa2-87ae-058cd4af22ca', 'Super', 'Super', 'super@super.com', 'staff', '$2b$10$1WVtsOUeGd4hNsDhnipameCcdF5QhRS9GNtrlBKqxZej4P3TQMNWi', '2022-01-08', '2022-01-08', 'true', NULL),
('6efed7e4-1613-4b8e-bdda-66ed505b5482', 'Ewa', 'Kowalski', 'twarozek955@gmail.com', 'staff', '$2b$10$3naVlBzUmKyMmJMKzb6BfeJ8p1fUg7PzWwXPfHSQAYgXqpRZahy8K', '2022/2/1', '2022/2/1  21:8', 'true', '5452635e87541f47f8abca380449eb130f36bc660a33174063'),
('77f093d5-b43a-4521-99d7-a567d8cd2d86', 'Bezpieczny', 'User', '31dadsc@dat.com', 'staff', '$2b$10$Jv7jEjfRyx6chDl.d.Bxe.cMwr1LNVLHIJh0Hg/GNNxIwlYawI5Bi', '2022-01-02', '2022-01-02', 'true', NULL),
('9f5dddb9-0a97-4810-998e-5fa56467b884', 'Jackowski', 'Jacek', 'gcc22525@cuoly.com', 'admin', '$2b$10$0xRry9JbtWFqvYXnu/8TM.kcpkTbQxnV7aos8PJgU0DIVViTasRaS', '2022-01-02', '2022/1/29  22:11', 'true', '53565b0482cf405cd8e5e7dec38c595d8480'),
('a5e9573e-128b-435a-92ec-8ecef392deeb', 'Klaudia', '321', 'goo38907@boofx.com', 'user', '$2b$10$wTPOcDYJElwlEmuC0szKkuv4D.tis9T2hmygshp4DxJB.S0578v/6', '2022/2/1', '2022/2/1  21:20', 'true', '296d3166f977f311367c782db2c12ab7670510f98a55ad7bb0'),
('daa83026-e0aa-4331-8b64-8c7eee353004', 'Dawid', 'Super', 'edekkredek1910@gmail.com', 'staff', '$2b$10$JEAFyntSvtBSsv.nayLw2OCH4zyHthoFJ1w0WpqZ8HNecM.blCcHq', '2022/1/28', '2022/7/3  17:3', 'true', '2ab2e338442ac706e61f7cd552341ac6a6cf8b65aeab436b05');

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
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `FK_admins_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
