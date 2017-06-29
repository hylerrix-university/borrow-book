/*
Navicat MySQL Data Transfer

Source Server         : mylinux
Source Server Version : 50173
Source Host           : corefuture.cn:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-06-29 16:15:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `admin_password` varchar(20) CHARACTER SET utf8 NOT NULL,
  `p_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `ad_p_id` (`p_id`),
  CONSTRAINT `ad_p_id` FOREIGN KEY (`p_id`) REFERENCES `power` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('6', 'icorvoh@gmail.com', '123456', '1');
INSERT INTO `admin` VALUES ('8', 'icorvoh@qq.com', '123456', '1');

-- ----------------------------
-- Table structure for `book_cart`
-- ----------------------------
DROP TABLE IF EXISTS `book_cart`;
CREATE TABLE `book_cart` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `bi_id` int(11) NOT NULL,
  `nowdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hour` int(11) NOT NULL,
  PRIMARY KEY (`shop_id`),
  KEY `sh_u_id` (`u_id`) USING BTREE,
  KEY `sh_bi_id` (`bi_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of book_cart
-- ----------------------------
INSERT INTO `book_cart` VALUES ('88', '11', '12', '2017-06-29 16:07:32', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_item
-- ----------------------------
INSERT INTO `book_item` VALUES ('9', 'AVxT2uyroMlguXEb9gQ3', '0100100000001', '');
INSERT INTO `book_item` VALUES ('10', 'AVxnYSiLoMlguXEb9gQ9', '0100100000002', '');
INSERT INTO `book_item` VALUES ('11', 'AVxoTcTXoMlguXEb9gQ_', '0100100000003', '');
INSERT INTO `book_item` VALUES ('12', 'AVxoaoAWoMlguXEb9gRB', '0100100000004', '');
INSERT INTO `book_item` VALUES ('13', 'AVzZEDK1oMlguXEb9gRD', '0100100000005', '');
INSERT INTO `book_item` VALUES ('14', 'AVzukCBnoMlguXEb9gRF', '0200300000000', '');
INSERT INTO `book_item` VALUES ('16', 'AVzukCBnoMlguXEb9gRF', '0100300000001', '');
INSERT INTO `book_item` VALUES ('18', 'AVzyljC9oMlguXEb9gRK', '0200300000004', '');
INSERT INTO `book_item` VALUES ('21', 'AVzysohToMlguXEb9gRN', '0200300000006', '');
INSERT INTO `book_item` VALUES ('22', 'AVzyxLVUoMlguXEb9gRQ', '0100100000007', '');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(20) NOT NULL,
  `s_id` int(11) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `c_s_id` (`s_id`),
  CONSTRAINT `c_s_id` FOREIGN KEY (`s_id`) REFERENCES `stack` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '编程语言', '1');
INSERT INTO `category` VALUES ('2', '网站架构', '1');
INSERT INTO `category` VALUES ('3', '青年艺术', '2');
INSERT INTO `category` VALUES ('6', '计算机系统', '1');
INSERT INTO `category` VALUES ('11', '程序算法', '1');
INSERT INTO `category` VALUES ('14', '微机原理', '1');
INSERT INTO `category` VALUES ('15', '古代艺术', '2');

-- ----------------------------
-- Table structure for `collection`
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `collect_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `b_id` varchar(50) NOT NULL,
  PRIMARY KEY (`collect_id`),
  KEY `collect_u_id` (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=240 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('239', '11', 'AVzukCBnoMlguXEb9gRF');
INSERT INTO `collection` VALUES ('238', '11', 'AVxnYSiLoMlguXEb9gQ9');
INSERT INTO `collection` VALUES ('236', '11', 'AVxoaoAWoMlguXEb9gRB');
INSERT INTO `collection` VALUES ('222', '11', 'AVzZEDK1oMlguXEb9gRD');
INSERT INTO `collection` VALUES ('237', '11', 'AVxoTcTXoMlguXEb9gQ_');

-- ----------------------------
-- Table structure for `find_record`
-- ----------------------------
DROP TABLE IF EXISTS `find_record`;
CREATE TABLE `find_record` (
  `f_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `value` varchar(50) CHARACTER SET utf8 NOT NULL,
  `way` int(11) NOT NULL,
  PRIMARY KEY (`f_id`),
  KEY `u_id` (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=376 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of find_record
-- ----------------------------

-- ----------------------------
-- Table structure for `lend_item`
-- ----------------------------
DROP TABLE IF EXISTS `lend_item`;
CREATE TABLE `lend_item` (
  `li_id` int(11) NOT NULL AUTO_INCREMENT,
  `bi_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `lr_id` int(11) NOT NULL,
  PRIMARY KEY (`li_id`),
  KEY `li_lr_id` (`lr_id`),
  KEY `br_u_id` (`u_id`),
  KEY `lr_bi_id` (`bi_id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lend_item
-- ----------------------------
INSERT INTO `lend_item` VALUES ('50', '14', '11', '44');
INSERT INTO `lend_item` VALUES ('51', '14', '11', '45');
INSERT INTO `lend_item` VALUES ('52', '14', '11', '46');
INSERT INTO `lend_item` VALUES ('53', '14', '11', '47');
INSERT INTO `lend_item` VALUES ('54', '12', '11', '48');

-- ----------------------------
-- Table structure for `lend_record`
-- ----------------------------
DROP TABLE IF EXISTS `lend_record`;
CREATE TABLE `lend_record` (
  `lr_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` char(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uId` int(11) NOT NULL,
  PRIMARY KEY (`lr_id`),
  KEY `lr_u_id` (`uId`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lend_record
-- ----------------------------
INSERT INTO `lend_record` VALUES ('45', '2', '2017-06-29 00:00:00', '11');
INSERT INTO `lend_record` VALUES ('48', '0', '2017-06-29 00:00:00', '11');
INSERT INTO `lend_record` VALUES ('47', '2', '2017-06-29 00:00:00', '11');

-- ----------------------------
-- Table structure for `new_book`
-- ----------------------------
DROP TABLE IF EXISTS `new_book`;
CREATE TABLE `new_book` (
  `n_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` bigint(20) NOT NULL,
  PRIMARY KEY (`n_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of new_book
-- ----------------------------
INSERT INTO `new_book` VALUES ('1', '9787559603340');
INSERT INTO `new_book` VALUES ('2', '9787559603340');

-- ----------------------------
-- Table structure for `power`
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of power
-- ----------------------------
INSERT INTO `power` VALUES ('1', '总管理员', '1');
INSERT INTO `power` VALUES ('2', '书库管理员', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pre_book
-- ----------------------------
INSERT INTO `pre_book` VALUES ('77', '11', 'AVzukCBnoMlguXEb9gRF');

-- ----------------------------
-- Table structure for `record`
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `isbn` bigint(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`r_id`),
  KEY `r_u_id` (`u_id`),
  CONSTRAINT `r_u_id` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('9', '1', '5', '9787121227615', '2017-06-02 14:24:20');
INSERT INTO `record` VALUES ('10', '1', '1', '9787111488422', '2017-06-02 14:26:00');
INSERT INTO `record` VALUES ('11', '2', '5', '9787121227615', '2017-06-02 17:58:38');
INSERT INTO `record` VALUES ('12', '2', '1', '9787111213826', '2017-06-02 18:55:08');
INSERT INTO `record` VALUES ('13', '11', '357', '9787111213826', '2017-06-29 16:07:30');
INSERT INTO `record` VALUES ('14', '11', '105', '9787121227615', '2017-06-28 15:54:12');
INSERT INTO `record` VALUES ('15', '11', '18', '9787115325686', '2017-06-25 15:18:04');
INSERT INTO `record` VALUES ('16', '11', '7', '9787111488422', '2017-06-24 15:07:14');
INSERT INTO `record` VALUES ('17', '11', '63', '9787115130228', '2017-06-29 15:58:41');
INSERT INTO `record` VALUES ('18', '12', '7', '9787115130228', '2017-06-25 12:07:47');
INSERT INTO `record` VALUES ('19', '12', '16', '9787111213826', '2017-06-25 17:30:53');
INSERT INTO `record` VALUES ('20', '12', '4', '9787121227615', '2017-06-25 13:38:13');
INSERT INTO `record` VALUES ('21', '12', '1', '9787115325686', '2017-06-25 12:06:47');
INSERT INTO `record` VALUES ('22', '12', '2', '9787111488422', '2017-06-29 14:26:18');
INSERT INTO `record` VALUES ('23', '13', '1', '9787115130228', '2017-06-25 19:41:22');
INSERT INTO `record` VALUES ('24', '11', '9', '9787559603340', '2017-06-29 00:23:56');
INSERT INTO `record` VALUES ('25', '12', '1', '9787559603340', '2017-06-29 16:02:56');

-- ----------------------------
-- Table structure for `serial_num`
-- ----------------------------
DROP TABLE IF EXISTS `serial_num`;
CREATE TABLE `serial_num` (
  `sn_id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  PRIMARY KEY (`sn_id`),
  KEY `sn_ca_id` (`c_id`),
  CONSTRAINT `sn_ca_id` FOREIGN KEY (`c_id`) REFERENCES `category` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of serial_num
-- ----------------------------
INSERT INTO `serial_num` VALUES ('1', '16', '1');
INSERT INTO `serial_num` VALUES ('2', '9', '2');
INSERT INTO `serial_num` VALUES ('3', '8', '3');
INSERT INTO `serial_num` VALUES ('12', '0', '14');
INSERT INTO `serial_num` VALUES ('13', '0', '15');

-- ----------------------------
-- Table structure for `stack`
-- ----------------------------
DROP TABLE IF EXISTS `stack`;
CREATE TABLE `stack` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(20) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stack
-- ----------------------------
INSERT INTO `stack` VALUES ('1', '通信与计算机书库');
INSERT INTO `stack` VALUES ('2', '文艺书库');

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
  `password` varchar(65) NOT NULL,
  `recommend` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '18829489477', '1226864411', 'fafsga', 'afasdas', '', '12', null);
INSERT INTO `user` VALUES ('2', '14545', 'ssf', '43678', '45343', '', '12', null);
INSERT INTO `user` VALUES ('3', 'gsd', 'gsdg', 'gsdg', 'gsd', '', '12', null);
INSERT INTO `user` VALUES ('10', '18710829968', null, 'o6i1Zw-C7TgpXcHSvb8WIghOFgcU', '610321199608160030', '', '19960816', null);
INSERT INTO `user` VALUES ('11', '18829533255', null, 'o6i1Zw5-muiCRHcN5SodUZ2YiwZ0', '610528199710090011', '', '123456', '0');
INSERT INTO `user` VALUES ('12', '18829489477', null, 'o6i1Zw6rKSsjdGO9f_L5oPL1TZdg', '330921199611153515', '', 'WHZ1226864411', null);
INSERT INTO `user` VALUES ('13', '13193371632', null, 'o6i1Zw2_9ddxnD1vq2ehLQKhfaqU', '610528199710090011', '', '123456', null);
