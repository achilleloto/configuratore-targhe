const colori = document.querySelectorAll('.color-options img');
const targaSfondo = document.getElementById('targaSfondo');
const decoriImg = document.getElementById('decoriImg');
const testoTarga = document.getElementById('testoTarga');
const fontSelect = document.getElementById('fontSelect');
const checkDecori = document.getElementById('addDecori');
const addCitofono = document.getElementById('addCitofono');
const citofonoBox = document.getElementById('citofonoBox');
const prezzoFinale = document.getElementById('prezzoFinale');
const scaricaBtn = document.getElementById('scaricaBtn');

let coloreSelezionato = 'oro';
let basePrice = 13.90;

function aggiornaTarga() {
  targaSfondo.src = `https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${coloreSelezionato}.jpg`;
  testoTarga.style.fontFamily = `'${fontSelect.value}', sans-serif`;

  const righe = [
    document.getElementById('line1').value,
    document.getElementById('line2').value,
    document.getElementById('line3').value
  ].filter(r => r).join('\n');

  testoTarga.textContent = righe;

  decoriImg.style.display = checkDecori.checked ? 'block' : 'none';
  citofonoBox.style.display = addCitofono.checked ? 'block' : 'none';

  let prezzo = basePrice;
  if (checkDecori.checked) prezzo += 1.90;
  if (addCitofono.checked) prezzo += 3.99;
  const q = parseInt(document.getElementById('quantita').value) || 1;
  prezzoFinale.textContent = `Totale da pagare: € ${(prezzo * q).toFixed(2)}`;
}

colori.forEach(img => {
  img.addEventListener('click', () => {
    colori.forEach(i => i.classList.remove('active'));
    img.classList.add('active');
    coloreSelezionato = img.dataset.colore;
    aggiornaTarga();
  });
});

['line1', 'line2', 'line3', 'fontSelect', 'addDecori', 'addCitofono', 'quantita'].forEach(id => {
  document.getElementById(id).addEventListener('input', aggiornaTarga);
});
document.getElementById('fissaggio').addEventListener('change', aggiornaTarga);

scaricaBtn.addEventListener('click', () => {
  html2canvas(document.getElementById('anteprima')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'anteprima-targa.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

aggiornaTarga();
