/* ============================================================
   عدّل هنا فقط: كل نصوص الموقع ومعلوماته في هذا الجزء.
   (القيم الحالية أمثلة، استبدلها بمعلومات الفندق الحقيقية)
   ============================================================ */
const CONFIG = {
  name: "Hôtel Islam II",
  city: "Tlemcen Centre-ville, Algérie",
  tagline: "Luxe et ambiance familiale au cœur de Tlemcen. Un séjour inoubliable vous attend, petit déjeuner inclus.",
  about: "L’Hôtel Islam II est situé en centre-ville de Tlemcen et allie luxe et esprit familial. Il propose des chambres et des suites variées, une piscine, un restaurant de cuisine locale et internationale, ainsi qu’une salle de conférence pour vos événements. Votre confort, notre priorité.",
  address: "57, Rue Ibn Khamiss, Tlemcen, Algérie",
  phone: "+213 44 97 14 43",
  email: "hotel.islam2@gmail.com",
  hours: "Contactez-nous pour toute question ou réservation.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=57+Rue+Ibn+Khamiss+Tlemcen",
  rooms: [
    { name: "Chambre Single", desc: "1 personne.", price: "5 000 DA" },
    { name: "Chambre Double", desc: "2 personnes.", price: "7 000 DA" },
    { name: "Chambre Triple", desc: "3 personnes.", price: "10 500 DA" },
    { name: "Chambre Familiale", desc: "1 grand lit + 2 lits séparés.", price: "13 500 DA" },
    { name: "Suite de luxe avec terrasse", desc: "1 grand lit + 4 lits simples.", price: "22 000 DA" }
  ],
  services: ["Piscine","Restaurant : cuisine locale et internationale","Salle de conférence, événements et séminaires","Wi-Fi gratuit dans tout l’hôtel","Parking sécurisé","Climatisation dans toutes les chambres","Petit déjeuner inclus","Matelas supplémentaire : 1 000 DA"]
};
/* ============================================================ */

const $ = id => document.getElementById(id);
const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
document.title = CONFIG.name + " – Tlemcen";
["c-name","c-name-h","c-city","c-tagline","c-about","c-address","c-hours","c-phone","c-email"].forEach(id=>{
  const key = {"c-name":"name","c-name-h":"name","c-city":"city","c-tagline":"tagline","c-about":"about","c-address":"address","c-hours":"hours","c-phone":"phone","c-email":"email"}[id];
  set(id, CONFIG[key]);
});
$("c-phone").href = "tel:" + CONFIG.phone.replace(/\s/g,"");
$("c-call").href  = "tel:" + CONFIG.phone.replace(/\s/g,"");
$("c-email").href = "mailto:" + CONFIG.email;
$("c-map").href   = CONFIG.mapUrl;
set("c-footer", "© " + new Date().getFullYear() + " " + CONFIG.name + " – " + CONFIG.city);

$("rooms-list").innerHTML = CONFIG.rooms.map((r,i)=>
  `<article class="room"><div class="ph" aria-hidden="true">${i+1}</div><div class="b"><h3></h3><p></p><div class="price"></div></div></article>`).join("");
document.querySelectorAll(".room").forEach((el,i)=>{
  const r = CONFIG.rooms[i];
  el.querySelector("h3").textContent = r.name;
  el.querySelector("p").textContent = r.desc;
  el.querySelector(".price").textContent = r.price;
});
$("services-list").innerHTML = "";
CONFIG.services.forEach(s=>{ const li=document.createElement("li"); li.textContent=s; $("services-list").appendChild(li); });
CONFIG.rooms.forEach(r=>{ const o=document.createElement("option"); o.textContent=r.name; $("room-select").appendChild(o); });

$("book").addEventListener("submit", e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Demande de réservation – ${CONFIG.name}\nNom : ${f.get("name")}\nTéléphone : ${f.get("phone")}\nArrivée : ${f.get("in")}\nDépart : ${f.get("out")}\nChambre : ${f.get("room")}`;
  location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Demande de réservation") + "&body=" + encodeURIComponent(msg);
});
