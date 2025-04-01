// Configurazione Shopify
const SHOPIFY_PRODUCT_ID = 14752947831132;

document.getElementById('app').innerHTML = `
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Configura la tua targa</h1>
    <input type="text" placeholder="Testo" class="border p-2 w-full mb-2">
    <button onclick="addToShopifyCart()" class="bg-blue-500 text-white p-2 w-full">
      Aggiungi al carrello (Shopify)
    </button>
  </div>
`;

function addToShopifyCart() {
  const itemData = {
    id: SHOPIFY_PRODUCT_ID,
    quantity: 1,
    properties: {
      testo: document.querySelector('input').value
    }
  };

  // Comunica con Shopify
  window.parent.postMessage({
    type: 'SHOPIFY_ADD_TO_CART',
    data: itemData
  }, '*');
}
