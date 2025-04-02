// Stato globale
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

// Prezzi
const PREZZI = {
  base: 13.90,
  decori: 1.90,
  citofono: 3.99
};

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  // Selezionatori DOM
  const dom = {
    colorOptions: document.querySelectorAll('.color-option'),
    textInputs: document.querySelectorAll('.text-input'),
    fontSelector: document.querySelector('.font-selector'),
    decorCheckbox: document.querySelector('.decor-checkbox'),
    mountingSelector: document.querySelector('.mounting-selector'),
    quantityInput: document.querySelector('.quantity-input'),
    intercomToggle: document.querySelector('.toggle-intercom'),
    intercomFields: document.querySelector('.intercom-fields'),
    intercomInputs: document.querySelectorAll('.intercom-input'),
    whatsappInput: document.querySelector('.whatsapp-input'),
    notesInput: document.querySelector('.notes-input'),
    totalPrice: document.querySelector('.total-price span'),
    downloadBtn: document.querySelector('.download-btn')
  };

  // Event listeners
  dom.colorOptions.forEach(opt => opt.addEventListener('click', updateColor));
  dom.textInputs.forEach(input => input.addEventListener('input', updateText));
  dom.fontSelector.addEventListener('change', updateFont);
  dom.decorCheckbox.addEventListener('change', updateDecor);
  dom.mountingSelector.addEventListener('change', updateMounting);
  dom.quantityInput.addEventListener('input', updateQuantity);
  dom.intercomToggle.addEventListener('click', toggleIntercom);
  dom.intercomInputs.forEach(input => input.addEventListener('input', updateIntercom));
  dom.whatsappInput.addEventListener('input', updateWhatsapp);
  dom.notesInput.addEventListener('input', updateNotes);
  dom.downloadBtn.addEventListener('click', savePreview);

  // Inizializza UI
  updateUI();
});

// Funzioni di aggiornamento
function updateColor(e) {
  state.colore = e.currentTarget.dataset.color;
  updateUI();
}

function updateText(e) {
  const line = parseInt(e.target.dataset.line);
  state.testo[line] = e.target.value;
  updateTextPreview();
}

function updateFont(e) {
  state.font = e.target.value;
  document.querySelector('.text-preview').style.fontFamily = state.font;
}

function updateDecor(e) {
  state.decori = e.target.checked;
  document.querySelector('.decor-image').style.display = state.decori ? 'block' : 'none';
  updatePrice();
}

function updateMounting(e) {
  state.fissaggio = e.target.value;
}

function updateQuantity(e) {
  state.quantita = Math.max(1, parseInt(e.target.value) || 1);
  updatePrice();
}

function toggleIntercom() {
  state.mostraCitofono = !state.mostraCitofono;
  const fields = document.querySelector('.intercom-fields');
  const btn = document.querySelector('.toggle-intercom');
  
  fields.style.display = state.mostraCitofono ? 'block' : 'none';
  btn.textContent = state.mostraCitofono ? 
    'Rimuovi targhetta citofono' : 
    'Aggiungi targhetta citofono (+3,99 €)';
  
  updatePrice();
}

function updateIntercom(e) {
  const line = e.target.placeholder.includes('Riga 1') ? 0 : 1;
  state.citofono[line] = e.target.value;
  
  // Aggiorna anteprima citofono
  const preview = document.querySelector('.intercom-preview');
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
    link.download = `anteprima-targa-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// Utility
function updateUI() {
  // Aggiorna colore
  document.querySelectorAll('.color-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.color === state.colore);
  });
  document.querySelector('.targa-image').className = `targa-image ${state.colore}`;
  
  // Aggiorna altri elementi
  updateTextPreview();
  updatePrice();
}

function updateTextPreview() {
  const container = document.querySelector('.text-preview');
  container.style.fontFamily = state.font;
  
  state.testo.forEach((text, i) => {
    container.children[i].textContent = text || `Riga ${i+1}`;
  });
