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
  colors: { id: string; name: string; color: string; image: string }[];
  images: string[];
  offers: string[];
  taxInfo?: string;
}

// Simulated product data fetch (replace with API call)
export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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
      images: [
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
      colors: [
        {
          id: "blue-401",
          name: "Blue-401",
          color: "#4682B4",
          image: "https://via.placeholder.com/300x400?text=Blue+Gift+Set",
        },
        {
          id: "pink-402",
          name: "Pink-402",
          color: "#FF69B4",
          image: "https://via.placeholder.com/300x400?text=Pink+Gift+Set",
        },
        {
          id: "orange-403",
          name: "Orange-403",
          color: "#FFA500",
          image: "https://via.placeholder.com/300x400?text=Orange+Gift+Set",
        },
        {
          id: "purple-404",
          name: "Purple-404",
          color: "#800080",
          image: "https://via.placeholder.com/300x400?text=Purple+Gift+Set",
        },
        {
          id: "yellow-405",
          name: "Yellow-405",
          color: "#FFFF00",
          image: "https://via.placeholder.com/300x400?text=Yellow+Gift+Set",
        },
        {
          id: "green-406",
          name: "Green-406",
          color: "#32CD32",
          image: "https://via.placeholder.com/300x400?text=Green+Gift+Set",
        },
        {
          id: "white-407",
          name: "White-407",
          color: "#FFFFFF",
          image: "https://via.placeholder.com/300x400?text=White+Gift+Set",
        },
        {
          id: "red-408",
          name: "Red-408",
          color: "#FF0000",
          image: "https://via.placeholder.com/300x400?text=Red+Gift+Set",
        },
      ],
      offers: [
        "Extra ₹100 OFF on orders ₹750+",
        "Extra ₹150 OFF on orders ₹1200+",
        "Extra ₹250 OFF on orders ₹1600+",
        "Offers will be applied at checkout",
      ],
      taxInfo: "Inclusive of all taxes",
    },
  ];

  useEffect(() => {
    async function loadProduct() {
      if (productId) {
        const fetchedProduct = products.find((p) => p.id === productId);
        setProduct(products[0]);
        setMainImage(products[0]?.images[0] || "");
        setSelectedColor(products[0]?.colors[0]?.id || "");
      }
    }
    loadProduct();
  }, [productId]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product?.images.length!);
    setMainImage(product?.images[currentImageIndex + 1] || product?.images[0]!);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.images.length! - 1 : prev - 1
    );
    setMainImage(
      product?.images[currentImageIndex - 1] ||
        product?.images[product?.images.length! - 1]!
    );
  };

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const accordionItems = [
    {
      title: "Details",
      content:
        "Free shipping on orders above ₹799. Delivery within 3-5 business days.",
    },
    {
      title: "How To Use",
      content: "Use during your bath routine for a luxurious experience.",
    },
    {
      title: "Ingredients",
      content: "Natural extracts, essential oils, and moisturizing agents.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-500 mb-4">
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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400?text=${product.name}`;
              }}
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
          <div className="mt-4">
            <ProductThumbnails
              thumbnails={product.thumbnails}
              onThumbnailClick={handleThumbnailClick}
              mainImage={mainImage}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              (
              {product.reviews === 0
                ? "No reviews"
                : `${product.reviews} reviews`}
              )
            </span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-semibold text-gray-800">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="text-sm text-pink-500">{product.discount}</span>
            )}
            <span className="text-xs text-gray-500">{product.taxInfo}</span>
          </div>

          {/* Points Earned */}
          <div className="flex items-center mb-4">
            <FaTrophy className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">
              Earn {product.pointsEarned} points on this purchase.{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </span>
          </div>

          {/* Shade Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Shade: {product.colors.find((c) => c.id === selectedColor)?.name}
            </h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color.id
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.color }}
                />
              ))}
            </div>
          </div>

          {/* Available Offers */}
          <details className="mb-4 border border-gray-200 rounded p-2">
            <summary className="text-sm font-medium text-gray-600">
              Available Offers
            </summary>
            <div className="text-sm text-gray-600 mt-2">
              {product.offers.map((offer, index) => (
                <p
                  key={index}
                  className={index === 3 ? "text-xs text-gray-500 mt-1" : ""}
                >
                  {offer}
                </p>
              ))}
            </div>
          </details>

          {/* Quantity Selector and Add to Bag Button */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-2 py-1 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button className="w-full bg-black text-white py-2 rounded text-sm font-semibold uppercase hover:bg-gray-800">
              ADD TO BAG
            </button>
          </div>

          {/* Product Information */}
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="mb-2">
              <strong>SKU:</strong> {product.sku}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Tags:</strong> {product.tags.join(", ")}
            </p>
          </div>

          {/* Back Button */}
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => router.back()}
          >
            Back to Products
          </button>
        </div>
      </div>

      {/* Accordion Component */}
      <div className="mt-4">
        <Accordion items={accordionItems} />
      </div>

      <NewArrivalsCarousel />
    </main>
  );
}
