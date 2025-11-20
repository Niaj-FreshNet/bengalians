// lib/data.ts - Server-side data fetching using real JSON data

export interface Product {
  _id: string
  name: string
  slug?: string
  category: string
  price: number
  primaryImage: string
  secondaryImage?: string
  smell: string[]
  section?: "featured" | "new-arrivals" | "top-rated" | "newArrival"
  variantPrices?: { [key: string]: number }
  description?: string
  specification?: string
  sku?: string
  stock?: string
  measurement?: string
  origin?: string
  supplier?: string
  brand?: string
  notes?: string
  isFeatured?: string
  discount?: number
  moreImages?: string[]
  relatedProducts?: string[]
}

export interface Review {
  id: string
  image: string
  facebookLink: string
  instagramLink: string
}

// Real product data from the provided JSON
const realProducts: Product[] = [
  {
    _id: "672c247e52f0e7ffc1e03118",
    name: "Axe Signature",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-1001",
    price: 150,
    smell: ["Corporate", "Refreshing"],
    specification: "male",
    description:
      "আমরা আমাদের কর্পোরেট এরিয়াতে নিজের ব্যক্তিত্ব ধরে রাখতে সর্বদাই ইউনিক কিছু ব্যবহার করতে চাই। Axe Signeture আপনাকে স্ট্রং ম্যানলি, কুল, ফ্রেশ, গ্রাস, একুয়াটিক ফিল দিবে।\n\nএই পারফিউম অয়েলের প্রজেকশন চমৎকার। তাই চারপাশে ছড়াবে  ভালো। স্কুল,কলেজ, অফিসে ইউজের জন্য আপনাদের বেস্ট চয়েস  হতে পারে।",
    stock: "0",
    measurement: "ml",
    origin: "France",
    supplier: "Zia",
    primaryImage: "https://i.ibb.co.com/6YbgqWP/Axe-Signature.png",
    secondaryImage: "https://i.ibb.co.com/4VqPcqZ/Axe-Signature.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 150,
      "6 ml": 250,
      "12 ml": 550,
      "25 ml": 1080,
      "100 ml": 1500,
    },
    isFeatured: "no",
    notes: "Top note: Green Notes\nMiddle notes: Hazelnut and Tahitian Vanilla\nBase notes: Woody Notes and Tonka Bean",
    section: "featured",
  },
  {
    _id: "672d6f6cb6043538312131b4",
    name: "Accento",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-1002",
    price: 220,
    smell: ["Corporate", "Manly", "Citrusy", "Projective", "Synthetic"],
    specification: "male",
    description:
      "100% Alcohol Free Perfume Oil\n\nAccento একটি কর্পোরেট টাইপ পারফিউম অয়েল। এটি আপনার কর্মস্থলের পরিবেশকে ভরিয়ে তুলবে কোমল সুগন্ধে ইনশাআল্লাহ। এটির ব্যবহার সে স্থানে উপস্থিত সকলকে করে তুলবে বিমোহিত এবং একবার হলেও কৌতুহল জাগাবে যে আপনি ঠিক কোন সুগন্ধিটি ব্যবহার করেছেন।",
    stock: "20 ml",
    measurement: "ml",
    origin: "UAE",
    supplier: "Ismail",
    primaryImage: "https://i.ibb.co.com/LzxC1q9/Accento.png",
    secondaryImage: "https://i.ibb.co.com/LzxC1q9/Accento.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 220,
      "6 ml": 420,
      "12 ml": 780,
      "25 ml": 1480,
      "100 ml": 2400,
    },
    notes:
      "~ Citrus, Pineapple and Hyacinth at top notes\n~ Pink Pepper, Iris and Jasmine in middle notes\n~ Musk, Amber, Vetiver, Patchouli, And Vanilla at last.",
    isFeatured: "no",
    discount: 0,
  },
  {
    _id: "672d8cac248d76f676b398bb",
    name: "Dior Sauvage",
    section: "featured",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-10010",
    price: 150,
    smell: ["Floral", "Soapy", "Refreshing", "Candy"],
    description:
      "আপনাদের অনেকেরই কমন একটা প্রশ্ন❓\nভাইয়া একটি পারফিউম অয়েলের নাম বলেন যেটা সারা বছর ইউজ করা যাবে!\nএক্ষেত্রে আমরা সাজেস্ট করবো ডিওর সভাশ। কেননা এটা সেরাদের সেরা, যা আপনি সারাবছর ইউজ করলেও আপনার কাছে প্রতিবার নতুন অনুভূতি সঞ্চার করবে।",
    notes:
      "Top notes: Calabrian bergamot and pepper\nMiddle notes: Sichuan pepper, Lavender, pink pepper, Vativer, patchouli, Geranium and elemi\nBase notes: Ambroxan, Cedar and Labdanum",
    stock: "90 ml",
    measurement: "ml",
    origin: "France",
    supplier: "Zia",
    primaryImage: "https://i.ibb.co.com/Yh7bFyD/Dior-Sauvage.png",
    secondaryImage: "https://i.ibb.co.com/Yh7bFyD/Dior-Sauvage.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 150,
      "6 ml": 280,
      "12 ml": 550,
      "25 ml": 1080,
      "100 ml": 1800,
    },
    isFeatured: "no",
  },
  {
    _id: "672d980e1d68a7b75ac04dde",
    name: "Escada Moon",
    section: "featured",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-10012",
    price: 220,
    smell: ["Refreshing", "Soapy", "Fruity", "Candy", "Floral", "Projective", "Nostalgic"],
    description:
      "ঘ্রাণ মানুষকে মনে করিয়ে দিতে পারে ছোট্টবেলার ছোট্ট ছোট্ট স্মৃতিগুলোও। সুইট, ফ্লোরাল, ভ্যানিলা, কোকোয়া নোটসের বেশ সুন্দর স্মেল প্রোফাইল যা সবার হওয়ার মতো।",
    notes:
      "Top Notes: Strawberry, Black Currant, Red Apple, Citrus (Citrus Cocktail)\nHeart (Middle) Notes: Sweet, Pea, Freesia, Jasmine, Rose\nBase Notes: Raspberry, Musk, Sandalwood, Amber",
    stock: "20 ml",
    measurement: "ml",
    origin: "UAE",
    supplier: "Ismail",
    primaryImage: "https://i.ibb.co.com/BwDLHVD/Escada-Moon-2.jpg",
    secondaryImage: "https://i.ibb.co.com/0Dz1Y2w/Escada-Moon-2-Zoomed.jpg",
    moreImages: ["blob:https://bengalians.com/1b0e2e41-3e23-4122-bb5d-b6acf038e154"],
    variantPrices: {
      "3 ml": 220,
      "6 ml": 420,
      "12 ml": 780,
      "25 ml": 1480,
      "100 ml": 3000,
    },
    isFeatured: "no",
  },
  {
    _id: "672dacf1045973bcc73522ba",
    name: "Infinity Sweet",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-10019",
    price: 150,
    smell: ["Candy", "Refreshing", "Sweet", "Powdery", "Amber", "Nostalgic", "Projective", "Longetive"],
    description:
      "নামটি শুনেই বোঝা যাচ্ছে নিঃসন্দেহে এটি মিষ্টি সুবাস বহন করে।\n\nএটি আপনাকে এতোটাই মিষ্টি অনুভূতির যোগান দিবে যে আপনার মনে হবে যে সুইট ক্যান্ডি,ভ্যানিলা,পাকা পেপে,বেদানা, কাছা-মিঠা আম, আপেল,পেয়ারা,আঙ্গুর সহো আরো অসাধারণ কিচ্ছু ফল এর ঘ্রান পাবেন এই অয়েল এ।",
    notes: "Lime, Mint, Black Currant, Neroli, Mimosa, Green Notes, Rose, and White Musk.",
    stock: "3 ml",
    measurement: "ml",
    origin: "France",
    supplier: "Zia",
    primaryImage: "https://i.ibb.co.com/88RwsmP/Infinity-Sweet.png",
    secondaryImage: "https://i.ibb.co.com/88RwsmP/Infinity-Sweet.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 150,
      "6 ml": 280,
      "12 ml": 550,
      "25 ml": 1080,
      "100 ml": 2200,
    },
    isFeatured: "no",
    section: "featured",
  },
  {
    _id: "672e118ec1be6cbd1da3b558",
    name: "Prada Candy",
    section: "featured",
    category: "inspiredPerfumeOil",
    sku: "KBW-INS-10023",
    price: 220,
    smell: ["Powdery", "Candy", "Refreshing", "Musky", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    description:
      "টপ নোটসে ক্যারামেলের হালকা সুইটি-মিন্ট & ক্যান্ডি স্মেল, সাথে কিছুটা সিট্রাস। টপ নোটসের এই স্মেলগুলোর কম্বিনেশন আপনাকে একুয়াটিক ফিল দিতে থাকবে শুরুতে।",
    notes: "Top notes: Caramel\nMiddle notes: Powdery notes, Musk\nBase notes: Benzoin, Vanilla",
    stock: "80 ml",
    measurement: "ml",
    origin: "France",
    brand: "Sattco",
    supplier: "Sunan",
    primaryImage: "https://i.ibb.co.com/nb8M65V/Prada-Candy.png",
    secondaryImage: "https://i.ibb.co.com/nb8M65V/Prada-Candy.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 220,
      "6 ml": 420,
      "12 ml": 780,
      "25 ml": 1480,
      "100 ml": 2500,
    },
    isFeatured: "no",
  },
  {
    _id: "672e323943229d4a8644d012",
    name: "Tayef Rose",
    category: "oriental",
    sku: "KBW-ORI-10031",
    price: 280,
    smell: ["Floral", "Refreshing", "Sweet", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    description:
      "গোলাপের ঘ্রাণে মাতোয়ারা এক চমৎকার পারফিউম অয়েল তায়েফ রোজ।\nআদিকাল থেকেই সুগন্ধিপ্রেমীদের আকর্ষণের আলাদা একটি বস্তু গুলাব।",
    notes:
      "Top Notes: Pink Pepper, Saffron, Bergamot\nMiddle Notes: Taif Rose, Jasmine, Geranium\nBase Notes: Musk, Sandalwood, Amber, Patchouli",
    stock: "0",
    measurement: "ml",
    origin: "Saudi Arabia",
    brand: "Sattco",
    supplier: "Sunan",
    primaryImage: "https://i.ibb.co.com/VvvqQVS/Tayef-Rose.png",
    secondaryImage: "https://i.ibb.co.com/VvvqQVS/Tayef-Rose.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 280,
      "6 ml": 520,
      "12 ml": 980,
      "25 ml": 1880,
      "100 ml": 3000,
    },
    isFeatured: "no",
  },
  {
    _id: "672ef0c436f19635cb79365b",
    name: "Mukhallat Asem",
    category: "oriental",
    sku: "KBW-ORI-10055",
    price: 350,
    smell: [
      "Fruity",
      "Refreshing",
      "Floral",
      "Soapy",
      "Powdery",
      "Bergamote",
      "Woody",
      "Musky",
      "Nostalgic",
      "Projective",
      "Longetive",
      "Synthetic",
    ],
    description: "ফ্রুটি ফ্র‍্যাগরেন্স আর সুইটনেসের পারফেক্ট কম্বিনেশনে তৈরী চমৎকার এক মিশ্রণের নাম মুখাল্লাত আসেম।",
    notes:
      "Top Notes: Rose, Saffron, Bergamot\nHeart Notes: Jasmine, Ylang-Ylang, Sandalwood\nBase Notes: Oud (Agarwood), Amber, Musk, Vanilla",
    stock: "12 ml",
    measurement: "ml",
    origin: "India",
    brand: "Ajmal",
    supplier: "Sunan",
    primaryImage: "https://i.ibb.co.com/vm9qRCy/n5.png",
    secondaryImage: "https://i.ibb.co.com/vm9qRCy/n5.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 350,
      "6 ml": 650,
      "12 ml": 1180,
      "25 ml": 2280,
      "100 ml": 4800,
    },
    isFeatured: "no",
    section: "featured",
  },
  {
    _id: "672ef2c036f19635cb79365d",
    name: "Mukhallat Maliki",
    category: "oriental",
    sku: "KBW-ORI-10057",
    price: 350,
    smell: [
      "Earthy",
      "Refreshing",
      "Floral",
      "Bergamote",
      "Woody",
      "Spicy",
      "Amber",
      "Strong",
      "Nostalgic",
      "Projective",
      "Longetive",
      "Synthetic",
    ],
    specification: "male",
    description:
      "মুখাল্লাত মালিকি একটি সমৃদ্ধ, এবং পরিশীলিত অরিয়েন্টাল পারফিউম অয়েল (আতর) যা আরবীয় আভিজাত্যের আনন্দ উপভোগের জন্য তৈরি করা হয়েছে।",
    notes: "Top Notes: Saffron, Rose\nHeart Notes: Amber, Oud (Agarwood)\nBase Notes: Sandalwood, Musk",
    stock: "25 ml",
    measurement: "ml",
    origin: "UAE",
    brand: "Al Haramin",
    supplier: "Sumon",
    primaryImage: "https://i.ibb.co.com/sqz59h6/Mukhallat-Maliki.png",
    secondaryImage: "https://i.ibb.co.com/sqz59h6/Mukhallat-Maliki.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 350,
      "6 ml": 650,
      "12 ml": 1180,
      "25 ml": 2280,
      "100 ml": 3500,
    },
    isFeatured: "no",
    section: "featured",
  },
  {
    _id: "672e97afb32806953009600f",
    name: "Romance",
    category: "oriental",
    sku: "KBW-ORI-10039",
    price: 380,
    smell: ["Floral", "Refreshing", "Sweet", "Powdery", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    description: "💚জেসমিনের সুবাসে ফোটে নিজের মনন। \nভালোবাসায় ভরে দেবে মোহনার মন😍\nচায় না নিতে এর সুখ, কে আছে এমন?🤔",
    notes:
      "Top Notes: Mandarin essence, pink pepper, and violet leaves\nMiddle Notes: Rose Damascena essence, jasmine absolute, marigold essence, and geranium essence\nBase Notes: Velvety soft woods, oakmoss, and seductive musks",
    stock: "0",
    measurement: "ml",
    origin: "UAE",
    brand: "Sattco",
    supplier: "Sunan",
    primaryImage: "https://i.ibb.co.com/Z88KJSJ/Romance.jpg",
    secondaryImage: "https://i.ibb.co.com/0Dz1Y2w/Escada-Moon-2-Zoomed.jpg",
    moreImages: [],
    variantPrices: {
      "3 ml": 380,
      "6 ml": 720,
      "12 ml": 1380,
      "25 ml": 2580,
      "100 ml": 4800,
    },
    isFeatured: "no",
    section: "featured",
  },
  {
    _id: "6792bf82bb6fedc4f1e04911",
    name: "Misk Rijali",
    section: "featured",
    category: "oriental",
    sku: "KBW-ORI-10089",
    price: 480,
    smell: [
      "Manly",
      "Powdery",
      "Bergamote",
      "Lavender",
      "Woody",
      "Spicy",
      "Strong",
      "Musky",
      "Nostalgic",
      "Projective",
      "Longetive",
      "Synthetic",
    ],
    description:
      "Experience a luxurious scent with Ajmal Misk Rijali Premium Perfume Oil. Combining French fragrance and musk, this silky, powdery scent emits opulent essences of Lily Of The Valley for a truly indulgent aroma for women and men.",
    notes: "Top Notes: Jasmine\nMiddle Notes: Iris, Benzoin\nBase Notes: Amber, Vanilla, Musk",
    stock: "20 ml",
    measurement: "ml",
    origin: "India",
    brand: "Ajmal",
    supplier: "Kholzi",
    primaryImage: "https://i.ibb.co.com/hWnHTSG/Misk-Rijali.png",
    secondaryImage: "https://i.ibb.co.com/hWnHTSG/Misk-Rijali.png",
    moreImages: [],
    variantPrices: {
      "3 ml": 480,
      "6 ml": 780,
      "12 ml": 1380,
      "25 ml": 2480,
      "100 ml": 7500,
    },
  },
  {
    "_id": "672ef3fb36f19635cb79365e",
    "name": "Ameer Al Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10061",
    "price": 150,
    "smell": ["Earthy", "Floral", "Woody", "Bergamote", "Strong", "Projective", "Longetive", "Synthetic"],
    "description": "অসম্ভব মিষ্টি ঘ্রাণ, ছড়ায় অনেক বেশি। দীর্ঘসময় ধরে ঘ্রাণ দিতে থাকবে আপনার আশপাশ জুড়ে।\n\nউদ আতরগুলোর মধ্যে সবচেয়ে বেশি ব্যবহৃত, সর্বজনগৃহিত এবং সবচেয়ে বেশ প্রশংসিত আতর হলো আমির আল উদ। আতরের জগতের আমির বা কিং বলা যায় এক কথায় । \n\n\nআমির আল উদের মিষ্টি, উদি, সুইট ও পাউডারী নোটসগুলো যে কাউকে সহজেই মুগ্ধ করে। ছেলে হোক বা মেয়ে, ইয়াং হোক বা মুরব্বি। হাজার টাকার আতর বা পারফিউম ইউজ করলেও এই আমির আল উদকে যেন ভুলতে পারে না কেউ!\n\n\nনতুন ইউজাররা যারা কমের মধ্যেই উদ টাইপ কিছু ট্রাই করার জন্য খুঁজছেন তাদের জন্য আমির আল উদ হতে পারে সেরা একটি চয়েস।\nআমির আল উদের লং লাষ্টিং ও প্রজেকশন হাইলি স্যাটিসফাইড (আমাদের কথা নয়, ইউজারদের মন্তব্য)।\n\n\nনোটস- Vanilla, Woody, Sweet, Oud & Powdery",
    "notes": "Top Notes: Woodsy Notes, Agarwood (Oud)\nMiddle Notes: Sugar, Vanilla\nBase Notes: Agarwood (Oud), Sandalwood, Herbal Notes",
    "stock": "80 ml",
    "measurement": "ml",
    "origin": "India",
    "brand": "MNP",
    "supplier": "Sunan",
    "primaryImage": "https://i.ibb.co.com/dghmcgY/Ameer-Al-Oud.png",
    "secondaryImage": "https://i.ibb.co.com/dghmcgY/Ameer-Al-Oud.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 150,
      "6 ml": 280,
      "12 ml": 550,
      "25 ml": 1080,
      "100 ml": 1400
    },
    "isFeatured": "no"
  },
  {
    "_id": "672ef53336f19635cb79365f",
    "name": "Oud Arabia",
    "category": "artificialOud",
    "sku": "KBW-ART-10062",
    "price": 220,
    "smell": ["Woody", "Bergamote", "Earthy", "Manly", "Spicy", "Strong", "Smooky", "Amber", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "specification": "male",
    "description": "এরাবিয়ান ঘরানার আতরগুলোর মধ্যে খুবই প্রসিদ্ধ ও বহুল ব্যবহৃত এক খুশবু Oud Arabia.\n\nখুশবুদার হিসেবে চমৎকার পারফরমেন্স এই উদ অয়েলের। এরাবিয়ান এই উদে যেসমস্ত স্বতন্ত্র ফ্র‍্যাগরেন্স পাওয়া যায়...\n\nনোটসের মধ্যে কাঠুরে(woody) ঘ্রাণের প্রচন্ডরকম ছড়াছড়ি। মশলাদার(spicy) ঘ্রাণে আলাদা ফিলিংস। এ দুয়ে মিলে একটি হার্ড পারফরমেন্স তৈরি করে, যা অরডিনারী উদ অয়েলের বৈশিষ্ট্যগুলোকে আর্টিফিশিয়ালী তুলে ধরে। আস্তে আস্তে স্নায়ুশক্তি আপনাকে নাকেধরা ধোঁয়াটে(smooky) অনুভূতি দিবে। এর প্রতিটি ফোঁটায় আরো থাকছে হালকা মিষ্টতার(sweety) কম্বিনেশন। এসব মিলে একেরপর এক যে রোমাঞ্চ উদ্ভাসিত হয়, তা এতে এনে দেয় পুরোদস্তুর আরবীয়(Arabian) পারফর্মেন্স।\n\nএধরণের ফ্র‍্যাগরেন্স যারা খুঁজছেন, তাদের প্রতি খুব সাজেশন থাকবে এটা ট্রাই করার জন্য। খুবই রিজনেবল প্রাইসের মধ্যে এরাবিয়ান ফিলিংসয়ের এরকম আত্তার খুব কমই পাওয়া যাবে হয়তো!",
    "notes": "Top Notes: Saffron, Rose\nHeart Notes: Agarwood (Oud), Patchouli\nBase Notes: Amber, Musk, Vanilla",
    "stock": "40 ml",
    "measurement": "ml",
    "origin": "UAE",
    "brand": "Swiss Arabian",
    "supplier": "Sumon",
    "primaryImage": "https://i.ibb.co.com/HdKmkps/Oud-Arabia.png",
    "secondaryImage": "https://i.ibb.co.com/HdKmkps/Oud-Arabia.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 220,
      "6 ml": 420,
      "12 ml": 780,
      "25 ml": 1480,
      "100 ml": 1800
    },
    "isFeatured": "no"
  },
  {
    "_id": "672ef5c736f19635cb793660",
    "name": "Black Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10063",
    "price": 180,
    "smell": ["Earthy", "Manly", "Leathery", "Woody", "Smooky", "Amber", "Longetive", "Synthetic"],
    "description": "প্রথমেই বলে দেই, কিছু লোক থাকবেন যারা ব্ল্যাক উদ নাকে নিলেই শাটামের উপর বমি করে ফেলবেন। বুঝতেই পারছেন, তাদের উদ্দ্যেশ্যে খুশবুওয়ালার কালেকশনে এটা রাখা হয়নি। এটা হচ্ছে pro লেভেলের পাবলিকদের জন্য! যারা আতরকে সেভাবে জানে-বুঝে।\n\nব্ল্যাক উদ আপনাকে উদের Leather যেই নোটস, সেটার ৮০-৯০% ফিলিংস দিবে। এতটা কড়া ঘ্রাণ টিপিক্যাল ঘরানার উদের মধ্যে দ্বিতীয়টা খুঁজে পাওয়া দুষ্কর। উদের woody ফিল কিছুটা পাবেন...। যাদের কাছে ফ্লোরাল টাইপ স্মেলগুলোকে পানি আর শরবত মনে হয়, ভাইয়ারা আপনাদের জন্যই এটাকে বলা হচ্ছে বোমা-কালা উদ!",
    "notes": "Top Notes: Rose, Saffron, Bergamot\nHeart Notes: Agarwood (Oud), Patchouli, Cedarwood\nBase Notes: Amber, Musk, Vanilla",
    "stock": "25 ml",
    "measurement": "ml",
    "origin": "Saudi Arabia",
    "brand": "Surrati",
    "supplier": "Sumon",
    "primaryImage": "https://i.ibb.co.com/FBjP5cw/Black-Oud.png",
    "secondaryImage": "https://i.ibb.co.com/FBjP5cw/Black-Oud.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 180,
      "6 ml": 320,
      "12 ml": 580,
      "25 ml": 1080,
      "100 ml": 1800
    },
    "isFeatured": "no"
  },
  {
    "_id": "672ef70f36f19635cb793661",
    "name": "Dahn Al Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10064",
    "price": 380,
    "smell": ["Woody", "Earthy", "Spicy", "Leathery", "Manly", "Bergamote", "Smooky", "Strong", "Amber", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "specification": "male",
    "description": "কিছু সুগন্ধি আপনার স্মৃতিকে রোমন্থনের আলোড়নে নস্টালজিক করে দেয়। ঔউদের মিষ্টতা যারা পছন্দ করেন তাদের জন্য খুশবুওয়ালার নতুন স্পেশাল কালেকশন আমাদের এই দেহনাল উদ। হিন্দি ওউদের সচরাচর স্পাইসি নোটগুলা ড্রাই-ডাউনে একদম মিষ্টতায় পরিপূর্ণ করে একদম বিগিনার থেকে প্রো লেভেলের ইউজারদের জন্য ব্যবহার উপযোগী সুগন্ধিতে পরিনত করা হয়েছে আমদের এই উদটিকে।\n\n\nসময়ের পরিবর্তনে অনুধাবন করেবেন উদের পর্যায়ক্রমিক স্তরবিন্যাস এবং মিষ্টতায় পরিপূর্ণ চুড়ান্ত পরিণতি। সুগন্ধির ভালবাসা ও অনুভূতি বিনিময় চান তো আমরাও প্রস্তুত আপনাদের ভালবাসা বিনিময় করতে।",
    "notes": "Top Notes: Bergamot, Labdanum, Cloves\nMiddle Notes: Rose Damascena, Jasmine, Ylang-Ylang\nBase Notes: Patchouli, Agarwood (Oud), Mysore Sandalwood, Benzoin, Musk",
    "stock": "25 ml",
    "measurement": "ml",
    "origin": "Saudi Arabia",
    "brand": "Surrati",
    "supplier": "Sumon",
    "primaryImage": "https://i.ibb.co.com/SB2Qyq6/Dahn-Al-Oud.png",
    "secondaryImage": "https://i.ibb.co.com/SB2Qyq6/Dahn-Al-Oud.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 380,
      "6 ml": 720,
      "12 ml": 1380,
      "25 ml": 2580,
      "100 ml": 3500
    },
    "isFeatured": "no"
  },
  {
    "_id": "672ef9bc36f19635cb793662",
    "name": "Jadore Al Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10065",
    "price": 220,
    "smell": ["Woody", "Floral", "Vanilla", "Bergamote", "Spicy", "Strong", "Musky", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "description": "উদ বিগিনারদের জন্য খুব ইফেক্টিভ একটি আত্তারের নাম জাদোর আল উদ।\n\nকমবেশি সব উদেরই একটি আলাদা গাম্ভীর্যপূর্ণ ভাব থাকে। যেটা উদ আত্তারগুলোকে আরবীয় আভিজাত্য দান করে। জাদোর আল উদ এই অবস্থানে অনড়। এই উদে থাকছে খুব কমন উডি নোটস। আতর লাগানোর পর এরাবিয়ান অনুভূতিতে ভাসানোর জন্য টপ নোটসের এই উডি ফ্লেভারটিই সবচেয়ে বেশি কাজে দেয়।\n\nতবে আরেকটি স্পেশাল কিছু এখানে বিল্ড ইন করা আছে সম্ভবত, যার দরুণ জাদোর আল উদ জাদুর ঘ্রাণে রূপ নেয়। আপনি হয়তো অবাক হবেন, কিছু মনোমুগ্ধকর সুবাস/খুশবু আপনার আশেপাশে এমনভাবে ছড়াতে থাকবে, যেন কোনো মৌমাছি মৌ মৌ করছে আপনার চারিদিকে। বিমোহিত হওয়ার জন্য এরপর আর কিইবা বাকী থাকে! এই এইধরণের সুবাস আসে একটি ফ্লোরাল ও চকোলেটি/ভ্যানিলার ঘ্রাণের মিশ্রণ থেকে। খুবই সফট, মাইল্ড, আর্থি ঘ্রাণ। আবার কাঠুরে(উডি) ঘ্রাণের সাথে মিশ্রিত হয়ে এ এক আজীব সঞ্জিবনী সুবাস লাভ করে, যা আবাল-বৃদ্ধ-বনিতা সকলকের স্নায়ু ইন্দ্রিয়কেই সুখ অনুভূতি দিতে সক্ষম।\n\nএটার স্মেল স্নিফ করে এক প্রফেসর সাহেবের মন্তব্য, সৌদি আরবে আবু বকর (রা.) কমপ্লেক্সের পাশে একটি বিল্ডিংয়ের পুরোটা জুড়ে এরকম আভিজাত্যপূর্ণ ঘ্রাণেই ভরা ছিল। একদম এরাবিয়ান ধাঁচের!",
    "notes": "Top Notes: Citruses, Honeyed Dates, Cinnamon, and Saffron\nMiddle Notes: Damask Rose, Turkish Rose, Jasmine, and Labdanum\nBase Notes: Agarwood (Oud), Patchouli, Vanilla, Sandalwood, and Musk",
    "stock": "0",
    "measurement": "ml",
    "origin": "Saudi Arabia",
    "brand": "Oudh Al Anfar",
    "supplier": "Sumon",
    "relatedProducts": ["672ef3fb36f19635cb79365e", "672ef53336f19635cb79365f", "672ef5c736f19635cb793660", "672ef70f36f19635cb793661"],
    "primaryImage": "https://i.ibb.co.com/Ns6J0S9/Jadore-Al-Oud.png",
    "secondaryImage": "https://i.ibb.co.com/Ns6J0S9/Jadore-Al-Oud.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 220,
      "6 ml": 420,
      "12 ml": 780,
      "25 ml": 1480,
      "100 ml": 2200
    },
    "isFeatured": "no"
  },
  {
    "_id": "672efaa636f19635cb793663",
    "name": "Kalimat",
    "category": "artificialOud",
    "sku": "KBW-ART-10066",
    "price": 280,
    "smell": ["Earthy", "Woody", "Leathery", "Bergamote", "Spicy", "Smooky", "Strong", "Amber", "Projective", "Longetive", "Synthetic"],
    "description": "নামটি শুনলেই যেমন আধ্যাত্মিক অনুভূতির শিহরন দিয়ে উঠে, ঠিক তেমনি ঘ্রাণেও এর রাজকীয় ভাইব ছড়াতে থাকে। প্রথমেই এর উদের ঠান্ডা মিষ্টি ঘ্রাণের সাথে ফুল ও ফুলের সৌরভ; পরে মাস্কের সাথে হানি ও সুইটের লুকোচুরি; শেষে আগরউদের শক্ত সুবাসের সাথে ভেটিভারের সমন্বয়। যা আপনার শরীর, মন ও চিন্তা-চেতনাকে ছুঁয়ে যেতে সক্ষম। এর অসাধারণ নোটগুলোর লুকোচুরি বলতে বাধ্য করবে যে, এটা তো কালিমাত না, এটা বাজিমাত!!!\n\nমোহনীয় ও মনকাড়া প্রিমিয়াম এই আতরটি আমাদের কাছে পেয়ে যাবেন ৩ মিলি, ৬ মিলি ও ১২ মিলির প্রিমিয়াম বোতলে।",
    "notes": "Top Notes: Blueberry, Anise, Rosemary, and Basil\nMiddle Notes: Cashmere Wood, Amber, Incense\nBase Notes: Vanilla, Honey, Musk, Oud",
    "stock": "40 ml",
    "measurement": "ml",
    "origin": "UAE",
    "brand": "Sattco",
    "supplier": "Sumon",
    "relatedProducts": ["672ef53336f19635cb79365f", "672ef5c736f19635cb793660", "672ef70f36f19635cb793661", "672ef9bc36f19635cb793662"],
    "primaryImage": "https://i.ibb.co.com/tXL4CJZ/Kalimat.png",
    "secondaryImage": "https://i.ibb.co.com/tXL4CJZ/Kalimat.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 280,
      "6 ml": 520,
      "12 ml": 980,
      "25 ml": 1880,
      "100 ml": 2200
    },
    "isFeatured": "no"
  },
  {
    "_id": "672efb7036f19635cb793664",
    "name": "Khalees Al Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10067",
    "price": 280,
    "smell": ["Earthy", "Manly", "Woody", "Bergamote", "Leathery", "Amber", "Strong", "Spicy", "Longetive", "Synthetic"],
    "description": "আমরা অনেকদিন ধরে বেশ কিছু হিন্দি উদ বেসড ব্লেন্ড নিয়ে কাজ করছি। কারণ বিগিনারদের অনেকেই ট্রেডিশনাল পিউর হিন্দি উদের স্মেল সহ্য করতে পারেন না, ক্রাউডেড প্লেসে ইউজ করতে পারে না। আবার পিউর উদের দাম হাতের নাগালে না থাকায় অনেকেই পার্চেজ করতে পারেন না। সবার সুবিধার্থে আমরা হিন্দি উদের আরেকটি ব্লেন্ড নিয়ে এলাম যা বিগিনার এবং ম্যাচিউর সবারই ভালো লাগবে। এই ব্লেন্ডটি খালিস আল-উদ নামে পরিচিত।",
    "notes": "Top Notes: Frankincense, Cumin, Nutmeg\nMiddle Notes: Labdanum, Oud\nBase Notes: Castoreum, Civet, Vanilla, Amber, Cedar, Sandalwood",
    "stock": "20 ml",
    "measurement": "ml",
    "origin": "France",
    "supplier": "Sumon",
    "relatedProducts": ["672ef5c736f19635cb793660", "672ef70f36f19635cb793661", "672ef9bc36f19635cb793662", "672efaa636f19635cb793663"],
    "primaryImage": "https://i.ibb.co.com/SfJNjTp/Khalees.png",
    "secondaryImage": "https://i.ibb.co.com/SfJNjTp/Khalees.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 280,
      "6 ml": 520,
      "12 ml": 980,
      "25 ml": 1880,
      "100 ml": 2200
    },
    "isFeatured": "no"
  },
  {
    "_id": "672efcbd36f19635cb793665",
    "name": "Maleeh Al Oud",
    "category": "artificialOud",
    "sku": "KBW-ART-10068",
    "price": 250,
    "smell": ["Earthy", "Leathery", "Bergamote", "Woody", "Spicy", "Smooky", "Strong", "Amber", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "description": "মাস্কি, উডি, স্মোকি, ফ্লোরাল এসবের কম্বিনেশনে একটি তীব্র পুরুষালী ঘ্রাণ আর্টিফিশিয়াল এই উদে পাওয়া যায়। এর মোহনীয় ঘ্রাণ আপনার চারিদিকে খুবই দ্রুত ছড়িয়ে পরে ও দীর্ঘসময় আপনাকে সুবাস জগতে ডুবিয়ে রাখে।",
    "notes": "Oud & Fresh Spicy Accords",
    "stock": "30 ml",
    "measurement": "ml",
    "origin": "France",
    "supplier": "Ripon",
    "relatedProducts": ["672ef70f36f19635cb793661", "672ef9bc36f19635cb793662", "672efaa636f19635cb793663", "672efb7036f19635cb793664"],
    "primaryImage": "https://i.ibb.co.com/jzXGXTv/Maleeh-Al-Oud.png",
    "secondaryImage": "https://i.ibb.co.com/jzXGXTv/Maleeh-Al-Oud.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 250,
      "6 ml": 480,
      "12 ml": 880,
      "25 ml": 1680,
      "100 ml": 2200
    },
    "isFeatured": "no"
  },
  {
    "_id": "672efdb136f19635cb793666",
    "name": "Oud Al Abiyad",
    "category": "artificialOud",
    "sku": "KBW-ART-10070",
    "price": 350,
    "smell": ["Woody", "Bergamote", "Amber", "Sweet", "Earthy", "Strong", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "description": "আতরটি ব্যবহারের শুরুতে ভ্যানিলার নোটস পাওয়া যায়। এরপর বাতাশের সাথে মিশে হাল্কা হতে থাকে, ঘ্রাণ পরিবর্তিত হতে থাকে। আর মিষ্টি, মাস্কি, সিট্রাস, ফ্লোরাল নোটসের মিশ্রণ রয়েছে যা কিছুক্ষণ পরপর নাকে আসতেই থাকে।\n\nআতরটির ঘ্রাণ কেউ নিলে প্রথম পরিচয়েই আপনি এটার প্রেমের মধ্যে পরে যাবেন।\nলাস্টিং নিয়ে কিছুই বলার নেই, কাপড় ধোয়ার পরেও এর ঘ্রাণ পাওয়া যায়।\nএই আতরটির প্রজেকশন অনেক হাই। তাই ঘ্রাণটা ছড়ায়ও অনেক বেশি!",
    "notes": "Top Notes: Bergamot, Ciste Geranium, and Rose tones\nMiddle Notes: Woody accords, Lily of the Valley, Cedarwood, Lilac, and Sandalwood\nBase Notes: Woody accords, Musk, Mossy tones, and Amber",
    "stock": "30 ml",
    "measurement": "ml",
    "origin": "UAE",
    "brand": "Sattco",
    "supplier": "Ismail",
    "relatedProducts": ["672ef3fb36f19635cb79365e", "672ef53336f19635cb79365f", "672ef9bc36f19635cb793662", "672efaa636f19635cb793663"],
    "primaryImage": "https://i.ibb.co.com/Xk29ySh/Oud-Al-Abiyad.png",
    "secondaryImage": "https://i.ibb.co.com/Xk29ySh/Oud-Al-Abiyad.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 350,
      "6 ml": 650,
      "12 ml": 1180,
      "25 ml": 2280,
      "100 ml": 3500
    },
    "isFeatured": "no"
  },
  {
    "_id": "672efea236f19635cb793667",
    "name": "Oud Al Hind",
    "category": "artificialOud",
    "sku": "KBW-ART-10071",
    "price": 350,
    "smell": ["Smooky", "Woody", "Lavender", "Refreshing", "Earthy", "Manly", "Strong", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "description": "আতরটি ব্যবহারের শুরুতে ভ্যানিলার নোটস পাওয়া যায়। এরপর বাতাশের সাথে মিশে হাল্কা হতে থাকে, ঘ্রাণ পরিবর্তিত হতে থাকে। আর মিষ্টি, মাস্কি, সিট্রাস, ফ্লোরাল নোটসের মিশ্রণ রয়েছে যা কিছুক্ষণ পরপর নাকে আসতেই থাকে।\n\nআতরটির ঘ্রাণ কেউ নিলে প্রথম পরিচয়েই আপনি এটার প্রেমের মধ্যে পরে যাবেন।\nলাস্টিং নিয়ে কিছুই বলার নেই, কাপড় ধোয়ার পরেও এর ঘ্রাণ পাওয়া যায়।\nএই আতরটির প্রজেকশন অনেক হাই। তাই ঘ্রাণটা ছড়ায়ও অনেক বেশি!",
    "notes": "Top Notes: Woody, Dark\nMiddle Notes: Herbal\nBase Notes: Skanky",
    "stock": "30 ml",
    "measurement": "ml",
    "origin": "UAE",
    "brand": "Swiss Arabian",
    "supplier": "Sumon",
    "relatedProducts": ["672ef9bc36f19635cb793662", "672efaa636f19635cb793663", "672efcbd36f19635cb793665", "672efdb136f19635cb793666"],
    "primaryImage": "https://i.ibb.co.com/HBLs9jg/Oud-Al-Hind.png",
    "secondaryImage": "https://i.ibb.co.com/HBLs9jg/Oud-Al-Hind.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 350,
      "6 ml": 650,
      "12 ml": 1180,
      "25 ml": 2280,
      "100 ml": 2500
    },
    "isFeatured": "no"
  },
  {
    "_id": "672eff5036f19635cb793668",
    "name": "Oud Satinmood",
    "category": "artificialOud",
    "sku": "KBW-ART-10072",
    "price": 280,
    "smell": ["Corporate", "Citrusy", "Manly", "Earthy", "Woody", "Spicy", "Lavender", "Musky", "Nostalgic", "Projective", "Longetive", "Synthetic"],
    "description": "উদ সাটিনমুড আর দশটি উদ অয়েল থেকে একেবারেই ভিন্ন। এর স্মেল প্রোফাইল আপনার কর্পোরেট লাইফকে করে তুলবে প্রাণবন্ত।\n\nএতে আছে উডি, রোজ, আর আর্টিফিসিয়াল অ্যাম্বারের নোটস। এটির ব্যবহারে একদম শুরুতে পাচ্ছেন চনমনে একুয়াটিক-রিফ্রেশিং স্মেল। এরপর এর উডি, রোজি স্মেল ধীরে ধীরে এর স্মেল আপনাকে এক অনন্য পার্সোনালিটিতে উদ্ভাসিত করতে থাকে।\n\nউদ সাটিনমুডকে স্পেশালি ইউজ করতে পারেন এর স্ট্রং প্রজেকশনের জন্য। এর ঘ্রাণ নিমিষেই ছড়িয়ে পারবে আপনার আশেপাশে কয়েকফুট দূরত্বে। লঞ্জিভিটি ডে টু নাইট।\n",
    "notes": "\nTop Notes: Violet\nHeart Notes: Laotian oud, Bulgarian rose, Turkish rose\nBase Notes: Vanilla, Amber\n",
    "stock": "15 ml",
    "measurement": "ml",
    "origin": "France",
    "brand": "",
    "supplier": "Zia",
    "relatedProducts": ["672c247e52f0e7ffc1e03118", "672d796d657ffc914fa5ff7b", "672ef3fb36f19635cb79365e", "672efdb136f19635cb793666"],
    "primaryImage": "https://i.ibb.co.com/k0HGmHP/Oud-Satinmood.png",
    "secondaryImage": "https://i.ibb.co.com/k0HGmHP/Oud-Satinmood.png",
    "moreImages": [],
    "variantPrices": {
      "3 ml": 280,
      "6 ml": 520,
      "12 ml": 980,
      "25 ml": 1880,
      "100 ml": 2500
    },
    "isFeatured": "no"
  },
]

// Mock review data
const mockReviews: Review[] = [
  {
    id: "r1",
    image: "/placeholder.svg?height=256&width=256",
    facebookLink: "https://www.facebook.com/bengalians",
    instagramLink: "https://www.instagram.com/bengalians",
  },
  {
    id: "r2",
    image: "/placeholder.svg?height=256&width=256",
    facebookLink: "https://www.facebook.com/bengalians",
    instagramLink: "https://www.instagram.com/bengalians",
  },
  {
    id: "r3",
    image: "/placeholder.svg?height=256&width=256",
    facebookLink: "https://www.facebook.com/bengalians",
    instagramLink: "https://www.instagram.com/bengalians",
  },
  {
    id: "r4",
    image: "/placeholder.svg?height=256&width=256",
    facebookLink: "https://www.facebook.com/bengalians",
    instagramLink: "https://www.instagram.com/bengalians",
  },
]

// Util to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .trim()
    .replace(/\s+/g, '-');    // Replace spaces with hyphens
}

// Return product by slug
export async function getProductBySlug(slug: string): Promise<(Product & { slug: string }) | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const found = realProducts.find((product) => generateSlug(product.name) === slug);
  return found ? { ...found, slug: generateSlug(found.name) } : undefined;
}

// Return all products (optionally filtered), each with a `slug`
export async function getProducts(category?: string, section?: string): Promise<(Product & { slug: string })[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = realProducts;
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  if (section) {
    filteredProducts = filteredProducts.filter((p) => p.section === section);
  }

  return filteredProducts.map((product) => ({
    ...product,
    slug: generateSlug(product.name),
  }));
}

export async function getReviews(): Promise<Review[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockReviews
}
