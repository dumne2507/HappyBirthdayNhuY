// ============================================
// 🎂 BIRTHDAY WEBSITE CONFIGURATION
// Chỉnh sửa file này để tùy chỉnh website
// ============================================

const config = {
  // Tên người nhận
  recipientName: "Như Ý",

  // Tên người gửi
  senderName: "Người bạn của bạn",

  // Ngày sinh nhật (format: DD/MM/YYYY)
  birthday: "23/11/2026",

  // Lời chúc trên trang chính
  mainWish:
    "Chúc mừng sinh nhật Như ý 🥳🎂",
  
  mainMessage:
    "Thêm một tuổi mới, chúc bạn luôn xinh đẹp, vui vẻ, gặp thật nhiều điều may mắn và luôn giữ được năng lượng tích cực của mình nhé!",

  // Nội dung thư trong phong bì
  letterContent: `Happy Birthday!

Chúc bạn tuổi mới thật nhiều niềm vui, luôn tự tin, xinh đẹp và đạt được những điều mà bạn mong muốn.

Mong rằng những ngày sắp tới sẽ luôn có thật nhiều điều tốt đẹp đến với bạn.

Stay happy, stay awesome! 💗`,

  // Lời chúc bí mật trong hộp quà
  giftSecretMessage:
    "Bạn là người tuyệt vời nhất! Cảm ơn vì đã luôn là chính mình. 🌟",

  // 🎁 Media bất ngờ trong hộp quà (2 bức ảnh của Như Ý)
  giftMedia: {
    images: [
      "./media/NhuYne.jpg",
      "./media/NhuY.jpg",
    ],
    caption: "Món quà đặc biệt dành riêng cho Như Ý! 💖✨",
  },

  // Lời chúc khi thổi nến
  wishMessage:
    "Mong mọi điều ước của bạn đều thành hiện thực! ✨",

  // Các câu chúc trên bóng bay
  balloonWishes: [
    "Luôn vui vẻ! 🌈",
    "Xinh đẹp mãi! 💖",
    "Hạnh phúc nhé! 🌸",
    "Thành công nha! ⭐",
    "Mãi yêu đời! 🦋",
    "Bớt Hụt Cầu nhóe 😏",
  ],

  // Lời chúc bí mật khi hoàn thành mini game
  secretGameMessage:
    "Bạn thật giỏi! Đây là lời chúc đặc biệt dành riêng cho bạn: Chúc bạn luôn tỏa sáng và hạnh phúc mỗi ngày! 🌟💗✨",

  // Ảnh kỷ niệm (thay thế bằng URL ảnh thật)
  memories: [
    {
      id: 1,
      src: "./media/album/anh1/anh1.jpg",
      caption: "Khoảnh khắc đáng nhớ 📸",
    },
    {
      id: 2,
      src: "./media/album/anh2/anh2.jpg",
      caption: "Cùng nhau vui vẻ 🎉",
    },
    {
      id: 3,
      src: "./media/album/anh3/anh3.jpg",
      caption: "Những ngày tháng đẹp 🌸",
    },
    {
      id: 4,
      src: "./media/album/anh4/anh4.jpg",
      caption: "Best memories ever 💕",
    },
    {
      id: 5,
      src: "./media/album/anh5/anh5.jpg",
      caption: "Friends forever 👯‍♀️",
    },
    {
      id: 6,
      src: "./media/album/anh6/anh6.jpg",
      caption: "Yêu thương mãi 💗",
    },
  ],
};

export default config;
