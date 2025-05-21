import ProductGrid from "./grid/Product";

export default function HeroListProduct() {
   return (
      <div>
         <section className="py-16">
            <div className="container mx-auto px-10">
               <h2 className="text-3xl text-emerald-700 font-bold mb-8 text-center">
                  Productos Disponibles
               </h2>
               <ProductGrid />
            </div>
         </section>
      </div>
   );
}
