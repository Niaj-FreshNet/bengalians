import { Suspense } from "react";
import { Metadata } from "next";
import { NoticeBar } from "@/components/Modules/Shop/NoticeBar";
import { ShopBanner } from "@/components/Modules/Shop/ShopBanner";
import { ShopProducts } from "@/components/Modules/Shop/ShopProducts";
import { initializeStore } from "@/redux/store/ssrStore";
import { productApi } from "@/redux/store/api/product/productApi";
import { IProductResponse } from "@/types/product.types";
import { Skeleton } from "@/components/ui/skeleton";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "New Arrivals - Latest Perfume Oil Collection | Bengalians",
  description:
    "Discover the newest perfume oils from Bengalians. Premium quality, inspired and oriental fragrances — freshly added to our collection!",
  keywords: [
    "new perfume arrivals",
    "latest perfume oil",
    "Bengalians new collection",
    "premium fragrance",
    "attar collection",
    "Bangladesh perfume",
  ].join(", "),
  alternates: {
    canonical: "https://bengalians.com/new-arrivals",
  },
  openGraph: {
    title: "New Arrivals - Latest Perfume Oil Collection | Bengalians",
    description:
      "Explore Bengalians's latest perfume oil arrivals. Authentic, luxurious, and freshly added fragrances.",
    url: "https://bengalians.com/new-arrivals",
    images: [
      {
        url: "/images/n111.webp",
        width: 1920,
        height: 550,
        alt: "Bengalians New Perfume Arrivals",
      },
    ],
    type: "website",
    siteName: "Bengalians",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Perfume Arrivals | Bengalians",
    description:
      "Shop the latest perfume oils freshly added to Bengalians’s premium fragrance collection.",
    images: ["/images/n111.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ✅ Structured Data
const newArrivalStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "New Arrivals - Perfume Oil Collection",
  description:
    "Discover the newest perfume oils and fragrances from Bengalians’s premium collection.",
  url: "https://bengalians.com/new-arrivals",
  mainEntity: {
    "@type": "ItemList",
    name: "New Perfume Oil Products",
    description: "Premium quality new arrival perfume oils and fragrances",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bengalians.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "New Arrivals",
        item: "https://bengalians.com/new-arrivals",
      },
    ],
  },
};

// ✅ Page Component
export default async function NewArrivalsPage() {
  const store = initializeStore();

  // Fetch only new arrival products from API
  const { data } = await store.dispatch(productApi.endpoints.getNewArrivals.initiate(undefined));

  const products: IProductResponse[] = data || [];

  // Static notices reused from Shop page
  const notices = [
    "🚚 Free Nationwide Shipping on Orders Over ৳1000",
    "🔥 Up to 50% Off on Selected Premium Items",
    "✨ Authentic Quality Guaranteed - 100% Original Products",
    "🏪 Visit Our Banasree Outlet for In-Person Experience",
    "💝 Special Gift Wrapping Available for All Orders",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newArrivalStructuredData),
        }}
      />
      <div className="w-full mx-auto">
        {/* ✅ Banner */}
        <ShopBanner
          heading="Get The Latest Perfume Oil Editions"
          text="Choose Your Desired Perfume Oil from Our New Arrivals"
          buttonText="Shop Now"
          link="/shop"
          images={{
            desktop: "/images/n111.png",
            mobile: "/images/n1.webp",
          }}
          altText="Banner displaying the newest perfume oil arrivals"
          variant="premium"
        />

        {/* ✅ Notice Bar */}
        <div className="py-8 bg-gradient-to-r from-gray-50 via-white to-gray-50">
          <NoticeBar
            heading="New Arrival Perfume Oils"
            notices={notices}
            interval={4500}
          />
        </div>

        {/* ✅ Product Section */}
        <div id="products" className="bg-white pt-0 pb-8">
          <Suspense fallback={<ShopProductsSkeleton />}>
            <ShopProducts
              initialProducts={products}
              section="newArrival"
              totalPages={1}
              initialPage={1}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

// ✅ Skeleton Loader
function ShopProductsSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl shadow-sm overflow-hidden"
          >
            <Skeleton className="w-full h-64 rounded-t-xl" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
