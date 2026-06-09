"use client";

import { useState } from "react";
import HomeScreen from "../components/HomeScreen";
import CreditsScreen from "../components/CreditsScreen";
import SettingsScreen from "../components/SettingsScreen";
import LoadingScreen from "../components/LoadingScreen";

export default function GameContainer() {
  // State utama untuk melacak layar yang sedang aktif saat ini
  const [activeScreen, setActiveScreen] = useState("home");

  // Fungsi navigasi sentral yang aman dan mudah di-debug
  const navigateTo = (screenId) => {
    // Log ini akan muncul di Console Browser (F12) setiap kali layar berpindah
    console.log(`[DEBUG] Berpindah ke layar: ${screenId}`);
    setActiveScreen(screenId);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* ENGINE AUTO-SCALER (Rasio 16:9 / 1920x1080)
        Menggunakan aspect-video agar ukuran game otomatis menyusut/membesar 
        secara natural mengikuti ukuran monitor tanpa merusak posisi tombol Figma.
      */}
      <div className="relative w-full max-w-[1920px] aspect-video bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">
        
        {/* ==========================================
           1. LAYAR UTAMA (HOME SCREEN)
           ========================================== */}
        {activeScreen === "home" && (
          <HomeScreen navigateTo={navigateTo} />
        )}
        
        {/* ==========================================
           2. LAYAR CREDITS (CREDITS SCREEN)
           ========================================== */}
        {activeScreen === "credits" && (
          <CreditsScreen navigateTo={navigateTo} />
        )}

        {/* ==========================================
           3. LAYAR SETTINGS (SETTINGS SCREEN)
           ========================================== */}
        {activeScreen === "settings" && (
          <SettingsScreen navigateTo={navigateTo} />
        )}

        {/* ==========================================
           4. LAYAR LOADING & PROLOGUE
           ========================================== */}
        {activeScreen === "loading" && (
          <LoadingScreen navigateTo={navigateTo} />
        )}

        {/* ==========================================
           5. LAYAR ACHIEVEMENT (PLACEHOLDER)
           ========================================== */}
        {activeScreen === "achievement" && (
          <div className="absolute inset-0 bg-neutral-900 text-white flex flex-col items-center justify-center gap-4 z-10">
            <h1 className="text-4xl font-mono font-bold tracking-wider">LAYAR ACHIEVEMENT</h1>
            <p className="text-neutral-400 font-mono">Komponen AchievementScreen belum di-import.</p>
            <button 
              type="button"
              className="px-6 py-2 bg-blue-600 rounded font-mono font-bold transition-all hover:bg-blue-700 hover:scale-105 cursor-pointer" 
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