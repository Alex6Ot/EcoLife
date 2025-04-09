"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanPage() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState(true); // Controla si el escáner está activo

  useEffect(() => {
    if (!scannerActive) return; // Evita iniciar el escáner si ya está inactivo

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        if (!scannerActive) return; // Si ya se desactivó, no hacer nada más

        setQrData(decodedText); // Guarda el QR leído
        setScannerActive(false); // Desactiva el escáner para evitar múltiples lecturas

        // Extraer puntos del código escaneado
        const parts = decodedText.split("Puntos acumulados: ");
        if (parts.length > 1) {
          const puntosString = parts[1].split(" puntos")[0];
          const puntos = parseInt(puntosString.trim());

          if (!isNaN(puntos)) {
            let currentPuntos = parseInt(localStorage.getItem("puntos") || "0") || 0;
            currentPuntos += puntos;

            localStorage.setItem("puntos", currentPuntos.toString());

            let movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");
            movimientos.push(`Deposito: ${puntos} puntos`);
            localStorage.setItem("movimientos", JSON.stringify(movimientos));
          }
        }

        // Detener el escáner después de leer el código
        scanner.clear().catch(() => {});
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );

    return () => {
      scanner.clear().catch(() => {}); // Limpiar escáner al desmontar
    };
  }, [scannerActive]); // Se ejecuta cuando scannerActive cambia

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Escanear Código QR</h2>

      {scannerActive ? (
        <div id="qr-reader" className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg" />
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setScannerActive(true)}
        >
          Escanear otro QR
        </button>
      )}

      {qrData && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-lg">
          <p className="font-bold">Código escaneado:</p>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
}
