@echo off
title NOVA OFFLINE COMMANDER 1.2
color 0B

echo ====================================================
echo         PUSAT KOMANDO NOVA - MATA ^& TANGAN LOKAL
echo ====================================================
echo.
echo [!] Membangunkan Kuli Lokal...
echo [!] Memasang sensor pada folder proyek...

cd /d "c:\Users\irwan\Desktop\Nova-Offline-Commander"

if not exist "node_modules" (
    echo [PROSES] Menginstall Otak Pengamat ^(Chokidar ^& Simple-Git^)...
    call npm install
)

if not exist ".git" (
    echo [PROSES] Inisialisasi Jalur Awan...
    git init
    git branch -M main
    
    echo.
    echo ====================================================
    echo [PERHATIAN] JENDERAL, ALAMAT GUDANG AWAN BELUM DISET!
    set /p REPO_URL="Masukkan URL Repository GitHub Bos: "
    
    git remote add origin !REPO_URL!
    echo [SUKSES] Target Awan terkunci ke !REPO_URL!
    echo ====================================================
)

echo [MULAI] Membuka Jendela Dashboard (GUI)...
start npm start

echo [MULAI] Mengaktifkan Mata Pengintai...
node nova_commander.js
pause
