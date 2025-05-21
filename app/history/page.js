'use client';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer";
import HistoryGrid from "@/components/grid/History";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { use, useEffect } from "react";

export default function History() {
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
      <HistoryGrid />
      <Footer />
    </div>
  );
}
