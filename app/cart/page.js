'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import CartGrid from "@/components/grid/Cart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

export default function Cart() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading])

  if (loading || !user) return <Spinner />

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartGrid />
      <Footer />
    </div>
  );
}
