import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist | Bengalians - Save Your Favorite Perfume Oils",
  description:
    "View and manage your saved perfume oils. Quickly move items to cart or keep them for later. Discover premium attar and perfume oils.",
  keywords: [
    "wishlist",
    "saved items",
    "favorite perfumes",
    "perfume oil wishlist",
    "Bengalians wishlist",
  ],
  openGraph: {
    title: "Wishlist | Bengalians",
    description:
      "Manage your favorite perfume oils and move them to cart when you're ready.",
    type: "website",
    locale: "en_US",
    siteName: "Bengalians",
  },
  twitter: {
    card: "summary",
    title: "Wishlist | Bengalians",
    description:
      "Manage your favorite perfume oils and move them to cart when you're ready.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/wishlist",
  },
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "User Wishlist",
            "itemListOrder": "https://schema.org/ItemListOrderAscending",
          }),
        }}
      />
    </>
  )
}
