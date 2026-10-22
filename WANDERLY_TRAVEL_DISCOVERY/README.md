# WANDERLY — Travel Discovery

Website khám phá điểm đến du lịch Việt Nam, phong cách cinematic/editorial, tham khảo mockup giao diện trong `assets/wanderly-design-reference.png` nếu có.

## Chạy project
1. Giải nén `WANDERLY_TRAVEL_DISCOVERY.zip`.
2. Mở thư mục trong VS Code.
3. Cài extension **Live Server**.
4. Chuột phải `index.html` → **Open with Live Server**.

Không cần Node.js, npm hay backend.

## Cấu trúc
- `index.html`: bố cục các section của website.
- `css/style.css`: giao diện, responsive desktop/tablet/mobile.
- `js/data.js`: dữ liệu mẫu 24 điểm đến trong nước và quốc tế.
- `js/app.js`: tìm kiếm, lọc, popup chi tiết, yêu thích, newsletter.
- `assets/`: ảnh tham khảo giao diện.

## Chức năng demo
- Tìm kiếm điểm đến.
- Lọc theo vùng miền (Bắc, Trung, Nam, quốc tế), phong cách và ngân sách tham khảo.
- Xem thông tin chi tiết trong popup.
- Lưu/bỏ lưu yêu thích bằng LocalStorage.
- Đăng ký nhận tin demo.
- Responsive cho màn hình nhỏ.

## Lưu ý
- Ảnh các điểm đến dùng URL Unsplash, cần kết nối Internet.
- Giá, đánh giá và thời lượng là dữ liệu minh họa, không phải báo giá đặt tour trực tiếp.
- Chưa có backend, đăng nhập, thanh toán hoặc đặt tour thật.
- LocalStorage lưu trên trình duyệt hiện tại.
