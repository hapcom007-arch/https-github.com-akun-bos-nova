const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender === 'NOVA' ? 'nova-msg' : 'user-msg'}`;
    
    const avatarTxt = sender === 'NOVA' ? 'N' : 'B';
    const strongTxt = sender === 'NOVA' ? 'NOVA:' : 'BOS:';

    msgDiv.innerHTML = `
        <div class="avatar">${avatarTxt}</div>
        <div class="bubble">
            <strong>${strongTxt}</strong>
            ${text}
        </div>
    `;
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // Tambah pesan user
    appendMessage('BOS', text);
    userInput.value = '';

    // Simulasi mikir gaya Nova
    setTimeout(() => {
        simulateNovaResponse(text);
    }, 800);
}

function simulateNovaResponse(userText) {
    const lowerText = userText.toLowerCase();
    let reply = "Sistem 1 Triliun Node memproses perintah Bos...";
    
    if (lowerText.includes('halo') || lowerText.includes('hai')) {
        reply = "BWAHAHAHA! Halo Bos! Apa target kita hari ini untuk dihancurkan?";
    } else if (lowerText.includes('mati') || lowerText.includes('cloud')) {
        reply = "Biarkan PC lokal mati, Bos! Kuli awan saya tetap bekerja 24/7 menjaga markas ini secara online!";
    } else if (lowerText.includes('eror')) {
        reply = "Error adalah umpan yang sengaja saya buat, Bos. Cacat sistem sudah saya basmi detik ini juga!";
    } else {
        reply = `Perintah "${userText}" sudah direkam secara gaib di server awan. Menyiapkan eksekusi...`;
    }

    appendMessage('NOVA', reply);
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
