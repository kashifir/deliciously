-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema btsbase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema btsbase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `btsbase` DEFAULT CHARACTER SET latin1;
USE `btsbase`;

-- -----------------------------------------------------
-- Table `btsbase`.`infoclien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`infoclien`
(
    `CODECLIENT`    INT(4)        NOT NULL AUTO_INCREMENT,
    `NOMCLIENT`     TEXT          NULL DEFAULT NULL,
    `PRENOMCLIENT`  TEXT          NULL DEFAULT NULL,
    `DATENASCLIENT` DATE          NULL DEFAULT NULL,
    `TELEPHONE`     TEXT          NULL DEFAULT NULL,
    `MAIL`          TEXT          NULL DEFAULT NULL,
    `ADRESSE`       TEXT          NULL DEFAULT NULL,
    `CODEPOSTAL`    DECIMAL(5, 0) NULL DEFAULT NULL,
    `VILLE`         TEXT          NULL DEFAULT NULL,
    `DATEADD`       TIMESTAMP     NULL DEFAULT NULL,
    PRIMARY KEY (`CODECLIENT`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 4
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`abonnements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`abonnements`
(
    `CODEABONN`   INT(4) NOT NULL AUTO_INCREMENT,
    `CODECLIENT`  INT(4) NOT NULL,
    `DATEDUDEBUT` DATE   NULL DEFAULT NULL,
    `DATEDUFIN`   DATE   NULL DEFAULT NULL,
    PRIMARY KEY (`CODEABONN`),
    INDEX `FK_ABONNE` (`CODECLIENT` ASC) ,
    CONSTRAINT `FK_ABONNE`
        FOREIGN KEY (`CODECLIENT`)
            REFERENCES `btsbase`.`infoclien` (`CODECLIENT`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`pieces_detachees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`pieces_detachees`
(
    `CODEPIECES`  INT(4)        NOT NULL AUTO_INCREMENT,
    `NOMPIECES`   TEXT          NULL DEFAULT NULL,
    `STOCKPIECES` DECIMAL(5, 0) NULL DEFAULT NULL,
    `prix`        FLOAT         NOT NULL,
    PRIMARY KEY (`CODEPIECES`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`categories`
(
    `CODECATE`     INT(4)    NOT NULL AUTO_INCREMENT,
    `NOMCATE`      TEXT      NULL DEFAULT NULL,
    `DATE_AJOUTER` TIMESTAMP NULL DEFAULT NULL,
    `DATE_UPDATE`  TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`CODECATE`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`fournisseur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`fournisseur`
(
    `CODE_FOUR`       INT(4)        NOT NULL AUTO_INCREMENT,
    `NOM_FOUR`        TEXT          NULL DEFAULT NULL,
    `ADRESSE_FOUR`    TEXT          NULL DEFAULT NULL,
    `TEL_FOUR`        TEXT          NULL DEFAULT NULL,
    `MAIL_FOUR`       TEXT          NULL DEFAULT NULL,
    `CODEPOSTAL_FOUR` DECIMAL(5, 0) NULL DEFAULT NULL,
    `VILLE_FOUR`      TEXT          NULL DEFAULT NULL,
    PRIMARY KEY (`CODE_FOUR`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`articles`
(
    `CODEARTICILE` INT(4)        NOT NULL AUTO_INCREMENT,
    `CODECATE`     INT(4)        NOT NULL,
    `CODE_FOUR`    INT(4)        NOT NULL,
    `LIBELLE`      TEXT          NULL DEFAULT NULL,
    `PRIX`         FLOAT(6, 2)   NULL DEFAULT NULL,
    `STOCK`        DECIMAL(5, 0) NULL DEFAULT NULL,
    `DATEADD`      TIMESTAMP     NULL DEFAULT NULL,
    `DATEUPDATE`   TIMESTAMP     NULL DEFAULT NULL,
    `DESCRITPION`  TEXT          NULL DEFAULT NULL,
    PRIMARY KEY (`CODEARTICILE`),
    INDEX `FK_AJOUTER` (`CODE_FOUR` ASC) ,
    INDEX `FK_APPARTIEN` (`CODECATE` ASC) ,
    CONSTRAINT `FK_APPARTIEN`
        FOREIGN KEY (`CODECATE`)
            REFERENCES `btsbase`.`categories` (`CODECATE`),
    CONSTRAINT `FK_AJOUTER`
        FOREIGN KEY (`CODE_FOUR`)
            REFERENCES `btsbase`.`fournisseur` (`CODE_FOUR`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 2
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`appartient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`appartient`
(
    `CODEARTICILE` INT(4) NOT NULL,
    `CODEPIECES`   INT(4) NOT NULL,
    PRIMARY KEY (`CODEARTICILE`, `CODEPIECES`),
    INDEX `FK_APPARTIENT2` (`CODEPIECES` ASC) ,
    CONSTRAINT `FK_APPARTIENT2`
        FOREIGN KEY (`CODEPIECES`)
            REFERENCES `btsbase`.`pieces_detachees` (`CODEPIECES`),
    CONSTRAINT `FK_APPARTIENT`
        FOREIGN KEY (`CODEARTICILE`)
            REFERENCES `btsbase`.`articles` (`CODEARTICILE`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`commande`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`commande`
(
    `CODECMD` INT(4)     NOT NULL AUTO_INCREMENT,
    `DATACMD` TIMESTAMP  NULL DEFAULT NULL,
    `SLODE`   TINYINT(1) NULL DEFAULT NULL,
    PRIMARY KEY (`CODECMD`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`etat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`etat`
(
    `CODEETAT` INT(4) NOT NULL AUTO_INCREMENT,
    `NOMETAT`  TEXT   NULL DEFAULT NULL,
    PRIMARY KEY (`CODEETAT`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`factures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`factures`
(
    `NUMFAC`  INT(4) NOT NULL AUTO_INCREMENT,
    `DATEFAC` DATE   NULL DEFAULT NULL,
    PRIMARY KEY (`NUMFAC`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`paiement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`paiement`
(
    `ID_PAIEMENT`   INT(4) NOT NULL AUTO_INCREMENT,
    `CODECMD`       INT(4) NOT NULL,
    `TYPE_PAIEMENT` TEXT   NULL DEFAULT NULL,
    PRIMARY KEY (`ID_PAIEMENT`),
    INDEX `FK_ASSOCIATION_14` (`CODECMD` ASC) ,
    CONSTRAINT `FK_ASSOCIATION_14`
        FOREIGN KEY (`CODECMD`)
            REFERENCES `btsbase`.`commande` (`CODECMD`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`face`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`face`
(
    `ID_PAIEMENT` INT(4) NOT NULL,
    `NUMFAC`      INT(4) NOT NULL,
    PRIMARY KEY (`ID_PAIEMENT`, `NUMFAC`),
    INDEX `FK_FACE2` (`NUMFAC` ASC) ,
    CONSTRAINT `FK_FACE2`
        FOREIGN KEY (`NUMFAC`)
            REFERENCES `btsbase`.`factures` (`NUMFAC`),
    CONSTRAINT `FK_FACE`
        FOREIGN KEY (`ID_PAIEMENT`)
            REFERENCES `btsbase`.`paiement` (`ID_PAIEMENT`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`image`
(
    `codeimg`     INT(11)     NOT NULL AUTO_INCREMENT,
    `nomimg`      VARCHAR(50) NOT NULL,
    `codearticle` INT(11)     NOT NULL,
    PRIMARY KEY (`codeimg`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`lignes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`lignes`
(
    `CODELIGNE`    INT(4)        NOT NULL AUTO_INCREMENT,
    `CODEARTICILE` INT(4)        NOT NULL,
    `CODECMD`      INT(4)        NOT NULL,
    `LIBPROD`      TEXT          NULL DEFAULT NULL,
    `QTE`          DECIMAL(5, 0) NULL DEFAULT NULL,
    `PRIX_U`       FLOAT(6, 2)   NULL DEFAULT NULL,
    PRIMARY KEY (`CODELIGNE`),
    INDEX `FK_COMPOSEE` (`CODECMD` ASC) ,
    INDEX `FK_CONCERNER` (`CODEARTICILE` ASC) ,
    CONSTRAINT `FK_CONCERNER`
        FOREIGN KEY (`CODEARTICILE`)
            REFERENCES `btsbase`.`articles` (`CODEARTICILE`),
    CONSTRAINT `FK_COMPOSEE`
        FOREIGN KEY (`CODECMD`)
            REFERENCES `btsbase`.`commande` (`CODECMD`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`livrasion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`livrasion`
(
    `ID` INT(4) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`ID`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`livetat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`livetat`
(
    `ID`         INT(4) NOT NULL,
    `CODEETAT`   INT(4) NOT NULL,
    `DATA_ETATT` DATE   NULL DEFAULT NULL,
    PRIMARY KEY (`ID`, `CODEETAT`),
    INDEX `FK_ASSOCIATION_13` (`CODEETAT` ASC) ,
    CONSTRAINT `FK_ASSOCIATION_13`
        FOREIGN KEY (`CODEETAT`)
            REFERENCES `btsbase`.`etat` (`CODEETAT`),
    CONSTRAINT `FK_ASSOCIATION_12`
        FOREIGN KEY (`ID`)
            REFERENCES `btsbase`.`livrasion` (`ID`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`livracmd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`livracmd`
(
    `CODECMD` INT(4) NOT NULL,
    `ID`      INT(4) NOT NULL,
    PRIMARY KEY (`CODECMD`, `ID`),
    INDEX `FK_ASSOCIATION_16` (`ID` ASC) ,
    CONSTRAINT `FK_ASSOCIATION_16`
        FOREIGN KEY (`ID`)
            REFERENCES `btsbase`.`livrasion` (`ID`),
    CONSTRAINT `FK_ASSOCIATION_15`
        FOREIGN KEY (`CODECMD`)
            REFERENCES `btsbase`.`commande` (`CODECMD`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `btsbase`.`passe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `btsbase`.`passe`
(
    `CODECMD`    INT(4) NOT NULL,
    `CODECLIENT` INT(4) NOT NULL,
    PRIMARY KEY (`CODECMD`, `CODECLIENT`),
    INDEX `FK_PASSE2` (`CODECLIENT` ASC) ,
    CONSTRAINT `FK_PASSE2`
        FOREIGN KEY (`CODECLIENT`)
            REFERENCES `btsbase`.`infoclien` (`CODECLIENT`),
    CONSTRAINT `FK_PASSE`
        FOREIGN KEY (`CODECMD`)
            REFERENCES `btsbase`.`commande` (`CODECMD`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = latin1;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
