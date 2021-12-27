/*
    Base de données et tables crées, puis exportés avec phpmyadmin
*/

CREATE DATABASE IF NOT EXISTS `evento` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `evento`;

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `auteur` text NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table contenant les commentaires pour les évènements';

CREATE TABLE `evenements` (
  `id` int(11) NOT NULL,
  `nom` text NOT NULL,
  `date` datetime NOT NULL,
  `description` text NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table ou sont stockées, les évènements crées';

ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eventcomment` (`id_evenement`);

ALTER TABLE `evenements`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `evenements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_eventcomment` FOREIGN KEY (`id_evenement`) REFERENCES `evenements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;