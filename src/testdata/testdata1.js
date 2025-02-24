// 📌 공연 데이터
export const articles = [
    {
      title: "2024 크라잉넛 연말 콘서트 ‘뜨거운 안녕’",
      date: "2024.12.15",
      location: "무신사개러지",
      artists: ["크라잉넛", "캡틴락", "데디오레디오", "롤링쿼츠"],
    },
    {
      title: "브로콜리너마저 콘서트",
      date: "2024.11.13",
      location: "ASIAN POP STAGE",
      artists: ["크라잉넛", "롤링쿼츠"],
    },
    {
      title: "이승환 2024 전국 투어",
      date: "2024.12.25",
      location: "올림픽홀",
      artists: ["이승환", "정우"],
    },
    {
      title: "이승환 2024 전국 투어",
      date: "2024.12.25",
      location: "올림픽홀",
      artists: ["이승환", "정우"],
    },
    {
      title: "이승환 2024 전국 투어",
      date: "2024.12.25",
      location: "올림픽홀",
      artists: ["이승환", "정우"],
    },
  ];
  
  // 📌 공연장 데이터
  export const stageData = [
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "무신사 개러지",
      location: "서울특별시 마포구",
      tags: ["근본공연장", "하드록"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "부산 오방가르드",
      location: "부산광역시 남구",
      tags: ["부산대표", "인디"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "제비다방",
      location: "서울특별시 마포구",
      tags: ["소규모", "싱어송라이터"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "KT&G 상상마당 부산 라운",
      location: "부산광역시 부산진구",
      tags: ["근본공연장", "하드록"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "무신사 개러지",
      location: "서울특별시 마포구",
      tags: ["근본공연장", "하드록"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "부산 오방가르드",
      location: "부산광역시 남구",
      tags: ["부산대표", "인디"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "제비다방",
      location: "서울특별시 마포구",
      tags: ["소규모", "싱어송라이터"],
    },
    {
      image: require('../assets/Stageimg/DefaultStage.png'),
      name: "KT&G 상상마당 부산 라운",
      location: "부산광역시 부산진구",
      tags: ["근본공연장", "하드록"],
    },
  ];
  
  // 📌 아티스트 데이터
  export const artistData = [
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "크라잉넛",
      tags: ["펑크밴드", "1997"], // ✅ 배열로 수정
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "잔나비",
      tags: ["인디록", "2014"],
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "실리카겔",
      tags: ["싸이키델릭", "2015"],
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "YB (윤도현 밴드)",
      tags: ["록", "1994"],
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "크라잉넛",
      tags: ["펑크밴드", "1997"], // ✅ 배열로 수정
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "잔나비",
      tags: ["인디록", "2014"],
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "실리카겔",
      tags: ["싸이키델릭", "2015"],
    },
    {
      image: require('../assets/Artistimg/DefaultArtist.png'),
      name: "YB (윤도현 밴드)",
      tags: ["록", "1994"],
    },
  ];
  
  export const profileData = {
    name: "스미스",
    profileImage: require("../assets/Profileimg/Person1.png"),
    stats: [
      { label: "내 공연", value: 24 },
      { label: "스크랩", value: 54 },
      { label: "작성한 글", value: 0 },
      { label: "활동", value: 112 },
    ],
  };

  export const performanceData = [
    {
      id: 1,
      image: require('../assets/Articleimg/Poster.jpg'),
      title: "크라잉넛 연말 콘서트 뜨거운 안녕",
      date: "2024.12.15",
      rating: 4, // 공연 평균 별점 (1~5)
      userRating: 5, // 특정 유저가 매긴 별점 (없으면 null)
      userId: 101, // 특정 유저 ID
    },
    {
      id: 2,
      image: require('../assets/Articleimg/Poster.jpg'),
      title: "브로콜리너마저 단독 콘서트",
      date: "2024.11.13",
      rating: 3,
      userRating: null, // 이 유저가 별점 안 매김
      userId: 102,
    },
    {
      id: 3,
      image: require('../assets/Articleimg/Poster.jpg'),
      title: "이승환 2024 전국 투어",
      date: "2024.12.25",
      rating: 5,
      userRating: 4,
      userId: 101,
    },
    {
      id: 4,
      image: require('../assets/Articleimg/Poster.jpg'),
      title: "ASIAN POP STAGE vol.2",
      date: "2024.11.10",
      rating: 2,
      userRating: null,
      userId: 103,
    },
    {
      id: 5,
      image: require('../assets/Articleimg/Poster.jpg'),
      title: "The K-Indie Music Festival",
      date: "2024.10.05",
      rating: 4,
      userRating: 3,
      userId: 101,
    },
  ];
  
  