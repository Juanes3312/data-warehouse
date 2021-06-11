-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2021 at 08:07 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int(11) NOT NULL,
  `pais_id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ciudades`
--

INSERT INTO `ciudades` (`id`, `pais_id`, `nombre`) VALUES
(1, 1, 'Buenos Aires'),
(2, 1, 'Cordoba'),
(3, 2, 'Medellin'),
(4, 2, 'Bogota'),
(5, 5, 'Lima'),
(6, 5, 'Cuzco'),
(7, 1, 'Rosario'),
(8, 2, 'Cali');

-- --------------------------------------------------------

--
-- Table structure for table `companias`
--

CREATE TABLE `companias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `pais` int(11) NOT NULL,
  `direccion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companias`
--

INSERT INTO `companias` (`id`, `nombre`, `pais`, `direccion`) VALUES
(2, 'globant', 1, 'carrera mejor'),
(3, 'rappi', 2, 'cacorros'),
(4, 'softtek', 6, 'Carrera xd'),
(6, 'pintuco', 2, 'premium Plaza'),
(7, 'mercado libre', 2, 'Carrera 777');

-- --------------------------------------------------------

--
-- Table structure for table `contactos`
--

CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  `id_compania` int(11) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  `interes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `email`, `id_ciudad`, `id_compania`, `cargo`, `interes`) VALUES
(1, 'Juan Esteban', 'juanes@jaramill.com', 3, 2, 'developer', 75),
(2, 'andres', 'andres@moro.com', 5, 3, 'diseñador', 25),
(3, 'alejandro', 'alejandro@noseuqe.com', 4, 4, 'cantante', 50),
(5, 'jeronimo', 'jeronimo@skulls.com', 4, 6, 'ingeniero nanotecnologo', 50),
(6, 'Maria Jose', 'mariajose@espisnosa.com', 2, 2, 'Nutricionista', 100),
(7, 'samuel', 'samuel@g.com', 2, 7, 'ingeniero de sistemas', 75);

-- --------------------------------------------------------

--
-- Table structure for table `paises`
--

CREATE TABLE `paises` (
  `id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paises`
--

INSERT INTO `paises` (`id`, `region_id`, `nombre`) VALUES
(1, 1, 'Argentina'),
(2, 1, 'Colombia'),
(4, 2, 'Estados unidos'),
(5, 1, 'Peru'),
(6, 2, 'Mexico');

-- --------------------------------------------------------

--
-- Table structure for table `regiones`
--

CREATE TABLE `regiones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `regiones`
--

INSERT INTO `regiones` (`id`, `nombre`) VALUES
(1, 'Sudamerica'),
(2, 'Norteamerica');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `password` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `direccion`, `password`, `admin`) VALUES
(1, 'Juanes', 'Jaramillo', 'juanes@jaramillo.com', 'carrera 66', 0, 1),
(4, 'prueba', 'prueba', 'prueba@gmail.com', 'carrera xd', 1, 1),
(8, '1', '1', '1', '1', 11, 0),
(9, 'Sara', 'Rodriguez Ramos', 'sara@rodriguez.com', 'carrera 40b', 1234, 0),
(10, 'felipe', 'Betancur', 'beta7@Hotmail.com', 'carrera 11', 1, 1),
(11, '2', '2', '2', '2', 2, 0),
(15, '2', '2', '3', '2', 2, 0),
(16, 'Paula', 'Ramos', 'paula.gmail.com', 'carrera12', 1234, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pais_id` (`pais_id`);

--
-- Indexes for table `companias`
--
ALTER TABLE `companias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `id_compania` (`id_compania`);

--
-- Indexes for table `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indexes for table `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `companias`
--
ALTER TABLE `companias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `paises`
--
ALTER TABLE `paises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `paises` (`id`);

--
-- Constraints for table `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`),
  ADD CONSTRAINT `contactos_ibfk_2` FOREIGN KEY (`id_compania`) REFERENCES `companias` (`id`);

--
-- Constraints for table `paises`
--
ALTER TABLE `paises`
  ADD CONSTRAINT `paises_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regiones` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
