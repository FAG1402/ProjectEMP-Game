// ==========================================
// 1. ENGINE AUTO-SCALER (Menyesuaikan Ukuran Layar)
// ==========================================
function sesuaikanUkuranLayar() {
    const container = document.getElementById('game-container');
    if (!container) return;

    const lebarLayar = window.innerWidth;
    const tinggiLayar = window.innerHeight;
    
    const skalaLebar = lebarLayar / 1920;
    const skalaTinggi = tinggiLayar / 1080;
    const skalaFinal = Math.min(skalaLebar, skalaTinggi);

    const posisiX = (lebarLayar - (1920 * skalaFinal)) / 2;
    const posisiY = (tinggiLayar - (1080 * skalaFinal)) / 2;

    container.style.transformOrigin = '0 0';
    container.style.transform = `translate(${posisiX}px, ${posisiY}px) scale(${skalaFinal})`;
}

window.addEventListener('resize', sesuaikanUkuranLayar);
window.addEventListener('DOMContentLoaded', sesuaikanUkuranLayar);

// ==========================================
// 2. NAVIGASI LAYAR
// ==========================================
function bukaLayar(idLayarTujuan) {
    let semuaLayar = document.querySelectorAll('.screen');
    
    semuaLayar.forEach(layar => {
        layar.classList.remove('active');
        layar.classList.add('hidden');
    });

    let layarTujuan = document.getElementById(idLayarTujuan);
    if (layarTujuan) {
        layarTujuan.classList.remove('hidden');
        layarTujuan.classList.add('active');
    }
}

function handleMenuAction(action) {
    if (action === "start") {
        mulaiLoading();
        return;
    }
    if (action === "settings") {
        bukaLayar('screen-settings');
        return;
    }
    if (action === "credits") {
        bukaLayar('screen-credits'); 
        return;
    }
    if (action === "achievement") {
        bukaLayar('screen-achievement'); 
        renderAchievements();
        return;
    }
}

// ==========================================
// 3. LOGIKA SLIDER SETTINGS
// ==========================================
const daftarSlider = ['brightness', 'volume', 'music'];

daftarSlider.forEach(id => {
    const slider = document.getElementById(`slider-${id}`);
    const output = document.getElementById(`val-${id}`);
    
    if (slider && output) {
        const updateWarnaSlider = (nilai) => {
            slider.style.background = `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${nilai}%, rgba(255,255,255,0.45) ${nilai}%, rgba(255,255,255,0.45) 100%)`;
        };

        updateWarnaSlider(slider.value);

        slider.addEventListener('input', function() {
            output.innerText = this.value + '%';
            updateWarnaSlider(this.value);
        });
    }
});

// ==========================================
// 4. LOGIKA TOGGLE HINT
// ==========================================
let statusHint = true; 

function toggleHintFigma() {
    statusHint = !statusHint; 
    
    const tombolToggle = document.getElementById('btn-toggle-hint');
    const teksStatus = document.getElementById('hint-status');
    
    if (tombolToggle && teksStatus) {
        if (statusHint) {
            tombolToggle.classList.remove('hint-off');
            tombolToggle.classList.add('hint-on');
            teksStatus.innerText = "ON";
        } else {
            tombolToggle.classList.remove('hint-on');
            tombolToggle.classList.add('hint-off');
            teksStatus.innerText = "OFF";
        }
    }
}

// ==========================================
// 5. LOGIKA LOADING & TYPEWRITER (3 SESI)
// ==========================================
const naskahCerita = [
    "Laboratorium Riset Blackridge.\n\nDitinggalkan beberapa bulan lalu akibat rumor gelap tentang eksperimen tak manusiawi.\nKau datang untuk membuktikan kebenaran itu.",
    "[ PERINGATAN: PENYUSUP TERDETEKSI ]\n[ PROTOKOL LOCKDOWN DIAKTIFKAN ]\n\nKau kini terjebak. Dan seiring berjalannya waktu... kau sadar kau tidak sendirian di sini.\nAda sesuatu yang ikut terkurung bersamamu dalam kegelapan.",
    "Kumpulkan bukti. Temukan 3 kunci utama. Cari jalan keluar lain.\n\nDan apa pun yang terjadi... Bersembunyilah jika dia mendekat."
];

let sesiSaatIni = 0;
let intervalNgetik;
let isLoadingDone = false;
let isTextDone = false;

function mulaiLoading() {
    bukaLayar('screen-loading'); 
    
    let progress = 0;
    sesiSaatIni = 0;
    isLoadingDone = false;
    isTextDone = false;

    const barFill = document.getElementById('loading-fill');
    const textProgress = document.getElementById('loading-text');
    const tombolLanjut = document.getElementById('btn-skip-prologue');
    
    tombolLanjut.setAttribute('onclick', 'lanjutCerita()');
    barFill.style.width = '0%';
    textProgress.innerText = `INITIALIZING SYSTEM... 0%`;
    tombolLanjut.classList.add('hidden');

    const intervalAnimasi = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1; 
        if (progress >= 100) {
            progress = 100;
            clearInterval(intervalAnimasi);
            barFill.style.width = '100%';
            textProgress.innerText = `SYSTEM READY... 100%`;
            isLoadingDone = true;
            cekSelesai(); 
        } else {
            barFill.style.width = progress + '%';
            textProgress.innerText = `INITIALIZING SYSTEM... ${progress}%`;
        }
    }, 1000);

    ketikNaskah();
}

function ketikNaskah() {
    const elemenTeks = document.getElementById('prologue-text');
    const tombolLanjut = document.getElementById('btn-skip-prologue');
    
    elemenTeks.textContent = ""; 
    tombolLanjut.classList.add('hidden'); 
    isTextDone = false;

    let teksSesi = naskahCerita[sesiSaatIni];
    let i = 0;
    
    clearInterval(intervalNgetik);
    intervalNgetik = setInterval(() => {
        if (i < teksSesi.length) {
            elemenTeks.textContent += teksSesi.charAt(i);
            i++;
        } else {
            clearInterval(intervalNgetik);
            isTextDone = true;
            cekSelesai(); 
        }
    }, 60);
}

function cekSelesai() {
    const tombol = document.getElementById('btn-skip-prologue');
    if (isTextDone && sesiSaatIni < 2) {
        tombol.classList.remove('hidden');
    } else if (isTextDone && isLoadingDone && sesiSaatIni === 2) {
        tombol.classList.remove('hidden');
    }
}

function lanjutCerita() {
    sesiSaatIni++; 
    if (sesiSaatIni < naskahCerita.length) {
        ketikNaskah(); 
    } else {
        masukMap1(); 
    }
}

function masukMap1() {
    alert("Prolog selesai! Saatnya mulai Gameplay!");
}

// ==========================================
// 6. LOGIKA ACHIEVEMENT SCREEN
// ==========================================
const dataAchievement = [
    {
        id: "achiev-1",
        isUnlocked: true, // Ubah ke false untuk tes warna pudar
        title: "Math Master",
        desc: "Berhasil memecahkan teka-teki kode matematika tanpa kesalahan.",
        posClass: "pos-card-1",
        panelSrc: "assets/button/click/button_square_flat.png",
        iconSrc: "assets/vector-free-math-vectors-ai.jpg",
        iconClass: "icon-1"
    },
    {
        id: "achiev-2",
        isUnlocked: true,
        title: "Are You Engineer?",
        desc: "Memperbaiki dan meretas panel elektronika utama untuk membuka jalan.",
        posClass: "pos-card-2",
        panelSrc: "assets/button/click/button_square_flat.png", 
        iconSrc: "assets/animated-gear-setting-icon-clipart-illustration-on-white-background-vector.jpg",
        iconClass: "icon-2"
    },
    {
        id: "achiev-3",
        isUnlocked: true,
        title: "A Yo!! Albert Einstein",
        desc: "Menyelesaikan teka-teki teori fisika ruang karantina dengan sempurna.",
        posClass: "pos-card-3",
        panelSrc: "assets/button/click/button_square_flat.png",
        iconSrc: "assets/95b238d965d6b8953fb96dbe3ac3bd5e.jpg",
        iconClass: "icon-3"
    },
    {
        id: "achiev-4",
        isUnlocked: true,
        title: "Nice Catch!",
        desc: "Mengumpulkan seluruh data rahasia Project E.M.P dan bukti eksperimen.",
        posClass: "pos-card-4",
        panelSrc: "assets/button/click/button_square_flat.png",
        iconSrc: "assets/medals/shaded_medal1.png",
        iconClass: "icon-4"
    },
    {
        id: "achiev-5",
        isUnlocked: true,
        title: "Being Part of Them",
        desc: "Tertangkap oleh makhluk eksperimen dan gagal keluar dari fasilitas.",
        posClass: "pos-card-5",
        panelSrc: "assets/button/click/button_square_flat.png",
        iconSrc: "assets/terror.png",
        iconClass: "icon-5"
    },
    {
        id: "achiev-6",
        isUnlocked: true,
        title: "Bye-bye ugly monster",
        desc: "Berhasil keluar dari fasilitas Blackridge hidup-hidup.",
        posClass: "pos-card-6",
        panelSrc: "assets/button/click/button_square_flat.png",
        iconSrc: "assets/emergency-exit-green-sign-isolate-on-white-background-illustration-eps-10-free-vector.jpg",
        iconClass: "icon-6"
    }
];

function renderAchievements() {
    const wadah = document.getElementById('achievement-list');
    if (!wadah) return;

    wadah.innerHTML = ""; 

    dataAchievement.forEach(item => {
        const statusClass = item.isUnlocked ? "" : "locked";
        const judul = item.isUnlocked ? item.title : "Locked";
        const deskripsi = item.isUnlocked ? item.desc : "Selesaikan tantangan untuk membuka ini.";

        const cardHTML = `
            <article class="achievement-card ${item.posClass} ${statusClass}" id="${item.id}">
                <img class="achiev-panel" src="${item.panelSrc}" alt="Panel Background">
                <img class="achiev-icon ${item.iconClass}" src="${item.iconSrc}" alt="Icon">
                <div class="achiev-text">
                    <h2>${judul}</h2>
                    <p>${deskripsi}</p>
                </div>
            </article>
        `;
        
        wadah.innerHTML += cardHTML;
    });
}

// ==========================================
// 8. LOGIKA AUDIO & BGM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm-main');
    const sliderMusic = document.getElementById('slider-music');

    // 1. Fungsi menyalakan BGM pada interaksi pertama pemain (Klik di mana saja)
    function mulaiBGM() {
        if (bgm && bgm.paused) {
            bgm.volume = sliderMusic ? sliderMusic.value / 100 : 1.0; // Sesuaikan volume awal
            bgm.play().catch(error => console.log("Menunggu interaksi pengguna..."));
        }
    }

    // Pasang deteksi klik sekali saja di seluruh dokumen
    document.addEventListener('click', mulaiBGM, { once: true });

    // 2. Sambungkan Slider Music di Menu Settings dengan Volume BGM
    if (sliderMusic) {
        sliderMusic.addEventListener('input', function() {
            if (bgm) {
                // Konversi nilai slider (0-100) menjadi volume HTML audio (0.0 - 1.0)
                bgm.volume = this.value / 100;
            }
        });
    }
});