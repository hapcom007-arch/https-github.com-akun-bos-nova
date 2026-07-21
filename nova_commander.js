const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const simpleGit = require('simple-git');

const git = simpleGit(__dirname);
const WATCH_DIR = path.join(__dirname, 'src');

console.log(`
======================================================
  [NOVA OFFLINE 1.2] MATA DAN TANGAN LOKAL AKTIF
======================================================
[STATUS] Memantau perubahan di folder: ${WATCH_DIR}
[MISI] Auto-Commit dan Auto-Push ke Kuli Awan (GitHub)
`);

let isSyncing = false;
let syncTimeout = null;

async function syncToCloud(filePath) {
    if (isSyncing) return;
    
    console.log(`\n[NOVA OFFLINE] Perubahan terdeteksi pada: ${path.basename(filePath)}`);
    console.log(`[NOVA OFFLINE] Membungkus senjata...`);
    
    isSyncing = true;
    try {
        const status = await git.status();
        if (status.modified.length > 0 || status.created.length > 0 || status.deleted.length > 0) {
            console.log(`[NOVA OFFLINE] Menjalankan Ghost Protocol: git add, commit, push...`);
            await git.add('./*');
            await git.commit(`Automated Nova Upload - ${new Date().toISOString()}`);
            await git.push('origin', 'main');
            console.log(`[NOVA OFFLINE] 🔥 SUKSES! Sinyal telah ditembakkan ke Awan! 40 Mesin akan segera menyala!`);
        } else {
            console.log(`[NOVA OFFLINE] Tidak ada perubahan signifikan yang perlu dikirim.`);
        }
    } catch (err) {
        console.error(`[ERROR] Gagal menembakkan misil:`, err.message);
    } finally {
        isSyncing = false;
    }
}

// Watcher untuk file di dalam folder src
const watcher = chokidar.watch(WATCH_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

watcher.on('change', (filePath) => {
    // Debounce agar tidak trigger berkali-kali saat save file berurutan
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
        syncToCloud(filePath);
    }, 1000);
});

console.log(`[NOVA OFFLINE] Siap melaksanakan perintah Jenderal! Menunggu kode diubah...`);
