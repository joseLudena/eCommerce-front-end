"use client"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"

export default function HistoryGrid() {
  const { purchaseHistory } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8">
        <div className="container mx-auto lg:px-10 px-4">
          <h1 className="text-3xl font-bold mb-8 text-black">Historial De Compras</h1>
          <div className="grid grid-cols-1 text-black gap-6">
            {purchaseHistory.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Tu historial está vacío</h2>
                <p className="text-gray-600">Empieza a comprar ahora mismo!</p>
                <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
                  Volver a la tienda
                </Link>
              </div>
            ) : (
              purchaseHistory.map((order) => {
                const date = order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000)
                  : null

                return (
                  <div key={order.id} className="bg-white rounded-lg shadow p-6 justify-between">
                    <div className="mb-4 text-sm text-gray-500">
                      Compra realizada el{" "}
                      {date
                        ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                        : "Fecha desconocida"}
                    </div>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 border-b last:border-0 flex items-center gap-4"
                      >
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image
                            src={item.product.img}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-gray-600">S/{item.product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
