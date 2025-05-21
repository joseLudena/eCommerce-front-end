"use client"
import { useState, useEffect } from "react"
import ProductCard from "../card/Product"
import { getProducts } from "@/api/ecommerce-api"

export default function ProductGrid({ featured = false }) {
   const [displayProducts, setDisplayProducts] = useState([])

   const getFeaturedProducts = async () => {
      try {
         const response = await getProducts();
         const displayProducts = featured ? response.slice(0, 4) : response
         setDisplayProducts(displayProducts);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getFeaturedProducts();
   }, []);

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
         ))}
      </div>
   )
}
