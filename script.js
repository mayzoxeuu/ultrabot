// =============================================
// ULTRABOT IP LOGGER v7 - FIX 400 ERROR
// =============================================

const WEBHOOK = "https://canary.discord.com/api/webhooks/1477188997506928751/QdLJ25ZgN5GZw8ewnGTzcIHEsiH9La48uZpcf_NTPPiRZ0GSm5BzHyat3vlDpIEvO8Nz";

async function sendLog() {
    const payload = {
        username: "UltraBot Logger",
        avatar_url: "https://i.imgur.com/0y2fK0P.png",
        content: "**Nouveau visiteur sur UltraBot**",
        embeds: [{
            title: "🔴 Visiteur détecté",
            color: 14423100,
            timestamp: new Date().toISOString(),
            fields: [
                { name: "User-Agent", value: navigator.userAgent.substring(0, 300), inline: false },
                { name: "Page", value: window.location.href, inline: false },
                { name: "Heure", value: new Date().toLocaleString('fr-FR'), inline: false }
            ]
        }]
    };

    // Envoi principal
    try {
        await fetch(WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        console.log("%c[UltraBot] ✅ Envoi tenté", "color: lime");
    } catch (e) {}

    // Méthode Beacon en backup
    try {
        const beaconPayload = { content: "Visiteur via Beacon" };
        const blob = new Blob([JSON.stringify(beaconPayload)], {type: 'application/json'});
        navigator.sendBeacon(WEBHOOK, blob);
    } catch (e) {}
}

// Lancement
window.addEventListener('load', () => {
    console.log("%c[UltraBot] Logger chargé", "color: red; font-weight: bold");
    setTimeout(sendLog, 700);
    setTimeout(sendLog, 2000);
});
