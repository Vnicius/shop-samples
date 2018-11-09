-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Nov-2018 às 05:03
-- Versão do servidor: 10.1.35-MariaDB
-- versão do PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tecdb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categories`
--

CREATE TABLE `categories` (
  `catid` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `categories`
--

INSERT INTO `categories` (`catid`, `name`) VALUES
(3, 'Livros');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `pid` int(11) NOT NULL,
  `catid` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `url` varchar(2083) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`pid`, `catid`, `name`, `price`, `description`, `url`) VALUES
(5, 3, 'Chapeuzinho Vermelho', '40', 'Chapeuzinho morre', ' http://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_cfcb2857dbc2c1163e9e1ef597944962fe8951ea.jpg'),
(6, 3, 'Julio Verne', '40', 'Julio corre', ' http://1.bp.blogspot.com/_wAZqS-1CHLc/TVFBMjKfBxI/AAAAAAAADWk/aw1ryRgNGLY/s1600/bal%25C3%25A3o.jpg'),
(7, 3, 'Peppa Pig', '40', 'Viram Bacon', ' https://www.casasbahia-imagens.com.br/livros/LiteraturaInfantojuvenil/LivrosparaRecreacao/3759570/77323002/Livro-Peppa-Pig-Peppa-Pig-na-Maior-Poca-de-Lama-do-Mundo-3759570.jpg'),
(8, 3, 'Guerra dos Tronos', '40', 'Geral Morre', ' https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9054556&qld=90&l=430&a=-1'),
(9, 3, 'Percy Jackson', '80', 'Ele nada', ' https://images-na.ssl-images-amazon.com/images/I/51bmcaOTUaL._SX337_BO1,204,203,200_.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `uid` int(2) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`uid`, `login`, `password`) VALUES
(12, 'Meireles', '$2b$10$YQ0.xcPkP1qLAE8Xu.z5bu1hDqT4k9n6KEsaGPRoit1yOfZSzQW6W');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`catid`),
  ADD UNIQUE KEY `catid_UNIQUE` (`catid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `pid_UNIQUE` (`pid`),
  ADD KEY `products_ibfk_1` (`catid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `catid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`catid`) REFERENCES `categories` (`catid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
