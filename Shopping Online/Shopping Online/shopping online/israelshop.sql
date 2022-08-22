-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 31 août 2021 à 22:30
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `israelshop`
--

-- --------------------------------------------------------

--
-- Structure de la table `cartarticles`
--

CREATE TABLE `cartarticles` (
  `id` int(11) NOT NULL,
  `creationdate` datetime NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cartarticles`
--

INSERT INTO `cartarticles` (`id`, `creationdate`, `quantity`, `totalPrice`, `product_id`, `cart_id`) VALUES
(21, '2021-08-29 03:20:17', 29, '58.00', 1, 22),
(35, '2021-08-29 04:39:13', 6, '12.30', 3, 22),
(36, '2021-08-29 04:56:20', 3, '32.97', 4, 22),
(37, '2021-08-30 12:20:54', 3, '137.67', 6, 22),
(38, '2021-08-31 12:42:06', 4, '8.00', 1, 23),
(40, '2021-08-31 18:33:13', 7, '14.35', 3, 23),
(41, '2021-08-31 18:33:45', 3, '32.97', 4, 23),
(43, '2021-08-31 18:35:04', 8, '16.00', 1, 24),
(44, '2021-08-31 18:35:24', 19, '38.95', 3, 24),
(47, '2021-08-31 21:48:24', 1, '2.30', 1, 29),
(48, '2021-08-31 21:48:39', 3, '32.97', 4, 29),
(49, '2021-08-31 21:52:06', 4, '9.20', 1, 30),
(50, '2021-08-31 23:02:57', 3, '6.90', 1, 28),
(52, '2021-08-31 23:20:22', 3, '6.15', 3, 28),
(53, '2021-08-31 23:20:25', 5, '249.50', 5, 28);

-- --------------------------------------------------------

--
-- Structure de la table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `creationdate` datetime NOT NULL,
  `userId` varchar(120) NOT NULL,
  `isClose` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `carts`
--

INSERT INTO `carts` (`id`, `creationdate`, `userId`, `isClose`) VALUES
(22, '2021-08-29 03:19:47', 'test', 1),
(23, '2021-08-31 12:03:40', 'test', 1),
(24, '2021-08-31 18:34:38', 'test', 1),
(25, '2021-08-31 20:37:28', 'test2', 0),
(26, '2021-08-31 20:48:56', 'test4', 0),
(27, '2021-08-31 20:53:50', 'eytan', 0),
(28, '2021-08-31 21:26:10', 'test', 1),
(29, '2021-08-31 21:45:04', 'yohan', 1),
(30, '2021-08-31 21:51:56', 'yohan', 0),
(31, '2021-08-31 23:21:12', 'test', 0);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Milk & Eggs'),
(2, 'Vegetables & Fruits'),
(3, 'Meat & Fish'),
(4, 'Wine & Drink');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `clienId` varchar(120) NOT NULL,
  `cartId` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `deliveryCity` varchar(120) NOT NULL,
  `street` varchar(120) NOT NULL,
  `deliveryDate` datetime NOT NULL,
  `creationDate` datetime NOT NULL,
  `creditCard` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `clienId`, `cartId`, `totalPrice`, `deliveryCity`, `street`, `deliveryDate`, `creationDate`, `creditCard`) VALUES
(16, 'test', 22, '207.87', 'TelAviv', 'gdgdg', '2021-09-02 03:00:00', '2021-08-31 11:55:30', 'gdgdgd'),
(17, 'test', 23, '58.50', 'TelAviv', 'nnnnnn', '2021-09-11 03:00:00', '2021-08-31 18:34:18', '222222'),
(18, 'test', 24, '57.35', 'RishonLeZion', '144', '2021-09-11 03:00:00', '2021-08-31 21:25:44', '1234'),
(19, 'yohan', 29, '35.27', 'Ashdod', '111313', '2021-09-11 03:00:00', '2021-08-31 21:51:10', '123456'),
(20, 'test', 28, '262.55', 'TelAviv', '14227', '2021-09-11 03:00:00', '2021-08-31 23:20:50', '444444444');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `img`, `category_id`) VALUES
(1, 'Tomato', '2.30', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/721px-Tomato_je.jpg', 2),
(3, 'Milk', '2.05', 'https://cdn0.woolworths.media/content/wowproductimages/large/710014.jpg', 1),
(4, 'Eggs', '10.99', 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg', 1),
(5, 'Meat', '49.90', 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg', 3),
(6, 'Fish', '45.89', 'https://sciexaminer.com/wp-content/uploads/2020/01/Fish-Products-990x576.jpg', 3),
(7, 'Wine', '29.99', 'https://i.guim.co.uk/img/media/f1609fdbaa24c27e170a6ce4a832e583c2e7cc51/0_0_2560_1536/master/2560.jpg?width=620&quality=85&auto=format&fit=max&s=60062d520efe38dd4b8c7593b568da37', 4);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(250) NOT NULL,
  `city` varchar(120) NOT NULL,
  `street` varchar(120) NOT NULL,
  `role` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `city`, `street`, `role`) VALUES
('admin', 'admin', 'admin', 'admin@gmail.com', '123456', 'Jerusalem', '5 nahal mata', 1),
('test', 'test', 'testLastName', 'test@test.com', '123456', 'RishonLeZion', 'rue du test', 0),
('yohan', 'Yohan', 'Aouizerate', 'yohan@a.com', '123456', 'Jerusalem', '14422 street', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cartarticles`
--
ALTER TABLE `cartarticles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Index pour la table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cartarticles`
--
ALTER TABLE `cartarticles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cartarticles`
--
ALTER TABLE `cartarticles`
  ADD CONSTRAINT `cartarticles_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cartarticles_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
