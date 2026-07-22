const { exec } = require('child_process');

document.addEventListener('DOMContentLoaded', () => {
    const matrix = document.getElementById('matrix');
    const logTerminal = document.getElementById('logTerminal');
    const btnSimulate = document.getElementById('btnSimulate');
    const btnSync = document.getElementById('btnSync');
    
    // Generate 40 Cores
    for (let i = 1; i <= 40; i++) {
        const core = document.createElement('div');
        core.className = 'core';
        core.id = `core-${i}`;
        core.innerText = `C${i.toString().padStart(2, '0')}`;
        matrix.appendChild(core);
    }

    function addLog(message) {
        const time = new Date().toLocaleTimeString();
        logTerminal.innerHTML += `> [${time}] ${message}<br>`;
        logTerminal.scrollTop = logTerminal.scrollHeight;
    }

    btnSimulate.addEventListener('click', () => {
        addLog('Menerima sinyal dari Nova Offline (Watchdog)...');
        addLog('Sistem GitHub Actions memicu MATRIX: 40 mesin Ubuntu...');
        
        btnSimulate.disabled = true;
        btnSimulate.innerText = 'AWAN SEDANG BEKERJA...';

        let coresActivated = 0;
        const interval = setInterval(() => {
            if (coresActivated < 40) {
                coresActivated++;
                const core = document.getElementById(`core-${coresActivated}`);
                core.classList.add('active', 'pulse');
                addLog(`Core ${coresActivated} ONLINE dan memulai scraping...`);
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    addLog('Semua data berhasil diekstrak! Merakit Artifact ZIP...');
                    addLog('Misi Selesai! Mesin kembali tidur.');
                    // Reset animation
                    document.querySelectorAll('.core').forEach(c => c.classList.remove('pulse'));
                    btnSimulate.disabled = false;
                    btnSimulate.innerText = 'SIMULASIKAN SERANGAN LAGI';
                }, 3000);
            }
        }, 100); // nyalakan core secara bertahap cepat
    });

    if (btnSync) {
        btnSync.addEventListener('click', () => {
            addLog('SINKRONISASI DIMULAI: Menghubungi markas awan (GitHub)...');
            btnSync.disabled = true;
            btnSync.innerText = 'MENYEDOT DATA...';

            exec('git pull origin main', (error, stdout, stderr) => {
                if (error) {
                    addLog(`ERROR: Gagal menyedot data. ${error.message}`);
                } else if (stderr && stderr.includes('fatal')) {
                    addLog(`Gagal: ${stderr}`);
                } else {
                    addLog(`[GIT] ${stdout.trim() || stderr.trim()}`);
                    addLog('SINKRONISASI SELESAI: Data offline berhasil diperbarui!');
                }
                
                btnSync.disabled = false;
                btnSync.innerText = 'SINKRONISASI DATA CLOUD (GIT PULL)';
            });
        });
    }

    const btnExecuteCmd = document.getElementById('btnExecuteCmd');
    const cmdInput = document.getElementById('cmdInput');

    if (btnExecuteCmd && cmdInput) {
        btnExecuteCmd.addEventListener('click', () => {
            const cmd = cmdInput.value.trim();
            if (!cmd) return addLog('ERROR: Perintah kosong Jenderal!');

            addLog(`[GHOST PROTOCOL] Menembakkan perintah: ${cmd}`);
            btnExecuteCmd.disabled = true;
            btnExecuteCmd.innerText = 'MENGEKSEKUSI...';

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    addLog(`[ERROR ASTRAL] ${error.message}`);
                } else if (stderr) {
                    addLog(`[PERINGATAN ASTRAL] ${stderr}`);
                }
                
                if (stdout) {
                    // Pecah by newline dan tampilkan 5 baris pertama saja agar terminal tidak kepenuhan
                    const lines = stdout.trim().split('\n');
                    const limit = 5;
                    for (let i = 0; i < Math.min(lines.length, limit); i++) {
                        addLog(`[OUT] ${lines[i]}`);
                    }
                    if (lines.length > limit) {
                        addLog(`[OUT] ... (dan ${lines.length - limit} baris output lainnya disembunyikan)`);
                    }
                }
                
                addLog('EKSEKUSI SELESAI.');
                btnExecuteCmd.disabled = false;
                btnExecuteCmd.innerText = 'EKSEKUSI ASTRAL';
                cmdInput.value = '';
            });
        });

        // Bisa teken Enter di input
        cmdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnExecuteCmd.click();
            }
        });
    }
});
