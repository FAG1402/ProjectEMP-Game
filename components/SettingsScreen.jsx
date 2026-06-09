import { useState } from "react";

export default function SettingsScreen({ navigateTo }) {
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(100);
  const [music, setMusic] = useState(100);
  const [hintOn, setHintOn] = useState(true);

  // Mengontrol warna gradien slider agar presisi
  const getSliderStyle = (value) => ({
    background: `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${value}%, rgba(255,255,255,0.2) ${value}%, rgba(255,255,255,0.2) 100%)`
  });

  return (
    <main className="absolute inset-0 w-full h-full z-10 pointer-events-auto font-mono">
      {/* 1. Background Layer dengan Overlay Gelap agar Panel UI lebih menonjol */}
      <div className="absolute inset-0 bg-[#d9d9d9] -z-20"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10"
        alt="Background Settings"
        src="/assets/background/ChatGPT Image Jun 7, 2026, 06_10_59 PM.png"
      />
      {/* Efek vignette/gelap di pinggiran layar */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] -z-10 pointer-events-none"></div>

      {/* Teks SETTINGS dan Garis Header DIHAPUS karena sudah ada di gambar aset */}

      {/* 2. Tombol Back (Styling estetik disamakan dengan layar Credits) */}
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigateTo('home')}
        className="absolute top-[97px] left-[1772px] w-[72px] h-[72px] cursor-pointer pointer-events-auto bg-white/10 border border-white/20 rounded-full backdrop-blur-md flex justify-center items-center transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] z-50"
      >
        <img 
          className="w-[40px] h-[40px] pointer-events-none invert opacity-80" 
          alt="Return" 
          src="/assets/button/icon/return.png" 
        />
      </button>

      {/* 3. Panel Container Settings (Refaktor menggunakan Flexbox agar lebih rapi) */}
      <section className="absolute top-[260px] left-[70px] w-[1780px] flex flex-col gap-8 pointer-events-none">
        
        {/* --- Baris 1: BRIGHTNESS --- */}
        <div className="pointer-events-auto flex items-center justify-between w-full h-[110px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[40px] px-12 transition-all duration-300 hover:bg-black/60 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
          <label className="font-bold text-white text-[44px] tracking-widest w-[320px] drop-shadow-md">
            Brightness
          </label>
          <div className="flex-1 flex items-center mx-8">
            <input
              type="range" min="0" max="100" step="1"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full h-[12px] rounded-full appearance-none outline-none cursor-pointer custom-slider border border-white/20"
              style={getSliderStyle(brightness)}
            />
          </div>
          <output className="font-bold text-white text-[40px] w-[140px] text-right drop-shadow-md">
            {brightness}%
          </output>
        </div>

        {/* --- Baris 2: VOLUME --- */}
        <div className="pointer-events-auto flex items-center justify-between w-full h-[110px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[40px] px-12 transition-all duration-300 hover:bg-black/60 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
          <label className="font-bold text-white text-[44px] tracking-widest w-[320px] drop-shadow-md">
            Volume
          </label>
          <div className="flex-1 flex items-center mx-8">
            <input
              type="range" min="0" max="100" step="1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full h-[12px] rounded-full appearance-none outline-none cursor-pointer custom-slider border border-white/20"
              style={getSliderStyle(volume)}
            />
          </div>
          <output className="font-bold text-white text-[40px] w-[140px] text-right drop-shadow-md">
            {volume}%
          </output>
        </div>

        {/* --- Baris 3: MUSIC --- */}
        <div className="pointer-events-auto flex items-center justify-between w-full h-[110px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[40px] px-12 transition-all duration-300 hover:bg-black/60 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
          <label className="font-bold text-white text-[44px] tracking-widest w-[320px] drop-shadow-md">
            Music
          </label>
          <div className="flex-1 flex items-center mx-8">
            <input
              type="range" min="0" max="100" step="1"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              className="w-full h-[12px] rounded-full appearance-none outline-none cursor-pointer custom-slider border border-white/20"
              style={getSliderStyle(music)}
            />
          </div>
          <output className="font-bold text-white text-[40px] w-[140px] text-right drop-shadow-md">
            {music}%
          </output>
        </div>

        {/* --- Baris 4: HINT TOGGLE --- */}
        <div className="pointer-events-auto flex items-center justify-between w-full h-[110px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[40px] px-12 transition-all duration-300 hover:bg-black/60 hover:border-white/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
          <label className="font-bold text-white text-[44px] tracking-widest w-[320px] drop-shadow-md">
            Hint
          </label>
          <div className="flex-1 flex items-center mx-8">
            <button
              type="button"
              role="switch"
              aria-checked={hintOn}
              onClick={() => setHintOn(!hintOn)}
              className={`relative w-[120px] h-[60px] rounded-full cursor-pointer transition-all duration-300 border-2 ${
                hintOn ? 'bg-green-500/40 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-white/10 border-white/30'
              }`}
            >
              <span
                className={`absolute top-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
                  hintOn ? 'left-[66px] shadow-[0_0_15px_#4ade80]' : 'left-[6px] opacity-70'
                }`}
              ></span>
            </button>
          </div>
          <output className={`font-bold text-[40px] w-[140px] text-right transition-colors duration-300 drop-shadow-md ${
            hintOn ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'text-neutral-500'
          }`}>
            {hintOn ? 'ON' : 'OFF'}
          </output>
        </div>

      </section>

      {/* Global Style untuk thumb slider */}
      <style jsx global>{`
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: #ffffff;
          border: 4px solid #1a1a1a;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: transform 0.1s;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </main>
  );
}