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

  // 🎁 Media bất ngờ trong hộp quà (Ảnh & Video của Như Ý)
  giftMedia: {
    video: "./media/NhuYne.mp4",
    image: "./media/NhuY.jpg",
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
      src: null, // null = placeholder
      caption: "Khoảnh khắc đáng nhớ 📸",
    },
    {
      id: 2,
      src: null,
      caption: "Cùng nhau vui vẻ 🎉",
    },
    {
      id: 3,
      src: null,
      caption: "Những ngày tháng đẹp 🌸",
    },
    {
      id: 4,
      src: null,
      caption: "Best memories ever 💕",
    },
    {
      id: 5,
      src: null,
      caption: "Friends forever 👯‍♀️",
    },
    {
      id: 6,
      src: null,
      caption: "Yêu thương mãi 💗",
    },
  ],
};

export default config;
