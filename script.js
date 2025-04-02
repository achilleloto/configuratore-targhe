function cambiaColore(colore) {
  document.querySelector('.targa-preview').style.backgroundImage = 
    `url('https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${colore}.jpg')`;
}

function aggiornaAnteprima() {
  const testo = document.getElementById('testo-targa').value;
  document.getElementById('anteprima-testo').textContent = testo;
}

function aggiungiAlCarrello() {
  alert('Prodotto aggiunto al carrello!');
  // Qui aggiungerai la logica Shopify
}
