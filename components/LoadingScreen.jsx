import { useState, useEffect } from "react";

export default function LoadingScreen({ navigateTo }) {
  const naskahCerita = [
    "Laboratorium Riset Blackridge.\n\nDitinggalkan beberapa bulan lalu akibat rumor gelap tentang eksperimen tak manusiawi.\nKau datang untuk membuktikan kebenaran itu.",
    "[ PERINGATAN: PENYUSUP TERDETEKSI ]\n[ PROTOKOL LOCKDOWN DIAKTIFKAN ]\n\nKau kini terjebak. Dan seiring berjalannya waktu... kau sadar kau tidak sendirian di sini.\nAda sesuatu yang ikut terkurung bersamamu dalam kegelapan.",
    "Kumpulkan bukti. Temukan 3 kunci utama. Cari jalan keluar lain.\n\nDan apa pun yang terjadi... Bersembunyilah jika dia mendekat."
  ];

  const [currentSession, setCurrentSession] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isLoadingDone, setIsLoadingDone] = useState(false);

  // useEffect untuk Loading Bar
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIsLoadingDone(true);
          return 100;
        }
        // Ditambah 5-15% setiap 500ms agar loading tidak memakan waktu berabad-abad
        const increment = Math.floor(Math.random() * 10) + 5; 
        return Math.min(prev + increment, 100);
      });
    }, 500);

    // CLEANUP: Hentikan interval jika layar ditutup
    return () => clearInterval(loadingInterval);
  }, []);

  // useEffect untuk Typewriter Effect (Efek Ngetik)
  useEffect(() => {
    let i = 0;
    setTypedText("");
    setIsTypingDone(false);
    
    const textToType = naskahCerita[currentSession];
    
    const typingInterval = setInterval(() => {
      if (i < textToType.length) {
        setTypedText((prev) => prev + textToType.charAt(i));
        i++;
      } else {
        setIsTypingDone(true);
        clearInterval(typingInterval);
      }
    }, 40); // Kecepatan ngetik (40ms per huruf)

    // CLEANUP: Hentikan ngetik jika pindah sesi atau layar ditutup
    return () => clearInterval(typingInterval);
  }, [currentSession]);

  const handleContinue = () => {
    if (currentSession < 2) {
      setCurrentSession((prev) => prev + 1);
    } else {
      // Masuk ke Map 1 (Gameplay)
      alert("Prolog selesai! Saatnya mulai Gameplay!");
      // Sementara kita kembalikan ke Home setelah alert
      navigateTo('home');
    }
  };

  // Logika memunculkan tombol:
  // - Sesi 1 & 2: Muncul kalau ngetik selesai
  // - Sesi 3: Muncul kalau ngetik selesai DAN loading 100%
  const showButton = isTypingDone && (currentSession < 2 || isLoadingDone);

  return (
    <main className="absolute inset-0 w-full h-full z-10 pointer-events-auto font-mono">
      {/* Background & Dark Overlay */}
      <div className="absolute inset-0 bg-[#d9d9d9] -z-20"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10 blur-[2px] scale-105"
        alt="Background Loading"
        src="/assets/background/ChatGPT Image Jun 7, 2026, 06_27_45 PM.png"
      />
      <div className="absolute inset-0 bg-black/70 -z-10"></div> {/* Overlay gelap yang kuat */}

      {/* Kontainer Teks Prolog */}
      <section className="absolute inset-0 flex flex-col items-center pt-[250px] px-[250px] pointer-events-none">
        <p className="text-white text-[32px] leading-[1.8] text-center whitespace-pre-wrap drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] min-h-[250px]">
          {typedText}
        </p>
        
        {/* Tombol Lanjut dengan Animasi Kedip */}
        <button
          onClick={handleContinue}
          className={`mt-[40px] pointer-events-auto bg-transparent border-none text-neutral-400 font-bold text-[28px] cursor-pointer transition-all duration-300 hover:text-white hover:scale-105 animate-kedip ${
            showButton ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          {">"} Klik untuk Melanjutkan {"<"}
        </button>
      </section>

      {/* Kontainer UI Loading Bawah */}
      <section className="absolute bottom-[180px] left-1/2 -translate-x-1/2 w-[800px] flex flex-col items-center gap-5 pointer-events-none">
        <h2 className="text-[32px] font-bold text-white tracking-[5px] m-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {isLoadingDone ? "SYSTEM READY... 100%" : `INITIALIZING SYSTEM... ${progress}%`}
        </h2>
        
        <div className="w-full h-[24px] bg-[#323232]/60 border-2 border-white/40 rounded-full overflow-hidden relative backdrop-blur-sm">
          <div 
            className="h-full bg-white shadow-[0_0_15px_#ffffff] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </section>
    </main>
  );
}