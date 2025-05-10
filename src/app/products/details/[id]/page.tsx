"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductThumbnails from "@/components/products/ProductThumbnails";
import { FaStar, FaTrophy } from "react-icons/fa";
import Link from "next/link";
import Accordion from "@/components/products/Accordion";
import NewArrivalsCarousel from "@/components/Carousel/NewArrivalsCarousel";

// Define Product interface for type safety
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  thumbnails: string[];
  description: string;
  rating: number;
  reviews: number;
  originalPrice?: number;
  discount?: string;
  shade?: string;
  shadeImage?: string;
  pointsEarned: number;
  sku: string;
  category: string;
  tags: string[];
}

// Simulated product data fetch (replace with API call)

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const productId = (params.id as string) || searchParams.get("id") || "";

  const products: Product[] = [
    {
      id: "1",
      name: "I Heart Revolution Bath & Body Gift Set Trio – Tropical Caramel & Blossom Bloom",
      price: 1350,
      image:
        "https://hokmakeup.com/cdn/shop/files/81555229535_1.jpg?v=1745309254",
      thumbnails: [
        "https://hokmakeup.com/cdn/shop/files/81555229535_1.jpg?v=1745309254",
        "https://hokmakeup.com/cdn/shop/files/81555229535_2.jpg?v=1745309254",
      ],
      description: "A luxurious bath and body gift set with tropical scents.",
      rating: 0,
      reviews: 0,
      originalPrice: 1500,
      discount: "10% OFF",
      shade: "Blossom Bloom",
      shadeImage: "https://via.placeholder.com/24/FFB6C1/000000?text=B",
      pointsEarned: 1350,
      sku: "SET789",
      category: "Gift Sets",
      tags: ["Bath", "Body", "Tropical"],
    },
  ];

  useEffect(() => {
    async function loadProduct() {
      if (productId) {
        // const fetchedProduct = await fetchProduct(productId);
        setProduct(products?.[0]);
        setMainImage(products?.[0]?.image || "");
      }
    }
    loadProduct();
  }, [productId]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  // Sample accordion items
  const accordionItems = [
    {
      title: "Details",
      content:
        "Free shipping on orders above ₹799. Delivery within 3-5 business days.",
    },
    {
      title: "How To Use",
      content:
        "Returns accepted within 14 days of delivery. Item must be unused and in original packaging.",
    },
    {
      title: "Ingredients",
      content:
        "Store in a cool, dry place. Avoid direct sunlight. Use within 12 months of opening.",
    },
  ];

  return (
    <main className="max-w-[1740px] mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Breadcrumb Navigation */}
      <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:underline">
          {product.category}
        </Link>{" "}
        / <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Product Layout */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {/* Image Section */}
        <div className="w-full sm:w-1/2">
          {/* Mobile Slider */}
          <div className="sm:hidden">
            <ProductThumbnails
              thumbnails={product.thumbnails}
              onThumbnailClick={handleThumbnailClick}
              mainImage={mainImage}
            />
          </div>
          {/* Desktop Layout */}
          <div className="hidden sm:flex sm:flex-row gap-2 sm:gap-4">
            {/* Thumbnails */}
            <div className="sm:w-20 w-full order-1 sm:order-none">
              <ProductThumbnails
                thumbnails={product.thumbnails}
                onThumbnailClick={handleThumbnailClick}
                mainImage={mainImage}
              />
            </div>
            {/* Main Image */}
            <div className="w-full sm:w-auto flex-1">
              {/* Consider using next/image for optimization */}
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/400?text=${product.name}`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
            {product.name}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 sm:w-4 h-3 sm:h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">
              (
              {product.reviews === 0
                ? "No reviews"
                : `${product.reviews} reviews`}
              )
            </span>
          </div>

          {/* Price and Discount */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              ৳ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ৳ {product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="text-xs sm:text-sm text-pink-500">
                {product.discount}
              </span>
            )}
            <span className="text-xs text-gray-500">
              Inclusive of All Taxes
            </span>
          </div>

          {/* Points Earned */}
          <div className="bg-gray-100 p-1 sm:p-2 rounded mb-2 sm:mb-4 flex items-center">
            <FaTrophy className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm text-gray-600">
              Earn {product.pointsEarned} points on this purchase.{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </span>
          </div>

          {/* Shade */}
          {product.shade && (
            <div className="mb-2 sm:mb-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
                Shade: {product.shade}
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div
                  className="w-4 sm:w-6 h-4 sm:h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: "#FFB6C1" }}
                />
                {product.shadeImage && (
                  <img
                    src={product.shadeImage}
                    alt={product.shade}
                    className="w-4 sm:w-6 h-4 sm:h-6"
                  />
                )}
              </div>
            </div>
          )}

          {/* Available Offers */}
          <details className="mb-2 sm:mb-4 border border-gray-200 rounded p-1 sm:p-2">
            <summary className="text-xs sm:text-sm md:text-base font-medium text-gray-600 mt-2 sm:mt-5 mb-2 sm:mb-5">
              Available Offers
            </summary>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
              <p>Welcome Offer: Extra 10% OFF for First-Time Buyers!</p>
              <p>Get a special surprise on orders above ₹799!</p>
              <p>Spend ₹1,499 or more and unlock an even bigger surprise!</p>
              <p className="text-xs text-gray-500 mt-1">
                *Offers will be applied at checkout
              </p>
            </div>
          </details>

          {/* Quantity Selector and Add to Bag Button */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
                Quantity:
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-1 sm:px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-2 sm:px-4 py-1 border border-gray-300 rounded text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-1 sm:px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            <button className="w-full sm:w-[200px] bg-black text-white py-1 sm:py-2 rounded text-xs sm:text-sm font-semibold uppercase hover:bg-gray-800">
              ADD TO BAG
            </button>
          </div>

          {/* Product Information */}
          <div className="text-xs sm:text-sm text-gray-600">
            <p className="mb-1 sm:mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="mb-1 sm:mb-2">
              <strong>SKU:</strong> {product.sku}
            </p>
            <p className="mb-1 sm:mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-1 sm:mb-2">
              <strong>Tags:</strong> {product.tags.join(", ")}
            </p>
          </div>

          {/* Back Button */}
          <button
            className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 hover:underline"
            onClick={() => router.back()}
          >
            Back to Products
          </button>
        </div>
      </div>

      {/* Accordion Component */}
      <div className="mt-2 sm:mt-4">
        <Accordion items={accordionItems} />
      </div>

      <NewArrivalsCarousel />
    </main>
  );
}
