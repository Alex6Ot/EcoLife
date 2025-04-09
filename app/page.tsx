"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, History, Leaf } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Home() {
  const [puntos, setPuntos] = useState<number>(0);
  const [movimientos, setMovimientos] = useState<string[]>([]);

  // Función para actualizar puntos y movimientos desde localStorage
  const updateData = () => {
    const storedPuntos = localStorage.getItem("puntos");
    if (storedPuntos) {
      setPuntos(parseInt(storedPuntos));
    }

    const storedMovimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");
    setMovimientos(storedMovimientos);
  };

  useEffect(() => {
    // Al cargar la página, actualizamos los datos de localStorage
    updateData();

    // Escuchar cambios en el localStorage cada 1 segundo
    const interval = setInterval(() => {
      updateData();
    }, 1000); // Actualiza cada 1 segundo

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Función para limpiar los datos de localStorage
  const resetData = () => {
    // Limpiar los movimientos
    localStorage.removeItem("movimientos");

    // Resetear el balance a 0
    localStorage.setItem("puntos", "0");

    // Actualizar el estado en React
    setMovimientos([]); // Si estás usando estado para movimientos
    setPuntos(0); // Si estás usando estado para los puntos
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-2">
          <Leaf className="h-8 w-8 text-emerald-600" />
          <span>
            Bienvenido a <span className="text-emerald-600">EcoBits Wallet</span>
          </span>
        </h1>
      </motion.section>

      {/* Balance Card */}
      <motion.div {...fadeInUp}>
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-emerald-600" />
              Tu Balance
            </h2>
            <Button variant="outline" size="sm">
              Ver Detalles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{puntos} ECB</div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-muted-foreground">≈ ${(puntos * 0.2).toFixed(2)} MXN</p>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <History className="h-5 w-5 text-emerald-600" />
            Actividad Reciente
          </h2>
          <Link href="/transactions">
            <Button variant="ghost" size="sm">
              Ver Todo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Card className="p-6 text-center text-muted-foreground glass-card">
          {movimientos.length > 0 ? (
            <ul>
              {movimientos.map((movimiento, index) => (
                <li key={index}>{movimiento}</li>
              ))}
            </ul>
          ) : (
            <p>No hay actividad reciente</p>
          )}
        </Card>
      </motion.section>

      {/* Button to Reset Data */}
      <div className="text-center">
        <Button variant="danger" onClick={resetData}>Limpiar Datos</Button>
      </div>
    </div>
  );
}
