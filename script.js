// CONFIGURAZIONE
const SHOPIFY_PRODUCT_ID = 14752947831132;
const BASE_PRICE = 13.90;

// ELEMENTI PRINCIPALI
const app = document.getElementById('app');

// RENDER CONFIGURATORE
function render() {
  app.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- TESTATA -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">Configuratore Targa</h1>
      </div>

      <!-- SEZIONE COLORE -->
      <div class="mb-6">
        <h2 class="font-semibold mb-2">Colore:</h2>
        <div class="flex gap-4">
          ${['oro', 'argento'].map(colore => `
            <div class="border rounded-lg p-2 cursor-pointer">
              <img src="https://cdn.shopify.com/.../${colore}.jpg" 
                   class="w-24 h-auto">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ANTEPRIMA DINAMICA -->
      <div class="bg-gray-100 p-4 rounded-lg mb-6">
        <div id="anteprima" class="relative h-64">
          <!-- Qui verrà renderizzata l'anteprima -->
        </div>
      </div>

      <!-- PULSANTI -->
      <button id="addToCart" class="w-full bg-blue-500 text-white py-2 rounded">
        Aggiungi al Carrello (€${BASE_PRICE})
      </button>
    </div>
  `;

  // AGGIUNGI INTERAZIONI
  document.getElementById('addToCart').addEventListener('click', addToCart);
}

// FUNZIONE CARRELLO
function addToCart() {
  const itemData = {
    id: SHOPIFY_PRODUCT_ID,
    quantity: 1,
    properties: {
      // Aggiungi qui i dati della personalizzazione
    }
  };

  window.parent.postMessage({
    type: 'SHOPIFY_ADD_TO_CART',
    data: itemData
  }, '*');
}

// AVVIA APP
render();
