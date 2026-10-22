
/* =========================================================
   WANDERLY - TRAVEL DESTINATION DATA
   File: js/data.js

   region:
   - north       : Miền Bắc
   - central     : Miền Trung
   - south       : Miền Nam
   - international: Quốc tế

   type:
   - beach   : Biển
   - mountain: Núi, thiên nhiên
   - culture : Văn hóa, lịch sử
   - city    : Thành phố

   price: Ngân sách tham khảo cho một người (VNĐ)
   image: Ảnh minh họa từ Unsplash
========================================================= */

const destinations = [
  // =======================================================
  // MIỀN BẮC
  // =======================================================

  {
    id: 1,
    name: "Vịnh Hạ Long",
    region: "north",
    type: "beach",
    location: "Quảng Ninh, Việt Nam",
    rating: 4.9,
    reviews: 2840,
    duration: "2 ngày 1 đêm",
    price: 1800000,
    tag: "Nổi bật",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá kỳ quan thiên nhiên với hàng nghìn đảo đá vôi, làn nước xanh và trải nghiệm du thuyền trên vịnh."
  },
  {
    id: 2,
    name: "Sa Pa",
    region: "north",
    type: "mountain",
    location: "Lào Cai, Việt Nam",
    rating: 4.8,
    reviews: 2150,
    duration: "3 ngày 2 đêm",
    price: 2200000,
    tag: "Săn mây",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    description: "Tận hưởng không khí vùng cao, ruộng bậc thang, bản làng dân tộc và những biển mây trên núi."
  },
  {
    id: 3,
    name: "Hà Nội",
    region: "north",
    type: "culture",
    location: "Hà Nội, Việt Nam",
    rating: 4.7,
    reviews: 1930,
    duration: "2 ngày 1 đêm",
    price: 1200000,
    tag: "Di sản",
    image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1000&q=85",
    description: "Dạo quanh phố cổ, thưởng thức ẩm thực đường phố và tìm hiểu những nét văn hóa lâu đời của thủ đô."
  },
  {
    id: 4,
    name: "Hà Giang",
    region: "north",
    type: "mountain",
    location: "Tuyên Quang, Việt Nam",
    rating: 4.9,
    reviews: 1760,
    duration: "4 ngày 3 đêm",
    price: 3200000,
    tag: "Phiêu lưu",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    description: "Chinh phục những cung đường đèo hùng vĩ, cao nguyên đá và các bản làng nằm giữa núi non."
  },
  {
    id: 5,
    name: "Ninh Bình",
    region: "north",
    type: "culture",
    location: "Ninh Bình, Việt Nam",
    rating: 4.8,
    reviews: 1670,
    duration: "2 ngày 1 đêm",
    price: 1500000,
    tag: "Thiên nhiên",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
    description: "Ngồi thuyền qua những dòng sông uốn lượn, khám phá núi đá vôi và quần thể danh thắng nổi tiếng."
  },
  {
    id: 6,
    name: "Mộc Châu",
    region: "north",
    type: "mountain",
    location: "Sơn La, Việt Nam",
    rating: 4.7,
    reviews: 980,
    duration: "2 ngày 1 đêm",
    price: 1600000,
    tag: "Nghỉ dưỡng",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85",
    description: "Tham quan đồi chè xanh, thung lũng hoa và những trang trại giữa cao nguyên mát mẻ."
  },
  {
    id: 7,
    name: "Cát Bà",
    region: "north",
    type: "beach",
    location: "Hải Phòng, Việt Nam",
    rating: 4.7,
    reviews: 1320,
    duration: "3 ngày 2 đêm",
    price: 2400000,
    tag: "Biển xanh",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description: "Tận hưởng bãi biển, chèo kayak, khám phá vịnh và thư giãn trong không gian đảo xanh."
  },
  {
    id: 8,
    name: "Tam Đảo",
    region: "north",
    type: "mountain",
    location: "Phú Thọ, Việt Nam",
    rating: 4.6,
    reviews: 870,
    duration: "2 ngày 1 đêm",
    price: 1300000,
    tag: "Cuối tuần",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    description: "Nghỉ dưỡng giữa núi rừng, săn sương sớm, ghé nhà thờ đá và thưởng thức món ăn địa phương."
  },
  {
    id: 9,
    name: "Cao Bằng",
    region: "north",
    type: "mountain",
    location: "Cao Bằng, Việt Nam",
    rating: 4.8,
    reviews: 790,
    duration: "3 ngày 2 đêm",
    price: 2500000,
    tag: "Khám phá",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá thác nước hùng vĩ, hồ xanh và cảnh quan núi rừng hoang sơ vùng Đông Bắc."
  },
  {
    id: 10,
    name: "Mù Cang Chải",
    region: "north",
    type: "mountain",
    location: "Lào Cai, Việt Nam",
    rating: 4.8,
    reviews: 920,
    duration: "3 ngày 2 đêm",
    price: 2300000,
    tag: "Ruộng bậc thang",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    description: "Ngắm ruộng bậc thang theo mùa, tìm hiểu văn hóa bản địa và chụp ảnh giữa núi rừng Tây Bắc."
  },

  // =======================================================
  // MIỀN TRUNG
  // =======================================================

  {
    id: 11,
    name: "Đà Nẵng",
    region: "central",
    type: "city",
    location: "Đà Nẵng, Việt Nam",
    rating: 4.8,
    reviews: 2310,
    duration: "3 ngày 2 đêm",
    price: 2500000,
    tag: "Được yêu thích",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=85",
    description: "Kết hợp nghỉ dưỡng biển, khám phá thành phố hiện đại, thưởng thức hải sản và tham quan các cây cầu nổi tiếng."
  },
  {
    id: 12,
    name: "Hội An",
    region: "central",
    type: "culture",
    location: "Đà Nẵng, Việt Nam",
    rating: 4.9,
    reviews: 1980,
    duration: "2 ngày 1 đêm",
    price: 1800000,
    tag: "Phố cổ",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=85",
    description: "Dạo phố cổ đèn lồng, khám phá kiến trúc truyền thống và thưởng thức những món ăn đặc trưng miền Trung."
  },
  {
    id: 13,
    name: "Huế",
    region: "central",
    type: "culture",
    location: "Huế, Việt Nam",
    rating: 4.7,
    reviews: 1230,
    duration: "2 ngày 1 đêm",
    price: 1600000,
    tag: "Cố đô",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=85",
    description: "Tham quan Đại Nội, lăng tẩm triều Nguyễn, nghe nhã nhạc cung đình và thưởng thức ẩm thực Huế."
  },
  {
    id: 14,
    name: "Nha Trang",
    region: "central",
    type: "beach",
    location: "Khánh Hòa, Việt Nam",
    rating: 4.8,
    reviews: 1870,
    duration: "3 ngày 2 đêm",
    price: 2800000,
    tag: "Biển đẹp",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description: "Tắm biển, trải nghiệm các hoạt động trên đảo và thưởng thức hải sản tại thành phố biển."
  },
  {
    id: 15,
    name: "Quy Nhơn",
    region: "central",
    type: "beach",
    location: "Gia Lai, Việt Nam",
    rating: 4.8,
    reviews: 1040,
    duration: "3 ngày 2 đêm",
    price: 2300000,
    tag: "Biển hoang sơ",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá những bãi biển trong xanh, cung đường ven biển và các làng chài bình yên."
  },
  {
    id: 16,
    name: "Phong Nha",
    region: "central",
    type: "mountain",
    location: "Quảng Trị, Việt Nam",
    rating: 4.8,
    reviews: 870,
    duration: "3 ngày 2 đêm",
    price: 2600000,
    tag: "Hang động",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá hệ thống hang động, sông ngầm và những cánh rừng thuộc vùng di sản thiên nhiên."
  },
  {
    id: 17,
    name: "Đà Lạt",
    region: "central",
    type: "mountain",
    location: "Lâm Đồng, Việt Nam",
    rating: 4.8,
    reviews: 2460,
    duration: "3 ngày 2 đêm",
    price: 2200000,
    tag: "Thành phố sương",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85",
    description: "Tận hưởng khí hậu mát mẻ, rừng thông, hồ nước, quán cà phê và những khu vườn đầy hoa."
  },
  {
    id: 18,
    name: "Buôn Ma Thuột",
    region: "central",
    type: "culture",
    location: "Đắk Lắk, Việt Nam",
    rating: 4.6,
    reviews: 680,
    duration: "2 ngày 1 đêm",
    price: 1700000,
    tag: "Cà phê",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=85",
    description: "Tìm hiểu văn hóa Tây Nguyên, ghé thăm những vườn cà phê và thưởng thức hương vị cà phê bản địa."
  },
  {
    id: 19,
    name: "Phú Yên",
    region: "central",
    type: "beach",
    location: "Đắk Lắk, Việt Nam",
    rating: 4.7,
    reviews: 810,
    duration: "3 ngày 2 đêm",
    price: 2100000,
    tag: "Bình yên",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=85",
    description: "Ngắm bình minh trên biển, ghé các ghềnh đá và khám phá làng chài ven bờ."
  },
  {
    id: 20,
    name: "Cù Lao Chàm",
    region: "central",
    type: "beach",
    location: "Đà Nẵng, Việt Nam",
    rating: 4.7,
    reviews: 750,
    duration: "2 ngày 1 đêm",
    price: 1900000,
    tag: "Đảo xanh",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description: "Trải nghiệm đảo xanh, lặn ngắm san hô và tìm hiểu đời sống của cư dân vùng biển."
  },

  // =======================================================
  // MIỀN NAM
  // =======================================================

  {
    id: 21,
    name: "TP. Hồ Chí Minh",
    region: "south",
    type: "city",
    location: "TP. Hồ Chí Minh, Việt Nam",
    rating: 4.7,
    reviews: 2450,
    duration: "2 ngày 1 đêm",
    price: 1600000,
    tag: "Năng động",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá nhịp sống sôi động, các công trình kiến trúc, chợ truyền thống và ẩm thực đường phố."
  },
  {
    id: 22,
    name: "Phú Quốc",
    region: "south",
    type: "beach",
    location: "An Giang, Việt Nam",
    rating: 4.9,
    reviews: 2760,
    duration: "4 ngày 3 đêm",
    price: 4200000,
    tag: "Nghỉ dưỡng",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
    description: "Nghỉ dưỡng bên bãi biển, khám phá các đảo nhỏ và thưởng thức hải sản tươi ngon."
  },
  {
    id: 23,
    name: "Cần Thơ",
    region: "south",
    type: "culture",
    location: "Cần Thơ, Việt Nam",
    rating: 4.6,
    reviews: 960,
    duration: "2 ngày 1 đêm",
    price: 1500000,
    tag: "Miền sông nước",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85",
    description: "Tham quan chợ nổi, trải nghiệm vườn trái cây và tìm hiểu đời sống sông nước miền Tây."
  },
  {
    id: 24,
    name: "Côn Đảo",
    region: "south",
    type: "beach",
    location: "TP. Hồ Chí Minh, Việt Nam",
    rating: 4.8,
    reviews: 730,
    duration: "3 ngày 2 đêm",
    price: 3500000,
    tag: "Yên bình",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
    description: "Tận hưởng thiên nhiên biển đảo, khám phá hệ sinh thái và tìm hiểu những di tích lịch sử."
  },
  {
    id: 25,
    name: "Mũi Né",
    region: "south",
    type: "beach",
    location: "Lâm Đồng, Việt Nam",
    rating: 4.7,
    reviews: 1120,
    duration: "3 ngày 2 đêm",
    price: 2400000,
    tag: "Đồi cát",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description: "Ngắm đồi cát, trải nghiệm thể thao biển và thưởng thức hải sản trong không khí nắng ấm."
  },
  {
    id: 26,
    name: "Châu Đốc",
    region: "south",
    type: "culture",
    location: "An Giang, Việt Nam",
    rating: 4.6,
    reviews: 610,
    duration: "2 ngày 1 đêm",
    price: 1400000,
    tag: "Văn hóa",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=85",
    description: "Tìm hiểu văn hóa vùng biên, ghé các điểm tâm linh và khám phá cảnh quan miền Tây."
  },
  {
    id: 27,
    name: "Bến Tre",
    region: "south",
    type: "culture",
    location: "Vĩnh Long, Việt Nam",
    rating: 4.6,
    reviews: 520,
    duration: "2 ngày 1 đêm",
    price: 1200000,
    tag: "Miệt vườn",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    description: "Đi thuyền trên sông, thăm vườn dừa và trải nghiệm các hoạt động dân dã miền sông nước."
  },
  {
    id: 28,
    name: "Vũng Tàu",
    region: "south",
    type: "beach",
    location: "TP. Hồ Chí Minh, Việt Nam",
    rating: 4.5,
    reviews: 1540,
    duration: "2 ngày 1 đêm",
    price: 1400000,
    tag: "Đi gần",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description: "Một chuyến nghỉ ngắn ngày với bãi biển, hải sản, cung đường ven biển và điểm ngắm hoàng hôn."
  },
  {
    id: 29,
    name: "Trà Vinh",
    region: "south",
    type: "culture",
    location: "Vĩnh Long, Việt Nam",
    rating: 4.5,
    reviews: 430,
    duration: "2 ngày 1 đêm",
    price: 1300000,
    tag: "Khám phá",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá nét văn hóa Khmer Nam Bộ, các ngôi chùa cổ và những khu vườn xanh mát."
  },
  {
    id: 30,
    name: "Hà Tiên",
    region: "south",
    type: "beach",
    location: "An Giang, Việt Nam",
    rating: 4.6,
    reviews: 570,
    duration: "2 ngày 1 đêm",
    price: 1600000,
    tag: "Biển đảo",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85",
    description: "Kết hợp tham quan cảnh quan ven biển, hang động và những địa điểm văn hóa địa phương."
  },

  // =======================================================
  // QUỐC TẾ
  // =======================================================

  {
    id: 31,
    name: "Tokyo",
    region: "international",
    type: "city",
    location: "Tokyo, Nhật Bản",
    rating: 4.9,
    reviews: 3100,
    duration: "5 ngày 4 đêm",
    price: 12500000,
    tag: "Hiện đại",
    image: "https://images.unsplash.com/photo-1540959733332-eab4de?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá thành phố hiện đại với những khu phố sầm uất, đền chùa truyền thống và ẩm thực Nhật Bản."
  },
  {
    id: 32,
    name: "Kyoto",
    region: "international",
    type: "culture",
    location: "Kyoto, Nhật Bản",
    rating: 4.9,
    reviews: 1890,
    duration: "4 ngày 3 đêm",
    price: 11800000,
    tag: "Truyền thống",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85",
    description: "Tham quan đền cổ, vườn Nhật, phố truyền thống và tìm hiểu văn hóa lâu đời của cố đô."
  },
  {
    id: 33,
    name: "Seoul",
    region: "international",
    type: "city",
    location: "Seoul, Hàn Quốc",
    rating: 4.8,
    reviews: 2340,
    duration: "4 ngày 3 đêm",
    price: 10500000,
    tag: "Thời thượng",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1000&q=85",
    description: "Kết hợp mua sắm, khám phá văn hóa K-pop, cung điện cổ và các khu ẩm thực nổi tiếng."
  },
  {
    id: 34,
    name: "Bangkok",
    region: "international",
    type: "city",
    location: "Bangkok, Thái Lan",
    rating: 4.7,
    reviews: 1960,
    duration: "4 ngày 3 đêm",
    price: 7800000,
    tag: "Ẩm thực",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá các ngôi chùa, chợ đêm, trung tâm mua sắm và nền ẩm thực đường phố đặc sắc."
  },
  {
    id: 35,
    name: "Singapore",
    region: "international",
    type: "city",
    location: "Singapore",
    rating: 4.8,
    reviews: 2150,
    duration: "4 ngày 3 đêm",
    price: 13500000,
    tag: "Thành phố xanh",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=85",
    description: "Chiêm ngưỡng kiến trúc hiện đại, công viên xanh, khu vườn bên vịnh và nền ẩm thực đa dạng."
  },
  {
    id: 36,
    name: "Bali",
    region: "international",
    type: "beach",
    location: "Bali, Indonesia",
    rating: 4.9,
    reviews: 2450,
    duration: "5 ngày 4 đêm",
    price: 14500000,
    tag: "Nghỉ dưỡng",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
    description: "Thư giãn trên đảo nhiệt đới, khám phá ruộng bậc thang, đền cổ và những bãi biển tuyệt đẹp."
  },
  {
    id: 37,
    name: "Paris",
    region: "international",
    type: "culture",
    location: "Paris, Pháp",
    rating: 4.8,
    reviews: 2670,
    duration: "5 ngày 4 đêm",
    price: 28000000,
    tag: "Lãng mạn",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
    description: "Dạo quanh những đại lộ nổi tiếng, tham quan bảo tàng, công trình kiến trúc và quán cà phê kiểu Pháp."
  },
  {
    id: 38,
    name: "Rome",
    region: "international",
    type: "culture",
    location: "Rome, Ý",
    rating: 4.8,
    reviews: 1720,
    duration: "5 ngày 4 đêm",
    price: 26000000,
    tag: "Lịch sử",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá đấu trường La Mã, quảng trường cổ và những công trình kiến trúc có lịch sử hàng nghìn năm."
  },
  {
    id: 39,
    name: "Zurich",
    region: "international",
    type: "mountain",
    location: "Zurich, Thụy Sĩ",
    rating: 4.8,
    reviews: 970,
    duration: "5 ngày 4 đêm",
    price: 32000000,
    tag: "Phong cảnh",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1f5?auto=format&fit=crop&w=1000&q=85",
    description: "Tận hưởng hồ nước trong xanh, phố cổ và những chuyến đi ngắm cảnh thiên nhiên vùng núi Alps."
  },
  {
    id: 40,
    name: "Sydney",
    region: "international",
    type: "city",
    location: "Sydney, Úc",
    rating: 4.8,
    reviews: 1390,
    duration: "6 ngày 5 đêm",
    price: 29500000,
    tag: "Thành phố biển",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá nhà hát nổi tiếng, bến cảng, bãi biển và phong cách sống ngoài trời của nước Úc."
  },
  {
    id: 41,
    name: "New York",
    region: "international",
    type: "city",
    location: "New York, Hoa Kỳ",
    rating: 4.8,
    reviews: 2580,
    duration: "6 ngày 5 đêm",
    price: 35000000,
    tag: "Đô thị",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá những đại lộ nổi tiếng, công viên trung tâm, bảo tàng và nhịp sống sôi động của Manhattan."
  },
  {
    id: 42,
    name: "Istanbul",
    region: "international",
    type: "culture",
    location: "Istanbul, Thổ Nhĩ Kỳ",
    rating: 4.7,
    reviews: 1260,
    duration: "5 ngày 4 đêm",
    price: 19500000,
    tag: "Giao thoa văn hóa",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=85",
    description: "Khám phá những công trình lịch sử, khu chợ truyền thống và nền văn hóa giao thoa giữa Á và Âu."
  }
];
