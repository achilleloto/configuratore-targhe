// script.js
// Configurazione
const PREZZI = {
  base: 13.90,
  decori: 1.90,
  citofono: 3.99
};

const FONTS = {
  Caveat: 'text-4xl md:text-6xl',
  Lato: 'text-3xl md:text-5xl',
  Allura: 'text-4xl md:text-6xl',
  Roboto: 'text-3xl md:text-5xl'
};

// Stato applicazione
const state = {
  colore: 'oro',
  testo: ['', '', ''],
  font: 'Caveat',
  decori: false,
  fissaggio: 'Biadesivo',
  quantita: 1,
  mostraCitofono: false,
  citofono: ['', ''],
  numeroWhatsapp: '',
  note: ''
};

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  // Carica immagini
  precacheImages();

  // Imposta event listeners
  setupEventListeners();

  // Aggiorna UI iniziale
  updateUI();
});

function precacheImages() {
  const images = [
    'https://cdn.shopify.com/s/files/1/0871/1431/8172/files/oro.jpg',
    'https://cdn.shopify.com/s/files/1/0871/1431/8172/files/argento.jpg',
    'https://cdn.shopify.com/s/files/1/0871/1431/8172/files/decori.png'
  ];

  images.forEach(url => {
    new Image().src = url;
  });
}

function setupEventListeners() {
  // Colore
  document.querySelectorAll('.color-option').forEach(el => {
    el.addEventListener('click', (e) => {
      const colore = e.currentTarget.classList.contains('oro') ? 'oro' : 'argento';
      cambiaColore(colore);
    });
  });

  // Testo
  document.querySelectorAll('.text-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const line = parseInt(e.target.dataset.line);
      state.testo[line] = e.target.value;
      updateTextPreview();
    });
  });

  // Font
  document.querySelector('.font-selector').addEventListener('change', (e) => {
    state.font = e.target.value;
    updateTextPreview();
  });

  // Decori
  document.querySelector('.decor-checkbox').addEventListener('change', (e) => {
    state.decori = e.target.checked;
    document.querySelector('.decor-image').style.display = state.decori ? 'block' : 'none';
    updatePrice();
  });

  // Fissaggio
  document.querySelector('.mounting-selector').addEventListener('change', (e) => {
    state.fissaggio = e.target.value;
  });

  // Quantità
  document.querySelector('.quantity-input').addEventListener('input', (e) => {
    state.quantita = Math.max(1, parseInt(e.target.value) || 1;
    updatePrice();
  });

  // Citofono
  document.querySelector('.toggle-citofono').addEventListener('click', () => {
    state.mostraCitofono = !state.mostraCitofono;
    const fields = document.querySelector('.citofono-fields');
    fields.style.display = state.mostraCitofono ? 'block' : 'none';
    updatePrice();
  });

  document.querySelectorAll('.citofono-input').forEach((input, i) => {
    input.addEventListener('input', (e) => {
      state.citofono[i] = e.target.value;
      updateCitofonoPreview();
    });
  });

  // WhatsApp
  document.querySelector('.whatsapp-input').addEventListener('input', (e) => {
    state.numeroWhatsapp = e.target.value;
  });

  // Note
  document.querySelector('.notes-input').addEventListener('input', (e) => {
    state.note = e.target.value;
  });

  // Download
  document.querySelector('.download-btn').addEventListener('click', savePreview);
}

// Funzioni principali
function cambiaColore(colore) {
  state.colore = colore;
  
  // Aggiorna UI
  document.querySelectorAll('.color-option').forEach(el => {
    el.classList.toggle('active', el.classList.contains(colore));
  });
  
  // Aggiorna anteprima principale
  document.querySelector('.targa-image').src = 
    `https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${colore}.jpg?v=1732901706`;
  
  // Aggiorna anteprima citofono
  const citofonoPreview = document.querySelector('.citofono-preview');
  citofonoPreview.classList.remove('oro', 'argento');
  citofonoPreview.classList.add(colore);
}

function updateTextPreview() {
  const container = document.querySelector('.text-preview');
  container.className = `text-preview ${state.font}`;
  
  // Aggiorna testo
  state.testo.forEach((text, i) => {
    container.children[i].textContent = text || `Riga ${i+1}`;
  });
  
  // Aggiorna dimensione font
  container.querySelectorAll('.text-line').forEach(line => {
    line.className = FONTS[state.font].includes('text-3xl') ? 
      'text-line text-lg md:text-xl' : 
      'text-line text-xl md:text-2xl';
  });
}

function updateCitofonoPreview() {
  const preview = document.querySelector('.citofono-preview');
  preview.innerHTML = `
    <div>${state.citofono[0]}</div>
    <div>${state.citofono[1]}</div>
  `;
}

function updatePrice() {
  let totale = PREZZI.base;
  if (state.decori) totale += PREZZI.decori;
  if (state.mostraCitofono) totale += PREZZI.citofono;
  totale *= state.quantita;
  
  document.querySelector('.total-price span').textContent = totale.toFixed(2);
}

function savePreview() {
  html2canvas(document.querySelector('#anteprima')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'anteprima-targa.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

function updateUI() {
  updateTextPreview();
  updatePrice();
}
