document.getElementById("app").innerHTML = `
  <h2 style="text-align:center;">Personalizza la tua targa</h2>
  <img src="https://cdn.shopify.com/s/files/1/0871/1431/8172/files/LOGO_LO_REALIZZO-Photoroom.png?v=1732901706" alt="Logo" style="width:80px;margin:auto;display:block;" />
  <label>Colore targa</label>
  <select id="colore">
    <option value="oro">Oro</option>
    <option value="argento">Argento</option>
  </select>

  <label>Font</label>
  <select id="font">
    <option value="Caveat">Caveat</option>
    <option value="Lato">Lato</option>
    <option value="Allura">Allura</option>
    <option value="Roboto">Roboto</option>
  </select>

  <label>Testo riga 1</label>
  <input type="text" id="riga1" maxlength="32" />
  <label>Testo riga 2</label>
  <input type="text" id="riga2" maxlength="32" />
  <label>Testo riga 3</label>
  <input type="text" id="riga3" maxlength="32" />

  <label>Fissaggio</label>
  <select id="fissaggio">
    <option>Biadesivo</option>
    <option>Con fori e biadesivo</option>
  </select>

  <label>Quantità</label>
  <input type="number" id="quantita" value="1" min="1" />

  <label>
    <input type="checkbox" id="decori" /> Aggiungi decori (+1,90 €)
  </label>

  <label>
    <input type="checkbox" id="citofonoToggle" /> Aggiungi una targhetta per il citofono (+3,99 €)
  </label>

  <div id="citofonoBox" style="display:none;">
    <label>Riga 1 Citofono</label>
    <input type="text" id="citofono1" maxlength="30" />
    <label>Riga 2 Citofono</label>
    <input type="text" id="citofono2" maxlength="30" />
  </div>

  <label>Numero WhatsApp</label>
  <input type="tel" id="numeroWhatsapp" placeholder="+39..." />

  <label>Note per il venditore</label>
  <textarea id="note" rows="3"></textarea>

  <div id="anteprima" style="margin-top:24px; border:1px solid #ccc; padding:20px; text-align:center;">
    <div id="targa" style="background-color:#eee; padding:20px; font-size:24px;"></div>
  </div>

  <button onclick="aggiornaAnteprima()">Aggiorna anteprima</button>
  <button onclick="scaricaAnteprima()">Scarica anteprima</button>
  <div style="text-align:center; font-weight:bold; font-size:20px; margin-top:20px;" id="totale">Totale: € 13.90</div>
`;

document.getElementById("citofonoToggle").addEventListener("change", (e) => {
  document.getElementById("citofonoBox").style.display = e.target.checked ? "block" : "none";
});

function aggiornaAnteprima() {
  const colore = document.getElementById("colore").value;
  const font = document.getElementById("font").value;
  const r1 = document.getElementById("riga1").value;
  const r2 = document.getElementById("riga2").value;
  const r3 = document.getElementById("riga3").value;
  const decori = document.getElementById("decori").checked;
  const citofono = document.getElementById("citofonoToggle").checked;
  const quantita = parseInt(document.getElementById("quantita").value);

  const base = 13.90;
  const d = decori ? 1.90 : 0;
  const c = citofono ? 3.99 : 0;
  const totale = ((base + d + c) * quantita).toFixed(2);
  document.getElementById("totale").innerText = "Totale: € " + totale;

  const targaDiv = document.getElementById("targa");
  targaDiv.innerHTML = `<div style="font-family:${font};">${r1}<br/>${r2}<br/>${r3}</div>`;
}

function scaricaAnteprima() {
  html2canvas(document.getElementById("anteprima")).then(canvas => {
    const link = document.createElement("a");
    link.download = "anteprima-targa.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
