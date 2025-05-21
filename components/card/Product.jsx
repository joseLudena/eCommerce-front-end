"use client"
import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import AuthModal from "../modal/Auth"

export default function ProductCard({ product }) {
   const [isAdding, setIsAdding] = useState(false)
   const [showModal, setShowModal] = useState(false)

   const { addToCart } = useCart()
   const { user } = useAuth()

   const handleAddToCart = () => {
      if (!user) {
         setShowModal(true)
         return
      }

      setIsAdding(true)
      addToCart(product)
      setTimeout(() => setIsAdding(false), 1500)
   }

   return (
      <>
         <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
            <div className="relative h-48 w-full">
               <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-contain"
               />
            </div>
            <div className="p-4 flex-grow">
               <h3 className="font-semibold text-black text-lg">
                  {product.name}
               </h3>
               <p className="text-gray-600 mt-1">
                  S/{product.price.toFixed(2)}
               </p>
               <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {product.description}
               </p>
            </div>
            <div className="p-4 pt-0">
               <button
                  onClick={handleAddToCart}
                  className={`w-full py-2 px-4 rounded-md flex items-center justify-center font-medium transition-colors cursor-pointer ${isAdding
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-700 text-white hover:bg-emerald-800"
                     }`}
                  disabled={isAdding}
               >
                  {isAdding ? (
                     <>
                        <Check className="mr-2 h-4 w-4" />
                        Añadido
                     </>
                  ) : (
                     <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Añadir al Carrito
                     </>
                  )}
               </button>
            </div>
         </div>

         <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
   )
}
