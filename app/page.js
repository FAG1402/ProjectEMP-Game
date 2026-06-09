"use client";

import { useState, useEffect } from "react";
import HomeScreen from "../components/HomeScreen";
import CreditsScreen from "../components/CreditsScreen";
import SettingsScreen from "../components/SettingsScreen";
import LoadingScreen from "../components/LoadingScreen";

export default function GameContainer() {
  const [activeScreen, setActiveScreen] = useState("home");
  
  // State untuk menyimpan skala dan posisi X, Y
  const [transformData, setTransformData] = useState({ scale: 1, x: 0, y: 0 });

  // ENGINE AUTO-SCALER (Sama persis dengan logika script.js asli milikmu)
  useEffect(() => {
    const handleResize = () => {
      const lebarLayar = window.innerWidth;
      const tinggiLayar = window.innerHeight;
      
      const skalaLebar = lebarLayar / 1920;
      const skalaTinggi = tinggiLayar / 1080;
      const skalaFinal = Math.min(skalaLebar, skalaTinggi);

      // Menghitung sisa ruang kosong untuk menempatkan game tepat di tengah
      const posisiX = (lebarLayar - (1920 * skalaFinal)) / 2;
      const posisiY = (tinggiLayar - (1080 * skalaFinal)) / 2;

      setTransformData({
        scale: skalaFinal,
        x: posisiX,
        y: posisiY
      });
    };

    // Eksekusi saat layar pertama kali dimuat
    handleResize();

    // Dengarkan perubahan ukuran layar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateTo = (screenId) => {
    console.log(`[DEBUG] Berpindah ke layar: ${screenId}`);
    setActiveScreen(screenId);
  };

  return (
    // Wadah terluar dengan overflow-hidden mutlak
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      
      {/* Wadah Game: Ukuran dipaku di 1920x1080, posisi origin dari pojok kiri atas (0 0) */}
      <div 
        className="absolute top-0 left-0 origin-top-left transition-transform duration-75"
        style={{ 
          width: '1920px', 
          height: '1080px', 
          transform: `translate(${transformData.x}px, ${transformData.y}px) scale(${transformData.scale})` 
        }}
      >
        
        {activeScreen === "home" && <HomeScreen navigateTo={navigateTo} />}
        {activeScreen === "credits" && <CreditsScreen navigateTo={navigateTo} />}
        {activeScreen === "settings" && <SettingsScreen navigateTo={navigateTo} />}
        {activeScreen === "loading" && <LoadingScreen navigateTo={navigateTo} />}
        
        {/* ==========================================
           5. LAYAR ACHIEVEMENT (PLACEHOLDER)
           ========================================== */}
        {activeScreen === "achievement" && (
          <div className="absolute inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center gap-4 z-10 font-mono">
            <h1 className="text-4xl font-bold tracking-wider">LAYAR ACHIEVEMENT</h1>
            <p className="text-neutral-400">Komponen AchievementScreen belum dibuat.</p>
            <button 
              type="button"
              className="px-6 py-2 bg-blue-600 rounded font-bold transition-all hover:bg-blue-700 hover:scale-105 cursor-pointer" 
              onClick={() => navigateTo("home")}
            >
              Kembali ke Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}