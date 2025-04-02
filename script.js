const fonts = ['Caveat', 'Lato', 'Allura', 'Roboto'];
const basePrice = 13.90;
const decoriPrice = 1.90;
const citofonoPrice = 3.99;

let colore = 'oro';
let decori = false;
let fissaggio = 'Biadesivo';
let quantita = 1;
let testo = ['', '', ''];
let font = 'Caveat';
let mostraCitofono = false;
let citofono1 = '';
let citofono2 = '';
let numeroWhatsapp = '';

const anteprimaRef = document.getElementById('anteprima');
const totaleEl = document.getElementById('totale');
const fontLink = document.getElementById('font-link');

function aggiornaFont() {
  fontLink.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
  document.documentElement.style.setProperty('--font-family', `'${font}', sans-serif`);
}

function aggiornaTotale() {
  const totale = (
    basePrice +
    (decori ? decoriPrice : 0) +
    (mostraCitofono ? citofonoPrice : 0)
  ) * quantita;
  totaleEl.textContent = `Totale da pagare: € ${totale.toFixed(2)}`;
}

function aggiornaAnteprima() {
  const sfondo = document.getElementById('targa-sfondo');
  const decoriImg = document.getElementById('decori-img');
  const testoEl = document.getElementById('testo-righe');

  sfondo.src = `https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${colore}.jpg?v=${Date.now()}`;

  if (decori) {
    decoriImg.style.display = 'block';
    decoriImg.src = `https://cdn.shopify.com/s/files/1/0871/1431/8172/files/decori.png?v=${Date.now()}`;
  } else {
    decoriImg.style.display = 'none';
  }

  testoEl.innerHTML = '';
  testo.forEach(riga => {
    const rigaEl = document.createElement('div');
    rigaEl.textContent = riga;
    rigaEl.className = ['Lato', 'Roboto'].includes(font)
      ? 'testo-riga lato-roboto'
      : 'testo-riga default';
    testoEl.appendChild(rigaEl);
  });

  aggiornaTotale();
}

function setupEventListeners() {
  document.querySelectorAll('[data-colore]').forEach(el => {
    el.addEventListener('click', () => {
      colore = el.dataset.colore;
      aggiornaAnteprima();
    });
  });

  document.getElementById('decori-switch').addEventListener('change', (e) => {
    decori = e.target.checked;
    aggiornaAnteprima();
  });

  document.getElementById('fissaggio').addEventListener('change', (e) => {
    fissaggio = e.target.value;
  });

  document.getElementById('quantita').addEventListener('input', (e) => {
    quantita = parseInt(e.target.value) || 1;
    aggiornaTotale();
  });

  document.querySelectorAll('.riga-input').forEach((input, index) => {
    input.addEventListener('input', (e) => {
      testo[index] = e.target.value;
      aggiornaAnteprima();
    });
  });

  document.getElementById('font').addEventListener('change', (e) => {
    font = e.target.value;
    aggiornaFont();
    aggiornaAnteprima();
  });

  document.getElementById('toggle-citofono').addEventListener('click', () => {
    mostraCitofono = !mostraCitofono;
    document.getElementById('citofono-fields').style.display = mostraCitofono ? 'block' : 'none';
    aggiornaAnteprima();
  });

  document.getElementById('citofono1').addEventListener('input', (e) => {
    citofono1 = e.target.value;
    document.getElementById('anteprima-citofono1').textContent = citofono1;
  });

  document.getElementById('citofono2').addEventListener('input', (e) => {
    citofono2 = e.target.value;
    document.getElementById('anteprima-citofono2').textContent = citofono2;
  });

  document.getElementById('numeroWhatsapp').addEventListener('input', (e) => {
    numeroWhatsapp = e.target.value;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  aggiornaFont();
  aggiornaAnteprima();
  setupEventListeners();
});
