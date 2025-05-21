import Link from "next/link";
import ProductGrid from "./grid/Product";

export default function Hero() {
   return (
      <div>
         <section className="bg-emerald-700 text-white py-10">
            <div className="container mx-auto px-4 text-center">
               <h1 className="text-4xl font-bold mb-4">
                  Bienvenido a NeoShop
               </h1>
               <p className="text-xl mb-8">
                  Descubre nuestros productos de alta calidad
               </p>
               <button className="px-4 py-2 font-medium rounded-lg bg-white text-emerald-600 hover:bg-gray-100">
                  <Link href="/products">
                     Ver Productos
                  </Link>
               </button>
            </div>
         </section>

         <section className="py-16">
            <div className="container mx-auto px-10">
               <h2 className="text-3xl text-emerald-700 font-bold mb-8 text-center">
                  Productos Destacados
               </h2>
               <ProductGrid featured={true} />
            </div>
         </section>
      </div>
   );
}
