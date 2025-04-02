// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Stato dell'applicazione
  const state = {
    colore: 'oro',
    testo: ['', '', ''],
    font: 'Caveat',
    decori: false,
    mostraCitofono: false,
    citofono1: '',
    citofono2: '',
    numeroWhatsapp: '',
    fissaggio: 'Biadesivo',
    quantita: 1
  };

  // Prezzi
  const prezzi = {
    base: 13.90,
    decori: 1.90,
    citofono: 3.99
  };

  // Elementi DOM
  const elements = {
    anteprima: document.getElementById('anteprima'),
    colorOptions: document.querySelectorAll('.color-option'),
    textInputs: document.querySelectorAll('.text-input'),
    fontSelector: document.querySelector('.font-selector'),
    decorCheckbox: document.querySelector('.decor-checkbox'),
    downloadBtn: document.querySelector('.download-btn'),
    targaImage: document.querySelector('.targa-image'),
    decorImage: document.querySelector('.decor-image'),
    textPreview: document.querySelector('.text-preview')
  };

  // Inizializzazione
  init();

  function init() {
    // Event listeners
    elements.colorOptions.forEach(option => {
      option.addEventListener('click', handleColorChange);
    });

    elements.textInputs.forEach(input => {
      input.addEventListener('input', handleTextChange);
    });

    elements.fontSelector.addEventListener('change', handleFontChange);
    elements.decorCheckbox.addEventListener('change', handleDecorChange);
    elements.downloadBtn.addEventListener('click', handleDownload);

    // Carica lo stato iniziale
    updateUI();
  }

  function handleColorChange(e) {
    const color = e.currentTarget.dataset.color;
    state.colore = color;
    
    // Aggiorna classi attive
    elements.colorOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.color === color);
    });
    
    updateUI();
  }

  function handleTextChange(e) {
    const lineIndex = parseInt(e.target.dataset.line);
    state.testo[lineIndex] = e.target.value;
    updateTextPreview();
  }

  function handleFontChange(e) {
    state.font = e.target.value;
    updateTextPreview();
  }

  function handleDecorChange(e) {
    state.decori = e.target.checked;
    elements.decorImage.style.display = state.decori ? 'block' : 'none';
    updatePrice();
  }

  function handleDownload() {
    html2canvas(elements.anteprima).then(canvas => {
      const link = document.createElement('a');
      link.download = 'anteprima-targa.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  function updateUI() {
    // Aggiorna immagine targa
    elements.targaImage.className = `targa-image ${state.colore}`;
    
    // Aggiorna testo anteprima
    updateTextPreview();
    
    // Aggiorna prezzo
    updatePrice();
  }

  function updateTextPreview() {
    // Aggiorna font
    elements.textPreview.className = `text-preview ${state.font}`;
    
    // Aggiorna testo
    const textLines = elements.textPreview.querySelectorAll('.text-line');
    state.testo.forEach((line, index) => {
      textLines[index].textContent = line || (index === 0 ? 'Esempio testo' : '');
    });
  }

  function updatePrice() {
    // Calcola prezzo totale
    let totale = prezzi.base;
    if (state.decori) totale += prezzi.decori;
    if (state.mostraCitofono) totale += prezzi.citofono;
    totale *= state.quantita;
    
    console.log('Prezzo totale:', totale.toFixed(2));
    // Qui puoi aggiornare l'UI con il prezzo
  }
});
