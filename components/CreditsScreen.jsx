export default function CreditsScreen({ navigateTo }) {
  const creditData = {
    title: "Project E.M.P - Development Team",
    leftCol: [
      { role: "Game Director & Lead Programmer", name: "Fhatur Aziz Gustiyana", color: "text-red-400" },
      { role: "Special Thanks to", name: "Resa Pramudita, S.Pd., M.T.", color: "text-yellow-400" },
      { role: "Co-Programmer", name: "Gemini AI", color: "text-cyan-400" },
      { role: "Visual Assets Provider", name: "ChatGPT (DALL-E)", color: "text-cyan-400" },
    ],
    rightCol: [
      { role: "Game Idea", name: "Falatehan Ramadhan Fahmi", color: "text-red-400" },
      { role: "Production Support", name: "Jekki Hatigoran Hutabarat", color: "text-red-400" },
      { role: "General Members", names: ["Januari Putra Mulyono", "M. Calvin Alfarisi"], color: "text-red-400" },
    ],
    bgm: {
      role: "BGM & SFX Sources",
      sources: ["Youtube Audio Library", "Freesound.org"],
      color: "text-orange-400",
    },
  };

  return (
    <main className="absolute inset-0 w-full h-full z-10 pointer-events-auto overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[#d9d9d9] -z-20"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10 scale-105 blur-[2px]"
        alt="Background Credits"
        src="/assets/background/ChatGPT Image Jun 7, 2026, 06_15_05 PM.png"
      />
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigateTo("home")}
        className="absolute top-[97px] left-[1772px] w-[72px] h-[72px] cursor-pointer pointer-events-auto bg-white/10 border border-white/20 rounded-full backdrop-blur-md flex justify-center items-center transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] z-50"
      >
        <img
          className="w-[40px] h-[40px] pointer-events-none invert opacity-80"
          alt="Return"
          src="/assets/button/icon/return.png"
        />
      </button>

      {/* PERUBAHAN DI SINI: Menambahkan overflow-y-auto, pointer-events-auto, dan class custom-scrollbar */}
      <section
        className="absolute top-[200px] left-[300px] w-[1320px] h-[750px] pointer-events-auto flex flex-col animate-fade-in-up overflow-y-auto custom-scrollbar pr-6 pb-12"
        aria-labelledby="credits-title"
      >
        <h1
          id="credits-title"
          className="text-center font-bold text-white text-[64px] tracking-widest m-0 mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] shrink-0"
        >
          {creditData.title}
        </h1>

        <div className="grid grid-cols-2 gap-12 pointer-events-auto shrink-0">
          <div className="flex flex-col gap-8">
            {creditData.leftCol.map((item, index) => (
              <div
                key={index}
                className="bg-black/40 border border-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:border-white/30 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <p className="text-sm text-neutral-400 uppercase tracking-widest mb-1">{item.role}</p>
                <p className={`text-3xl font-bold ${item.color} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              {creditData.rightCol.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:border-white/30 hover:bg-black/60 hover:-translate-y-1"
                >
                  <p className="text-sm text-neutral-400 uppercase tracking-widest mb-1">{item.role}</p>
                  {item.name && <p className={`text-3xl font-bold ${item.color}`}>{item.name}</p>}
                  {item.names &&
                    item.names.map((name, nIndex) => (
                      <p key={nIndex} className={`text-3xl font-bold ${item.color}`}>{name}</p>
                    ))}
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 mt-auto duration-300 hover:border-orange-500/50 hover:bg-white/10">
              <p className="text-sm text-neutral-400 uppercase tracking-widest mb-1">{creditData.bgm.role}</p>
              {creditData.bgm.sources.map((source, sIndex) => (
                <p key={sIndex} className={`text-2xl font-bold ${creditData.bgm.color}`}>{source}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* CUSTOM SCROLLBAR STYLING */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </main>
  );
}