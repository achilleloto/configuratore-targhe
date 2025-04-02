document.getElementById('app').innerHTML = `
  <div class="space-y-4">
    <h1 class="text-2xl font-bold text-center">Configuratore Targa</h1>
    
    <!-- Sezione Colore -->
    <div>
      <h2 class="font-semibold mb-2">Colore:</h2>
      <div class="flex gap-4">
        <button class="border p-2 rounded-lg">
          <img src="https://cdn.shopify.com/.../oro.jpg" class="w-20 h-auto">
        </button>
        <button class="border p-2 rounded-lg">
          <img src="https://cdn.shopify.com/.../argento.jpg" class="w-20 h-auto">
        </button>
      </div>
    </div>

    <!-- Pulsante -->
    <button onclick="addToCart()" class="w-full bg-blue-500 text-white py-2 rounded">
      Aggiungi al Carrello (€13.90)
    </button>
  </div>
`;

function addToCart() {
  alert("Funzionalità carrello in sviluppo!");
}
