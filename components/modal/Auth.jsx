"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function AuthModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const { loginWithGoogle } = useAuth()

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      onClose()
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Acceder
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-emerald-800 my-8">
            NeoShop
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Inicia sesión o regístrate para acceder a todas las funciones de la tienda
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continuar con Google
          </button>
        </div>

        <div className="p-4 bg-gray-50 border-t text-center text-sm text-gray-600">
          Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
        </div>
      </div>
    </div>
  )
}
