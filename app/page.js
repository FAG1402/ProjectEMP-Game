"use client";

import { useState, useEffect } from "react";
import HomeScreen from "../components/HomeScreen";
import CreditsScreen from "../components/CreditsScreen";
import SettingsScreen from "../components/SettingsScreen";
import LoadingScreen from "../components/LoadingScreen";

export default function GameContainer() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [scale, setScale] = useState(1);

  // ENGINE AUTO-SCALER (Versi React)
  useEffect(() => {
    const handleResize = () => {
      const lebarLayar = window.innerWidth;
      const tinggiLayar = window.innerHeight;
      
      const skalaLebar = lebarLayar / 1920;
      const skalaTinggi = tinggiLayar / 1080;
      // Mengambil skala terkecil agar tidak terpotong (fit to screen)
      const skalaFinal = Math.min(skalaLebar, skalaTinggi);
      
      setScale(skalaFinal);
    };

    // Jalankan sekali saat komponen di-mount
    handleResize();

    // Dengarkan perubahan ukuran layar (resize)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateTo = (screenId) => {
    console.log(`[DEBUG] Berpindah ke layar: ${screenId}`);
    setActiveScreen(screenId);
  };

  return (
    // Wadah terluar memakan seluruh layar browser
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      
      {/* Wadah Game: Di-lock ke 1920x1080, lalu di-scale pakai CSS Transform */}
      <div 
        className="relative bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden origin-center transition-transform duration-75"
        style={{ 
          width: '1920px', 
          height: '1080px', 
          transform: `scale(${scale})` 
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