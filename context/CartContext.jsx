"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const { user } = useAuth();

  const saveCartToFirestore = async (newCart) => {
    if (!user) return;
    try {
      await setDoc(doc(db, "carts", user.uid), { items: newCart });
    } catch (error) {
      console.error("Error al guardar el carrito:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { product, quantity: 1 }];
      }
      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      deleteDoc(doc(db, "carts", user.uid)).catch((error) => {
        console.error("Error al limpiar:", error);
      });
    } else {
      localStorage.removeItem("cart");
    }
  };

  const loadHistory = async () => {
    if (user) {
      try {
        const snapshot = await getDocs(collection(db, "history", user.uid, "orders"));
        const historyData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPurchaseHistory(historyData);
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    }
  };


  const completePurchase = async () => {
    if (!user || cart.length === 0) return;

    try {
      const historyRef = collection(db, "history", user.uid, "orders");
      await addDoc(historyRef, {
        items: cart,
        createdAt: serverTimestamp(),
      });
      clearCart();
      await loadHistory();
    } catch (error) {
      console.error("Error al guardar el historial:", error);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartDoc = await getDoc(doc(db, "carts", user.uid));
          if (cartDoc.exists()) {
            setCart(cartDoc.data().items || []);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error al cargar el carrito:", error);
        }
      } else {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };


    loadCart();
    loadHistory();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        purchaseHistory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        completePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
