// CREATE TABLE `house` (
//   `id` int unsigned NOT NULL AUTO_INCREMENT,
//   `gmt_create` datetime DEFAULT NULL,
//   `gmt_modify` datetime DEFAULT NULL,
//   `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//   `datetime` datetime DEFAULT NULL,
//   `total_size` double DEFAULT NULL,
//   `width` double DEFAULT NULL,
//   `height` double DEFAULT NULL,
//   `location` double DEFAULT NULL,
//   `price` double DEFAULT NULL,
//   `privacy` double DEFAULT NULL,
//   `house_type` double DEFAULT NULL,
//   `parking` double DEFAULT NULL,
//   `comment` text COLLATE utf8mb4_unicode_ci,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

export interface House {
  id?: number;
  gmt_create?: string;
  gmt_modify?: string;
  name?: string;
  datetime?: string;
  total_size?: number;
  width?: number;
  height?: number;
  location?: number;
  price?: number;
  privacy?: number;
  house_type?: number;
  parking?: number;
  comment?: string;
  total?: number;
}
