// Configurazione
const config = {
  prezzi: {
    base: 13.90,
    decori: 1.90,
    citofono: 3.99
  }
};

// Stato applicazione
const state = {
  colore: 'oro',
  decori: false,
  testo: ['', '', '']
};

// Funzioni
function cambiaColore(colore) {
  state.colore = colore;
  const anteprima = document.getElementById('anteprima');
  
  // Rimuovi tutte le classi colore
  anteprima.classList.remove('oro', 'argento');
  
  // Aggiungi classe nuova
  anteprima.classList.add(colore);
  
  // Aggiorna bottoni attivi
  document.querySelectorAll('.color-options button').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === colore);
  });
}

function salvaAnteprima() {
  html2canvas(document.getElementById('anteprima')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'anteprima-targa.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  console.log('Configuratore pronto!');
});
