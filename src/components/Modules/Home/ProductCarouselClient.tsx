'use client'

import React, { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SectionTitle } from "./SectionTitle"
import { ProductCard } from "@/components/ReusableUI/ProductCard"
import { ProductQuickView } from "@/components/ReusableUI/ProductQuickView"
import { IProductResponse } from "@/types/product.types"
import Autoplay from "embla-carousel-autoplay"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductCarouselClientProps {
  products: IProductResponse[]
  title: string
  titleVariant?: "default" | "gradient" | "elegant" | "modern" | "premium"
  titleSubtitle?: string
  titleIcon?: React.ReactNode
  titleUnderlineWidth?: string
  titleAnimated?: boolean
  titleShowDecorations?: boolean
  titleUnderlineVariant?: "default" | "wide" | "full"
}

export function ProductCarouselClient({
  products,
  title,
  titleVariant = "default",
  titleSubtitle,
  titleIcon,
  titleUnderlineWidth,
  titleAnimated = true,
  titleShowDecorations = true,
  titleUnderlineVariant = "default",
}: ProductCarouselClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<IProductResponse | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const handleQuickView = (product: IProductResponse) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  return (
    <section className="w-full overflow-hidden bg-transparent py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={title}
          subtitle={titleSubtitle}
          variant={titleVariant}
          icon={titleIcon}
          underlineWidth={titleUnderlineWidth}
          animated={titleAnimated}
          showDecorations={titleShowDecorations}
          underlineVariant={titleUnderlineVariant}
          className="mb-8"
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {products.map((product) => (
              // <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              //   <ProductCard
              //     className="py-0"
              //     key={product.id}
              //     product={product}
              //     // layout={columns === 1 ? "list" : "grid"}
              //     // showDescription={columns === 1}
              //     onQuickView={() => handleQuickView(product)}
              //   />
              // </CarouselItem>
              <CarouselItem
                key={product.id}
                className="pl-3 md:pl-4 
    basis-1/2 
    sm:basis-1/2 
    md:basis-1/3 
    lg:basis-1/4 
    xl:basis-1/4"
              >
                <ProductCard
                  product={product}
                  onQuickView={() => handleQuickView(product)}
                  className="h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows - visible on hover only (desktop) */}
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white" />
          </div>
        </Carousel>
      </div>

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          open={isQuickViewOpen}
          onOpenChange={setIsQuickViewOpen}
        />
      )}
    </section>
  )
}

export function ProductCarouselSkeleton({
  title,
  titleVariant = "default",
  titleSubtitle,
  titleIcon,
  titleUnderlineWidth,
  titleAnimated = true,
  titleShowDecorations = true,
  titleUnderlineVariant = "default",
}: any) {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={title}
          subtitle={titleSubtitle}
          variant={titleVariant}
          icon={titleIcon}
          underlineWidth={titleUnderlineWidth}
          animated={titleAnimated}
          showDecorations={titleShowDecorations}
          underlineVariant={titleUnderlineVariant}
          className="mb-8"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}