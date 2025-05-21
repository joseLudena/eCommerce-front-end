"use client"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CartGrid() {
   const { cart, updateQuantity, removeFromCart, completePurchase } = useCart()

   const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
   }

   return (
      <div className="min-h-screen bg-gray-50">
         <section className="py-8">
            <div className="container mx-auto lg:px-10 px-4">
               <h1 className="text-3xl font-bold mb-8 text-black">Tu Carrito</h1>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
                  <div className="col-span-2 col-span-1">
                     <div className="bg-white rounded-lg shadow p-6">
                        {cart.length === 0 ? (
                           <div className="text-center py-20">
                              <h2 className="text-xl font-bold mb-4">Tu carrito está vacío</h2>
                              <p className="text-gray-600">Agrega productos para comenzar a comprar.</p>
                              <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
                                 Volver a la tienda
                              </Link>
                           </div>
                        ) : (
                           <div>
                              {cart.map((item) => (
                                 <div key={item.product.id} className="py-4 border-b last:border-0 grid grid-cols-3 md:flex md:items-center">
                                    <div className="w-20 h-20 relative flex-shrink-0 md:col-auto col-span-1">
                                       <Image
                                          src={item.product.img}
                                          alt={item.product.name}
                                          fill
                                          className="object-cover rounded"
                                       />
                                    </div>
                                    <div className="ml-4 flex-grow md:col-auto col-span-2">
                                       <h3 className="font-semibold">{item.product.name}</h3>
                                       <p className="text-gray-600">S/{item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center md:col-auto col-span-3 justify-end">
                                       <button
                                          className="w-8 h-8 cursor-pointer flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                       >
                                          -
                                       </button>
                                       <span className="mx-2">{item.quantity}</span>
                                       <button
                                          className="w-8 h-8 cursor-pointer flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                       >
                                          +
                                       </button>
                                       <button
                                          className="ml-2 p-2 cursor-pointer text-red-500 hover:bg-red-50 rounded-full"
                                          onClick={() => removeFromCart(item.product.id)}
                                       >
                                          <Trash2 className="h-5 w-5" />
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="lg:col-span-1 col-span-2">
                     <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                        <div className="space-y-2 mb-4">
                           <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>S/{calculateTotal().toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between">
                              <span>Envío</span>
                              <span>Gratis</span>
                           </div>
                           <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold">
                                 <span>Total</span>
                                 <span>S/{calculateTotal().toFixed(2)}</span>
                              </div>
                           </div>
                        </div>
                        <button
                           onClick={completePurchase}
                           className="w-full py-3 bg-emerald-700 text-white font-medium rounded-md hover:bg-emerald-800 transition-colors cursor-pointer"
                        >
                           Comprar
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
