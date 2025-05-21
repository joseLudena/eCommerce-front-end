import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

const AppProviders = ({ children }) => {
   return (
      <AuthProvider>
         <CartProvider>
            {children}
         </CartProvider>
      </AuthProvider>
   );
};


export default AppProviders;