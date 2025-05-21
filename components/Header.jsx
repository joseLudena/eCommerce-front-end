'use client'
import Link from "next/link";
import { Home, ShoppingCart, ShoppingBag, User, LogOut, History } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./modal/Auth";

export default function Header() {
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
   const { user, logout } = useAuth()

   const handleUserIconClick = () => {
      if (user) {
         setIsUserMenuOpen(!isUserMenuOpen)
      } else {
         setIsAuthModalOpen(true)
      }
   }

   const handleLogout = () => {
      logout()
      setIsUserMenuOpen(false)
   }

   return (
      <header className="bg-white shadow-sm">
         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-emerald-700">
               NeoShop
            </Link>
            <div className="flex items-center gap-4">
               <Link href="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Inicio">
                  <Home className="h-5 w-5 text-black" />
               </Link>
               <Link href="/products" className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Tdodos los productos">
                  <ShoppingBag className="h-5 w-5 text-black" />
               </Link>
               {user && (
                  <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Carrito">
                     <ShoppingCart className="h-5 w-5 text-black" />
                  </Link>
               )
               }
               <button onClick={handleUserIconClick} className="p-2 rounded-full hover:bg-gray-100 transition-colors  cursor-pointer ">
                  <User className="h-5 w-5 text-black" />
               </button>

               {isUserMenuOpen && user && (
                  <div
                     className="absolute border right-2 top-16 w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fadeIn"
                  >
                     <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-600">{user.name || user.email}</p>
                     </div>
                     <Link href="/history" className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        Historial
                     </Link>
                     <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                     >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                     </button>
                  </div>
               )}
            </div>
         </div>

         <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </header>
   );
}