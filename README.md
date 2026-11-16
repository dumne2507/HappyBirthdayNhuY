# 🎂 Cute Gen Z Interactive Birthday Website 💗

Món quà thiệp sinh nhật tương tác kỹ thuật số đặc biệt dành riêng cho bạn nữ theo phong cách **Cute Gen Z – Pastel** (Hồng Pastel, Lavender, Baby Blue, Cream).

---

## 🌟 Tính Năng Nổi Bật

1. **Màn hình mở đầu (Birthday Intro Splash)**:
   - Hộp quà 3D CSS rung rinh giữa màn hình cùng background gradient pastel chuyển động.
   - Nút bấm `OPEN YOUR SURPRISE 🎁` kích hoạt pháo hoa confetti, hiệu ứng nổ sticker emoji dễ thương và chuyển cảnh mượt mà sang trang thiệp chính.
2. **Bánh sinh nhật tương tác (Birthday Cake)**:
   - Bánh sinh nhật nhiều tầng vẽ hoàn toàn bằng CSS, kem nhỏ giọt, kẹo rắc và quả cherry trên đỉnh.
   - 5 ngọn nến lung linh có animation ngọn lửa bập bùng sống động.
   - Nút `MAKE A WISH ✨`: thổi tắt nến, khói bay, pháo hoa nổ và hiện popup lời chúc ước nguyện. Có thể bấm `Thắp lại nến 🕯️`.
3. **Hộp quà bất ngờ (Gift Box)**:
   - Hiệu ứng rung lắc nhẹ khi chờ click.
   - Nhấn vào để mở nắp hộp, bắn pháo giấy, sao bay vút lên và hé lộ tấm thẻ thư bí mật bên trong.
   - Có thể đóng/mở nhiều lần.
4. **Phong bì thư tay pastel (Birthday Envelope)**:
   - Thiết kế phong bì cổ điển pastel với con dấu sáp trái tim.
   - Nhấn để mở nắp phong bì bằng hiệu ứng 3D lật mở (perspective rotateX).
   - Lá thư viết tay phong cách nghệ thuật trượt lên mượt mà với lời chúc ấm áp.
5. **Bóng bay lời chúc (Floating Balloons)**:
   - 6 quả bóng bay pastel với bóng đổ 3D và dây uốn lượn đu đưa trong gió.
   - Nhấn vào từng quả bóng: bóng bay vút lên bầu trời và hiện toast lời chúc ngọt ngào.
   - Có nút `Thả bóng bay lại 🎈` khi đã thả hết bóng.
6. **Trái tim nhịp đập & mưa tim (Heart Animation)**:
   - Trái tim lớn đập theo nhịp heartbeat và phát sáng neon hồng pastel.
   - Nhấn vào sẽ bắn ra 15 quả tim nhỏ bay tứ phía với hiệu ứng gradient cùng thông điệp `"Sending you lots of happiness! 💗"`.
7. **Scrapbook Album ảnh kỷ niệm (Memory Gallery)**:
   - 6 khung ảnh phong cách Polaroid được dán băng dính washi và ghim kẹp dễ thương, nghiêng nhẹ tự nhiên.
   - Hỗ trợ tải trực tiếp ảnh từ máy tính/điện thoại lên thay cho ảnh mẫu ngay trên trình duyệt mà không cần cài đặt thêm gì.
8. **Mini Game sinh nhật: "COLLECT THE HEARTS 💗"**:
   - Trò chơi bắt tim xuất hiện ngẫu nhiên trên màn hình.
   - Đếm điểm thời gian thực, có hiệu ứng `+1` bay lên khi bắt trúng.
   - Đạt 10 điểm sẽ kích hoạt đại tiệc pháo hoa confetti và mở khóa lời chúc bí mật đặc biệt. Có nút chơi lại.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
birthday-y/
├── index.html                   # HTML template với Google Fonts (Fredoka, Quicksand, Nunito)
├── package.json                 # Cấu hình dự án & dependencies (React 19, Vite, canvas-confetti)
├── vite.config.js               # Cấu hình Vite
├── README.md                    # Tài liệu hướng dẫn chi tiết
└── src/
    ├── main.jsx                 # Entry point React
    ├── App.jsx                  # Main component điều phối màn hình intro và các section
    ├── App.css                  # Style bố cục chính, background doodles
    ├── config.js                # ⭐ FILE CẤU HÌNH TÙY BIẾN TOÀN BỘ NỘI DUNG ⭐
    ├── styles/
    │   └── global.css           # Design system màu sắc pastel, animations, button, cards
    └── components/
        ├── BirthdayIntro.jsx    # Màn hình mở đầu & hộp quà mở đầu
        ├── BirthdayIntro.css
        ├── BirthdayCake.jsx     # Bánh sinh nhật thổi nến
        ├── BirthdayCake.css
        ├── GiftBox.jsx          # Hộp quà bí mật
        ├── GiftBox.css
        ├── BirthdayEnvelope.jsx # Phong bì & thư tay
        ├── BirthdayEnvelope.css
        ├── FloatingBalloons.jsx # Bóng bay bay lên
        ├── FloatingBalloons.css
        ├── HeartAnimation.jsx   # Trái tim & mưa tim
        ├── HeartAnimation.css
        ├── MemoryGallery.jsx    # Album ảnh Polaroid
        ├── MemoryGallery.css
        ├── HeartMiniGame.jsx    # Mini game bắt tim
        ├── HeartMiniGame.css
        ├── BirthdayFooter.jsx   # Footer lấp lánh
        └── BirthdayFooter.css
```

---

## 🚀 Hướng Dẫn Chạy Website Trên Localhost

1. **Cài đặt thư viện** (nếu chưa cài):
   ```bash
   npm install
   ```

2. **Khởi động server phát triển**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập: **`http://localhost:5173/`**

3. **Build phiên bản tối ưu hóa cho Production**:
   ```bash
   npm run build
   ```
   Thư mục `dist/` sẵn sàng để tải lên bất kỳ hosting nào!

---

## 🎨 Hướng Dẫn Tùy Biến Lời Chúc & Tên Người Nhận

Toàn bộ thông tin được gom gọn gàng trong file duy nhất: **`src/config.js`**

### 1. Đổi tên người nhận & người gửi
Mở file `src/config.js` và chỉnh sửa:
```javascript
// Tên bạn nữ nhận thiệp
recipientName: "Bảo Ngọc",

// Tên của bạn (người gửi)
senderName: "Minh Quân",

// Ngày sinh nhật hiển thị trên huy hiệu
birthday: "16/11/2026",
```

### 2. Chỉnh sửa lời chúc chính & thư tay
Cũng trong file `src/config.js`:
```javascript
// Tiêu đề & lời chúc ở đầu trang
mainWish: "Chúc mừng sinh nhật cô gái đặc biệt hôm nay!",
mainMessage: "Thêm một tuổi mới, chúc bạn luôn xinh đẹp, vui vẻ...",

// Nội dung bức thư tay bên trong phong bì
letterContent: `Happy Birthday!

Chúc bạn tuổi mới thật nhiều niềm vui, luôn tự tin, xinh đẹp...

Stay happy, stay awesome! 💗`,

// Lời chúc trong hộp quà bí mật
giftSecretMessage: "Bạn là người tuyệt vời nhất! Cảm ơn vì đã luôn là chính mình. 🌟",

// Lời chúc khi hoàn thành mini game (bắt đủ 10 tim)
secretGameMessage: "Bạn thật giỏi! Chúc bạn luôn tỏa sáng và hạnh phúc mỗi ngày! 🌟💗✨",
```

### 3. Thêm ảnh cá nhân sẵn vào album
Có 2 cách:
- **Cách 1 (Nhanh nhất - Không cần sửa code)**: Khi mở website, chỉ cần click trực tiếp vào từng khung ảnh Polaroid để chọn ảnh từ máy tính hoặc điện thoại!
- **Cách 2 (Lưu cố định)**: Copy các file ảnh vào thư mục `public/photos/` (ví dụ: `photo1.jpg`, `photo2.jpg`) và cấu hình đường dẫn trong `src/config.js`:
  ```javascript
  memories: [
    {
      id: 1,
      src: "/photos/photo1.jpg",
      caption: "Đi cafe cuối tuần ☕",
    },
    ...
  ]
  ```

---

## 🌐 Hướng Dẫn Deploy Miễn Phí Lên Mạng (Để gửi link cho bạn nữ)

### Cách 1: Deploy lên Netlify Drop (Đơn giản nhất – chỉ 30 giây!)
1. Mở terminal tại thư mục dự án và chạy:
   ```bash
   npm run build
   ```
2. Mở trình duyệt vào trang [https://app.netlify.com/drop](https://app.netlify.com/drop) (đăng nhập hoặc đăng ký miễn phí).
3. Kéo thả toàn bộ thư mục **`dist`** vào ô tròn trên màn hình Netlify.
4. Netlify sẽ tự động tạo một đường link công khai (ví dụ `https://cute-birthday-for-her.netlify.app`). Bạn có thể đổi tên miền con theo ý thích hoàn toàn miễn phí!

### Cách 2: Deploy lên Vercel
1. Đăng ký tài khoản tại [https://vercel.com](https://vercel.com).
2. Tải mã nguồn lên GitHub hoặc cài CLI Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```
3. Làm theo hướng dẫn trên màn hình, web sẽ được deploy trực tuyến ngay lập tức!

### Cách 3: Deploy lên GitHub Pages
1. Trong file `vite.config.js`, thêm dòng:
   ```javascript
   export default defineConfig({
     base: '/<ten-repo>/',
     plugins: [react()],
   })
   ```
2. Đẩy code lên GitHub repository.
3. Vào Settings -> Pages -> Chọn nhánh `gh-pages` hoặc dùng GitHub Actions với template Vite.
