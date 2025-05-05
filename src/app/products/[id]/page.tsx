'use client';

import CategoryTabs from "@/components/productCommon/CategoryTabs";
import SaleBanner from "@/components/productCommon/SaleBanner";
import LoadMoreButton from "@/components/products/LoadMoreButton";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { useState } from "react";

export default function ProductsPage() {
  const [sortOption, setSortOption] = useState("featured");

  return (
    <main className="max-w-[1450px] mx-auto px-4 py-8">
      {/* Sale Banner */}
      <SaleBanner />

      {/* Category Tabs + Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between  mb-4 gap-4">
        <CategoryTabs />

        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Sort by:</span>
          <select
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Product List Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters on the left */}
        <ProductFilters />

        {/* Product Grid on the right */}
        <div className="flex-1">
          <ProductGrid sortOption={sortOption} />
          <LoadMoreButton />
        </div>
      </div>
    </main>
  );
}
