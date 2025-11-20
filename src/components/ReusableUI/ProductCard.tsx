'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import type { IProductResponse } from "@/types/product.types"

interface ProductCardProps {
  product: IProductResponse
  className?: string
  onQuickView?: () => void
}

const formatPrice = (price: number) => `৳${price.toLocaleString("en-BD")}`

export function ProductCard({ product, className, onQuickView }: ProductCardProps) {
  const cart = useCart()
  const wishlist = useWishlist()
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const productId = (product as any).id || (product as any)._id
  const slug = (product as any).slug || product.name.toLowerCase().replace(/\s+/g, "-")
  const link = `/product/${slug}`

  const isWishlisted = wishlist?.isInWishlist?.(productId) || false
  const inStock = (product as any).stock > 0 || (product as any).inStock !== false

  // Extract sizes & colors
  const sizes = Array.from(
    new Set(
      product.variants
        ?.map((v: any) => v.size)
        .filter(Boolean)
        .slice(0, 6) || []
    )
  )

  const colors = Array.from(
    new Set(
      product.variants
        ?.map((v: any) => v.color)
        .filter(Boolean)
        .slice(0, 5) || []
    )
  )

  const price = product.minPrice || (product as any).price || 0
  const comparePrice = (product as any).compareAtPrice || (product as any).originalPrice
  const hasDiscount = comparePrice && comparePrice > price
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) wishlist?.removeFromWishlist?.(productId)
    else wishlist?.addToWishlist?.(product)
  }

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inStock || isAdding) return

    setIsAdding(true)
    const defaultVariant = product.variants?.[0] || {}
    const size = defaultVariant.size || sizes[0] || "M"
    const color = defaultVariant.color || colors[0]

    try {
      cart?.addToCart?.(product, 1, size, price, color)
    } finally {
      setTimeout(() => setIsAdding(false), 600)
    }
  }

  return (
    <div className="group relative">
      <Link href={link} className="block">
        <Card
          className={cn(
            "overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1",
            !inStock && "opacity-70",
            className
          )}
        >
          {/* Image Section */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <Image
              src={imageError ? "/placeholder.jpg" : product.primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />

            {/* Hover Image */}
            {product.otherImages?.[0] && !imageError && (
              <Image
                src={product.otherImages[0]}
                alt={`${product.name} - back`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            )}

            {/* Out of Stock */}
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                <span className="text-white font-bold text-lg tracking-widest">SOLD OUT</span>
              </div>
            )}

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 z-20">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discountPercent}%
                </span>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
              className={cn(
                "absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border shadow-md transition-all hover:scale-110",
                isWishlisted && "text-red-600 border-red-300"
              )}
            >
              <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            {/* Quick View & Add to Cart on Hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-10">
              <div className="space-y-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    onQuickView?.()
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-full bg-white/95 hover:bg-white text-black font-medium"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Quick View
                </Button>

                <Button
                  onClick={addToCart}
                  disabled={!inStock || isAdding}
                  className={cn(
                    "w-full font-semibold",
                    inStock
                      ? "bg-black hover:bg-gray-900 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  )}
                >
                  {isAdding ? "Adding..." : inStock ? "Add to Bag" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-gray-900 line-clamp-2 text-center leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-gray-900">{formatPrice(price)}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="flex justify-center gap-1.5">
                {colors.map((color: string) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {colors.length > 5 && (
                  <span className="text-xs text-gray-500 self-center">+{colors.length - 5}</span>
                )}
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="flex justify-center gap-1.5 flex-wrap">
                {sizes.map((size: string) => (
                  <span
                    key={size}
                    className="text-xs px-2.5 py-1 bg-gray-100 rounded-full font-medium text-gray-700"
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  )
}