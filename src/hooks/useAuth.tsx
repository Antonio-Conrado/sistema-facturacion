import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("AuthContext debe usarse dentro de un AuthProvider.");
  }
  return context
}

