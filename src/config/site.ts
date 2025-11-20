// SEO: Core site configuration for metadata
export const siteConfig = {
  name: "Bengalians",
  url: "https://bengalians.com",
  description:
    "Discover Bengalians's exquisite collection of premium perfumes, oriental attars, and natural fragrances. Authentic quality with fast delivery across Bangladesh.",
  keywords: "perfume, attar, fragrance, Bengalians, oriental perfume, natural attar, Bangladesh perfume",
  authors: [{ name: "Bengalians" }],
  creator: "Bengalians",
  publisher: "Bengalians",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  ogImage: "/images/og-image.jpg", // Default Open Graph image
  twitterImage: "/images/twitter-image.jpg", // Default Twitter image
  verification: {
    google: "your-google-verification-code", // Replace with your actual Google verification code
  },
}
