const fonts = ['Caveat', 'Lato', 'Allura', 'Roboto'];
const basePrice = 13.90;
const decoriPrice = 1.90;
const citofonoPrice = 3.99;

let colore = 'oro';
let decori = false;
let font = 'Caveat';
let fissaggio = 'Biadesivo';
let quantita = 1;
let testo = ['', '', ''];
let mostraCitofono = false;
let citofono1 = '';
let citofono2 = '';
let numeroWhatsapp = '';

const app = document.getElementById('app');

function render() {
  app.innerHTML = `
    <div class="card">
      <img src="https://cdn.shopify.com/s/files/1/0871/1431/8172/files/LOGO_LO_REALIZZO-Photoroom.png?v=1732901706" class="logo" />
      <h2>Personalizza la tua targa</h2>

      <label class="label">Colore:</label>
      <div class="color-choice">
        ${['oro', 'argento'].map(c => `
          <div class="${colore === c ? 'selected' : ''}" onclick="setColore('${c}')">
            <img src="https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${c}.jpg?v=${Date.now()}" />
          </div>
        `).join('')}
      </div>

      <label class="label">Testo (max 3 righe):</label>
      ${[0, 1, 2].map(i => `
        <input type="text" maxlength="32" placeholder="Riga ${i + 1}" value="${testo[i]}" oninput="updateTesto(${i}, this.value)" />
      `).join('')}

      <label class="label">Font:</label>
      <select onchange="setFont(this.value)">
        ${fonts.map(f => `<option value="${f}" ${font === f ? 'selected' : ''}>${f}</option>`).join('')}
      </select>

      <label class="label"><input type="checkbox" ${decori ? 'checked' : ''} onchange="toggleDecori()" /> Aggiungi decori (+1,90 €)</label>

      <label class="label">Tipo di fissaggio:</label>
      <select onchange="setFissaggio(this.value)">
        <option ${fissaggio === 'Biadesivo' ? 'selected' : ''}>Biadesivo</option>
        <option ${fissaggio === 'Con fori e biadesivo' ? 'selected' : ''}>Con fori e biadesivo</option>
      </select>

      <label class="label">Quantità:</label>
      <input type="number" min="1" value="${quantita}" onchange="setQuantita(this.value)" />

      <div style="margin-top:1rem">
        <h3>Targhetta per il citofono (facoltativo)</h3>
        <p style="font-size: 0.85rem">Scegli se acquistare anche una targhetta per il citofono. È autoadeiva e misura <strong>L 5,5×1,5 cm</strong>. Il colore sarà uguale a quello scelto per la targa fuori porta.</p>
        <button onclick="toggleCitofono()" class="add">${mostraCitofono ? 'Rimuovi targhetta citofono' : 'Aggiungi una targhetta per il citofono (+3,99 €)'}</button>

        ${mostraCitofono ? `
          <input type="text" maxlength="36" placeholder="Riga 1 - Citofono" value="${citofono1}" oninput="citofono1 = this.value; render()" />
          <input type="text" maxlength="30" placeholder="Riga 2 - Citofono" value="${citofono2}" oninput="citofono2 = this.value; render()" />
          <div class="${colore === 'oro' ? 'bg-yellow-200' : 'bg-gray-200'}" style="text-align:center;margin-top:0.5rem;padding:0.3rem;border:1px solid #ccc;border-radius:8px">
            <div style="font-family:Arial; text-transform:uppercase">${citofono1}<br>${citofono2}</div>
          </div>
        ` : ''}
      </div>

      <label class="label">Fornisci un numero WhatsApp (facoltativo):</label>
      <input type="tel" value="${numeroWhatsapp}" placeholder="Es. +39 345 1234567" oninput="numeroWhatsapp = this.value" />

      <div class="preview-container" id="anteprima">
        <div style="position: relative;">
          <img src="https://cdn.shopify.com/s/files/1/0871/1431/8172/files/${colore}.jpg?v=${Date.now()}" class="preview-image" />
          ${decori ? `<img src="https://cdn.shopify.com/s/files/1/0871/1431/8172/files/decori.png?v=${Date.now()}" class="preview-image" style="position:absolute;top:0;left:0;" />` : ''}
          <div class="preview-text font-${font.replace(/\s+/g, '')}">
            ${testo.map(r => `<div>${r}</div>`).join('')}
          </div>
        </div>
        <div class="note">Nota: I nostri grafici controlleranno e centreranno al meglio il testo dopo l’ordine.</div>
      </div>

      <div class="text-center" style="margin-top:1rem;font-size:1.2rem;font-weight:bold">
        Totale da pagare: € ${((basePrice + (decori ? decoriPrice : 0) + (mostraCitofono ? citofonoPrice : 0)) * quantita).toFixed(2)}
      </div>

      <div class="buttons">
        <button class="download" onclick="scaricaAnteprima()">Scarica anteprima</button>
        <button class="add">Aggiungi al carrello</button>
      </div>
    </div>
  `;
}

function setColore(c) { colore = c; render(); }
function toggleDecori() { decori = !decori; render(); }
function setFont(f) { font = f; render(); }
function setFissaggio(f) { fissaggio = f; render(); }
function setQuantita(q) { quantita = parseInt(q) || 1; render(); }
function updateTesto(i, val) { testo[i] = val; render(); }
function toggleCitofono() { mostraCitofono = !mostraCitofono; render(); }

function scaricaAnteprima() {
  const anteprima = document.getElementById('anteprima');
  html2canvas(anteprima).then(canvas => {
    const link = document.createElement('a');
    link.download = 'anteprima-targa.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

render();
