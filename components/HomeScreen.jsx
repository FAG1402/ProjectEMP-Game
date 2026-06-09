export default function HomeScreen({ navigateTo }) {
  return (
    <main className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
      {/* Background & Placeholder */}
      <div className="absolute inset-0 bg-[#d9d9d9] -z-20"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover -z-10" 
        alt="Project EMP background" 
        src="/assets/background/ChatGPT Image Jun 7, 2026, 06_03_52 PM.png" 
      />

      {/* Menu Buttons Container */}
      <section aria-label="Main menu" className="absolute inset-0 pointer-events-none">
        
        {/* Tombol Start */}
        <button 
          type="button" 
          onClick={() => navigateTo('loading')}
          className="absolute flex items-center justify-center cursor-pointer pointer-events-auto bg-[#123456]/60 border-2 border-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-[#1e5082]/85 hover:border-white hover:scale-[1.03]"
          style={{ top: '480px', left: 'calc(50% + 381px)', width: '396px', height: '88px' }}
        >
          <span className="font-mono font-bold text-white text-[48px] text-center">Start</span>
        </button>

        {/* Tombol Settings */}
        <button 
          type="button" 
          onClick={() => navigateTo('settings')}
          className="absolute flex items-center justify-center cursor-pointer pointer-events-auto bg-[#123456]/60 border-2 border-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-[#1e5082]/85 hover:border-white hover:scale-[1.03]"
          style={{ top: '598px', left: 'calc(50% + 381px)', width: '396px', height: '88px' }}
        >
          <span className="font-mono font-bold text-white text-[48px] text-center">Settings</span>
        </button>

        {/* Tombol Credits */}
        <button 
          type="button" 
          onClick={() => navigateTo('credits')}
          className="absolute flex items-center justify-center cursor-pointer pointer-events-auto bg-[#123456]/60 border-2 border-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-[#1e5082]/85 hover:border-white hover:scale-[1.03]"
          style={{ top: '711px', left: 'calc(50% + 381px)', width: '398px', height: '88px' }}
        >
          <span className="font-mono font-bold text-white text-[48px] text-center">Credits</span>
        </button>
      </section>

      {/* Warning Text & Tablet Icon */}
      <p 
        className="absolute font-mono font-bold text-white text-[20px] text-right"
        style={{ right: '183px', bottom: '170px', width: '644px' }}
      >
        if you are using mobile phone, please rotate your phone or turn into Desktop Display for better experience
      </p>
      <img 
        className="absolute" 
        alt="Tablet device icon" 
        src="/assets/phone.png"
        style={{ top: '817px', left: '1737px', width: '124px', height: '124px' }}
      />

      {/* Trophy Button */}
      <button 
        type="button" 
        onClick={() => navigateTo('achievement')}
        className="absolute cursor-pointer pointer-events-auto bg-transparent border-none transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
        style={{ top: '65px', left: '1749px', width: '100px', height: '100px' }}
      >
        <img 
          className="w-full h-full object-cover pointer-events-none" 
          alt="Trophy" 
          src="/assets/button/icon/trophy.png" 
        />
      </button>
    </main>
  );
}