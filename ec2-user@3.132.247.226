-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `run`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `run` ;

CREATE TABLE IF NOT EXISTS `run` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `duration` DECIMAL NULL,
  `distance` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS eventuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'eventuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `run`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (1, '1999-08-22', 25.7, 3);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (2, '1999-08-23', 28.1, 3.2);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (3, '1999-08-24', 31.0, 3.5);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (4, '1999-08-25', 29.2, 3.1);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (5, '1999-08-27', 28.0, 2.9);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (6, '1999-08-28', 29.3, 3.1);
INSERT INTO `run` (`id`, `date`, `duration`, `distance`) VALUES (7, '1999-08-30', 29.6, 3.5);

COMMIT;

