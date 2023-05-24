CREATE TABLE `user` (
  `user_id` varchar(16) primary key,
  `name` varchar(100),
  `email` varchar(128) unique,
  `password` varchar(256),
  `role` enum('user', 'admin') DEFAULT 'user',
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `plant` (
  `plant_id` varchar(16) primary key,
  `name` varchar(50),
  `desc` text
);

CREATE TABLE `disease` (
  `disease_id` varchar(16) primary key,
  `name` varchar(100),
  `desc` text,
  `solution` text null
);

CREATE TABLE `prediction` (
  `prediction_id` varchar(16) primary key,
  `user_id` varchar(255),
  `plant_id` varchar(255),
  `disease_id` varchar(255),
  `img_url` varchar(256),
  `accuration` float(10),
  `created_at` datetime,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`plant_id`) REFERENCES `plant` (`plant_id`),
  FOREIGN KEY (`disease_id`) REFERENCES `disease` (`disease_id`)
);

CREATE TABLE `store` (
  `store_id` varchar(16) primary key,
  `name` varchar(100),
  `address` text null,
  `contact` varchar(13),
  `onlineshop` varchar(256),
  `created_at` datetime,
  `updated_at` datetime
);
