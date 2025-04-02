// Configurazione
const fonts = ['Caveat', 'Arial', 'Times New Roman'];
let currentColor = 'oro';
let hasDecorations = false;

// Funzioni principali
function cambiaColore(colore) {
  currentColor = colore;
  const anteprima = document.getElementById('anteprima');
  anteprima.className = `targa-container ${colore}`;
  
  // Aggiorna bottoni attivi
  document.querySelectorAll('.color-options button').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === colore);
  });
}

function salvaAnteprima() {
  html2canvas(document.getElementById('anteprima')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'anteprima-targa.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  // Carica html2canvas dinamico
  const script = document.createElement('script');
  script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  document.head.appendChild(script);
});
