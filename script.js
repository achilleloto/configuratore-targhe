// Prezzi base
const PREZZO_BASE = 13.90;
const PREZZO_DECORAZIONI = 1.90;
const PREZZO_CITOFONO = 3.99;

// Stato configurazione
let config = {
  colore: 'oro',
  testo: '',
  font: "'Caveat', cursive",
  decorazioni: false,
  citofono: false,
  testoCitofono: ['', '']
};

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  aggiornaAnteprima();
  calcolaPrezzo();
});

// Funzioni principali
function cambiaColore(colore) {
  config.colore = colore;
  document.getElementById('targa-preview').style.backgroundImage = 
    `url('https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${colore}.jpg')`;
}

function aggiornaAnteprima() {
  config.testo = document.getElementById('testo-targa').value;
  document.getElementById('anteprima-testo').textContent = config.testo;
}

function cambiaFont(font) {
  config.font = font;
  document.getElementById('anteprima-testo').style.fontFamily = font;
}

function toggleDecorazioni() {
  config.decorazioni = !config.decorazioni;
  const targa = document.getElementById('targa-preview');
  targa.style.backgroundImage = config.decorazioni 
    ? `url('https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${config.colore}_decorato.jpg')`
    : `url('https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${config.colore}.jpg')`;
  calcolaPrezzo();
}

function toggleCitofono() {
  config.citofono = !config.citofono;
  document.getElementById('campo-citofono').classList.toggle('hidden');
  calcolaPrezzo();
}

function aggiornaCitofono() {
  config.testoCitofono = [
    document.getElementById('citofono-linea1').value,
    document.getElementById('citofono-linea2').value
  ];
  document.getElementById('anteprima-citofono-linea1').textContent = config.testoCitofono[0];
  document.getElementById('anteprima-citofono-linea2').textContent = config.testoCitofono[1];
}

function calcolaPrezzo() {
  let totale = PREZZO_BASE;
  if (config.decorazioni) totale += PREZZO_DECORAZIONI;
  if (config.citofono) totale += PREZZO_CITOFONO;
  document.getElementById('prezzo-totale').textContent = totale.toFixed(2);
}

function aggiungiAlCarrello() {
  // Preparazione dati per Shopify
  const itemData = {
    id: 14752947831132, // Sostituisci con il tuo product ID
    quantity: 1,
    properties: {
      'Colore': config.colore,
      'Testo': config.testo,
      'Font': document.getElementById('select-font').options[document.getElementById('select-font').selectedIndex].text,
      'Decorazioni': config.decorazioni ? 'Sì' : 'No',
      'Citofono': config.citofono ? 'Sì' : 'No',
      'Testo Citofono Linea 1': config.testoCitofono[0],
      'Testo Citofono Linea 2': config.testoCitofono[1],
      'Prezzo Totale': document.getElementById('prezzo-totale').textContent + '€'
    }
  };

  // Integrazione con Shopify (sostituisci con il tuo effettivo codice)
  console.log('Dati per Shopify:', itemData);
  alert(`Configurazione aggiunta al carrello!\nTotale: ${document.getElementById('prezzo-totale').textContent}€`);
  
  // Per l'integrazione reale con Shopify, usa:
  // window.parent.postMessage({ type: 'SHOPIFY_ADD_TO_CART', data: itemData }, '*');
}
