// ==========================================
// 1. ENGINE AUTO-SCALER (Menyesuaikan Ukuran Layar)
// ==========================================
function sesuaikanUkuranLayar() {
    const container = document.getElementById('game-container');
    if (!container) return; // Mencegah error kalau HTML belum siap

    const lebarLayar = window.innerWidth;
    const tinggiLayar = window.innerHeight;
    
    // Menghitung rasio skala terkecil agar 1920x1080 pas di browser
    const skalaLebar = lebarLayar / 1920;
    const skalaTinggi = tinggiLayar / 1080;
    const skalaFinal = Math.min(skalaLebar, skalaTinggi);

    // Hitung sisa ruang layar kosong untuk memposisikan tepat di tengah (Center)
    const posisiX = (lebarLayar - (1920 * skalaFinal)) / 2;
    const posisiY = (tinggiLayar - (1080 * skalaFinal)) / 2;

    // Terapkan posisi tengah dan skala secara bersamaan
    container.style.transformOrigin = '0 0';
    container.style.transform = `translate(${posisiX}px, ${posisiY}px) scale(${skalaFinal})`;
}

// Eksekusi skala saat web dibuka & ukuran jendela diubah
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
        console.log("Memulai simulasi... Masuk ke Loading Screen");
        mulaiLoading(); // Memicu fungsi animasi loading bar & teks
        return;
    }
    if (action === "settings") {
        bukaLayar('screen-settings');
        return;
    }
    if (action === "credits") {
        console.log("Buka layar credits");
        bukaLayar('screen-credits'); 
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

    // --- ANIMASI LOADING ---
    const intervalAnimasi = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1; 
        if (progress >= 100) {
            progress = 100;
            clearInterval(intervalAnimasi);
            barFill.style.width = '100%';
            textProgress.innerText = `SYSTEM READY... 100%`;
            isLoadingDone = true;
            cekSelesai(); // Panggil fungsi utama di bawah
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
            cekSelesai(); // Panggil fungsi utama di bawah
        }
    }, 60);
}

// FUNGSI UTAMA CEK SELESAI
function cekSelesai() {
    const tombol = document.getElementById('btn-skip-prologue');
    
    // 1. Kalau masih sesi 1 atau 2, tombol muncul asal teks selesai
    if (isTextDone && sesiSaatIni < 2) {
        tombol.classList.remove('hidden');
    } 
    // 2. Kalau sesi terakhir, harus loading 100% DAN teks selesai
    else if (isTextDone && isLoadingDone && sesiSaatIni === 2) {
        tombol.classList.remove('hidden');
    }
}

// Fungsi yang dijalankan saat tombol "Klik untuk Melanjutkan" ditekan
function lanjutCerita() {
    sesiSaatIni++; 
    
    if (sesiSaatIni < naskahCerita.length) {
        ketikNaskah(); // Lanjut ke teks sesi berikutnya
    } else {
        masukMap1(); // Sudah sesi terakhir, lanjut ke Gameplay
    }
}

function masukMap1() {
    alert("Prolog selesai! Saatnya mulai Gameplay!");
    // Nanti ganti ke: bukaLayar('screen-map1');
}