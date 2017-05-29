/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50554
Source Host           : localhost:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 50554
File Encoding         : 65001

Date: 2017-05-25 21:46:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book_item`
-- ----------------------------
DROP TABLE IF EXISTS `book_item`;
CREATE TABLE `book_item` (
  `bi_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_id` varchar(30) NOT NULL,
  `coding` varchar(30) NOT NULL,
  `borrow` bit(1) NOT NULL,
  PRIMARY KEY (`bi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_item
-- ----------------------------
INSERT INTO `book_item` VALUES ('1', 'AVwhaIJoXBajqZo3Ep_M', '0100200000001', '');
INSERT INTO `book_item` VALUES ('2', 'AVwju6xqXBajqZo3Ep_S', '0100200000002', '');
INSERT INTO `book_item` VALUES ('3', 'AVwkNNfpXBajqZo3Ep_U', '0100200000003', '');
INSERT INTO `book_item` VALUES ('4', 'AVwkNWH8XBajqZo3Ep_V', '0100200000004', '');
INSERT INTO `book_item` VALUES ('5', 'AVwkNYb_XBajqZo3Ep_W', '0100200000005', '');
INSERT INTO `book_item` VALUES ('6', 'AVwkyoY3XBajqZo3Ep_a', '0100200000006', '');
INSERT INTO `book_item` VALUES ('7', 'AVwky1y7XBajqZo3Ep_b', '0100200000007', '');
INSERT INTO `book_item` VALUES ('8', 'AVwlHMoYXBajqZo3Ep_e', '0100200000008', '');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(25) NOT NULL,
  `s_id` int(11) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `s_id` FOREIGN KEY (`s_id`) REFERENCES `stack` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '编程语言', '1');
INSERT INTO `category` VALUES ('2', '网站架构', '1');

-- ----------------------------
-- Table structure for `lend_book`
-- ----------------------------
DROP TABLE IF EXISTS `lend_book`;
CREATE TABLE `lend_book` (
  `lb_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `bi_id` int(11) NOT NULL,
  `status` char(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lb_id`),
  KEY `lb_u` (`u_id`),
  KEY `lb_bi` (`bi_id`),
  CONSTRAINT `lb_bi` FOREIGN KEY (`bi_id`) REFERENCES `book_item` (`bi_id`),
  CONSTRAINT `lb_u` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lend_book
-- ----------------------------

-- ----------------------------
-- Table structure for `pre_book`
-- ----------------------------
DROP TABLE IF EXISTS `pre_book`;
CREATE TABLE `pre_book` (
  `pre_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `b_id` varchar(50) NOT NULL,
  PRIMARY KEY (`pre_id`),
  KEY `pre_u_id` (`u_id`),
  CONSTRAINT `pre_u_id` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pre_book
-- ----------------------------

-- ----------------------------
-- Table structure for `record`
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `r_value` varchar(30) NOT NULL,
  PRIMARY KEY (`r_id`),
  KEY `r_u_id` (`u_id`),
  CONSTRAINT `r_u_id` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------

-- ----------------------------
-- Table structure for `serial_num`
-- ----------------------------
DROP TABLE IF EXISTS `serial_num`;
CREATE TABLE `serial_num` (
  `sn_id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  PRIMARY KEY (`sn_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`c_id`) REFERENCES `category` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of serial_num
-- ----------------------------
INSERT INTO `serial_num` VALUES ('1', '1', '1');
INSERT INTO `serial_num` VALUES ('2', '9', '2');

-- ----------------------------
-- Table structure for `stack`
-- ----------------------------
DROP TABLE IF EXISTS `stack`;
CREATE TABLE `stack` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stack
-- ----------------------------
INSERT INTO `stack` VALUES ('1', '通信与计算机书库');
INSERT INTO `stack` VALUES ('2', '文艺书库');
INSERT INTO `stack` VALUES ('3', '社会科学书库');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` char(11) DEFAULT NULL,
  `wx_id` varchar(30) DEFAULT NULL,
  `open_id` varchar(30) NOT NULL,
  `identity` varchar(25) DEFAULT NULL,
  `canbor` bit(1) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
