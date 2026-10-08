const input = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const clearButton = document.getElementById("clearButton");
const chat = document.getElementById("chat");

/* =========================================================
   🤖 BYTE – DIGITALER ASSISTENT
   ========================================================= */

/* =========================================================
   💬 CHAT-FUNKTIONEN
   ========================================================= */

function addMessage(text, type) {
    const message = document.createElement("div");
    message.classList.add("message", type);
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function clearChat() {
    chat.innerHTML = "";
    resetConversation();

    addMessage(
        "Chat wurde gelöscht. 🧹\nWie kann ich dir helfen?",
        "bot"
    );

    input.focus();
}

/* =========================================================
   🧹 FRAGE VORBEREITEN
   ========================================================= */

function normalizeText(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[!?.,;:()[\]{}]/g, " ")
        .replace(/\s+/g, " ");
}

/* =========================================================
   🎯 HILFSFUNKTIONEN
   ========================================================= */

function containsAny(text, words) {
    return words.some(word => text.includes(word));
}

function containsAll(text, words) {
    return words.every(word => text.includes(word));
}

/* =========================================================
   🆘 HILFE
   ========================================================= */

const helpAnswer = `Ich kann dir unter anderem bei diesen Themen helfen:

💻 IT
Passwort, Login, Internet, WLAN, PC, Bildschirm, Drucker, E-Mail, Dateien und Software.

🏢 AWO
Allgemeine Fragen zur AWO und zur AWO Akademie.

📚 Ausbildung
Fachinformatik, IT-Systemelektronik, Deutschkurse und Berufsorientierung.

🤖 KI
Wenn ich eine Frage mit meinen festen Regeln nicht kenne, kann ich meine KI fragen.

Schreib einfach deine Frage.`;

/* =========================================================
   🧠 BYTE – FRAGEN UND ANTWORTEN
   ========================================================= */

const commands = [

    /* =====================================================
       🆘 HILFE
       ===================================================== */

    {
        priority: 100,
        match: text =>
            text === "hilfe" ||
            containsAny(text, [
                "was kannst du",
                "was kannst du alles",
                "was kannst du beantworten",
                "wobei kannst du helfen",
                "was weißt du"
            ]),
        answer: helpAnswer
    },

    /* =====================================================
       🤖 ÜBER BYTE
       ===================================================== */

    {
        priority: 95,
        match: text =>
            containsAny(text, [
                "wer bist du",
                "was bist du",
                "wie heißt du",
                "wie ist dein name",
                "was ist dein name",
                "wie nennt man dich"
            ]),
        answer:
            "Ich bin Byte 🤖, dein digitaler Assistent."
    },

    {
        priority: 94,
        match: text =>
            containsAny(text, [
                "wer hat dich erstellt",
                "wer hat dich programmiert",
                "wer ist dein entwickler"
            ]),
        answer:
            "Ich wurde von Said erstellt. 😎"
    },

    {
        priority: 93,
        match: text =>
            containsAny(text, [
                "bist du eine echte ki",
                "bist du künstliche intelligenz",
                "bist du eine ki",
                "bist du echte künstliche intelligenz"
            ]),
        answer:
            "Ja 😎 Ich bin jetzt mit einer echten KI verbunden."
    },

    /* =====================================================
       👋 SMALLTALK
       ===================================================== */

    {
        priority: 90,
        match: text =>
            containsAny(text, [
                "hallo",
                "hi",
                "hey",
                "guten morgen",
                "guten tag",
                "guten abend"
            ]),
        answer:
            "Hallo! 👋 Ich bin Byte. Wie kann ich dir helfen?"
    },

    {
        priority: 89,
        match: text =>
            containsAny(text, [
                "danke",
                "dankeschön",
                "vielen dank"
            ]),
        answer:
            "Gerne! 😊"
    },

    {
        priority: 88,
        match: text =>
            containsAny(text, [
                "tschüss",
                "tschus",
                "bye",
                "auf wiedersehen"
            ]),
        answer:
            "Bis zum nächsten Mal! 👋"
    },

    {
        priority: 87,
        match: text =>
            containsAny(text, [
                "bist du cool",
                "bist du geil",
                "bist du gut"
            ]),
        answer:
            "Natürlich. Ich heiße Byte. Was erwartest du? 😎🤖"
    },

    /* =====================================================
       🔐 PASSWORT / LOGIN
       ===================================================== */

    {
        priority: 80,
        match: text =>
            containsAny(text, [
                "passwort vergessen",
                "passwort funktioniert nicht",
                "passwort geht nicht"
            ]),
        answer:
            "Wenn dein Passwort nicht funktioniert, wende dich an den IT-Support."
    },

    {
        priority: 79,
        match: text =>
            containsAny(text, [
                "account gesperrt",
                "konto gesperrt",
                "kann mich nicht anmelden",
                "login funktioniert nicht",
                "login geht nicht",
                "kann mich nicht einloggen"
            ]),
        answer:
            "Prüfe zuerst Benutzername und Passwort. Wenn dein Account gesperrt ist, wende dich an den IT-Support."
    },

    /* =====================================================
       🌐 INTERNET / WLAN / VPN
       ===================================================== */

    {
        priority: 78,
        match: text =>
            containsAny(text, [
                "internet langsam",
                "internet ist langsam",
                "wlan langsam"
            ]),
        answer:
            "Prüfe deine WLAN-Verbindung und starte bei Bedarf den Router oder dein Gerät neu."
    },

    {
        priority: 77,
        match: text =>
            containsAny(text, [
                "kein internet",
                "wlan geht nicht",
                "wlan funktioniert nicht",
                "kein wlan"
            ]),
        answer:
            "Prüfe zuerst, ob WLAN aktiviert ist und du mit dem richtigen Netzwerk verbunden bist."
    },

    {
        priority: 76,
        match: text =>
            containsAny(text, [
                "vpn funktioniert nicht",
                "vpn geht nicht"
            ]),
        answer:
            "VPN ermöglicht eine sichere Verbindung zu einem Netzwerk. Prüfe zuerst deine Internetverbindung."
    },

    {
        priority: 75,
        match: text =>
            containsAny(text, [
                "was ist vpn",
                "was bedeutet vpn"
            ]),
        answer:
            "VPN ermöglicht eine sichere Verbindung zu einem Netzwerk."
    },

    {
        priority: 74,
        match: text =>
            containsAny(text, [
                "netzwerk funktioniert nicht",
                "netzwerk geht nicht",
                "netzwerk problem"
            ]),
        answer:
            "Prüfe zuerst deine Netzwerkverbindung. Wenn das Problem bleibt, wende dich an den IT-Support."
    },

    /* =====================================================
       💻 COMPUTER / PC
       ===================================================== */

    {
        priority: 73,
        match: text =>
            containsAny(text, [
                "pc geht nicht",
                "computer geht nicht",
                "computer startet nicht",
                "pc startet nicht"
            ]),
        answer:
            "Prüfe zuerst die Stromversorgung. Wenn der PC weiterhin nicht startet, wende dich an den IT-Support."
    },

    {
        priority: 72,
        match: text =>
            containsAny(text, [
                "pc langsam",
                "computer langsam",
                "rechner langsam"
            ]),
        answer:
            "Schließe nicht benötigte Programme und starte den PC neu."
    },

    {
        priority: 71,
        match: text =>
            containsAny(text, [
                "computer hängt",
                "pc hängt",
                "computer reagiert nicht",
                "pc reagiert nicht"
            ]),
        answer:
            "Warte kurz und versuche zunächst, nicht benötigte Programme zu schließen. Wenn nichts reagiert, kann ein Neustart helfen."
    },

    {
        priority: 70,
        match: text =>
            containsAny(text, [
                "pc neu starten",
                "computer neu starten",
                "rechner neu starten"
            ]),
        answer:
            "Unter Windows kannst du über Start → Ein/Aus → Neu starten auswählen."
    },

    /* =====================================================
       🖥️ BILDSCHIRM
       ===================================================== */

    {
        priority: 69,
        match: text =>
            containsAny(text, [
                "bildschirm schwarz",
                "monitor schwarz",
                "bildschirm bleibt schwarz"
            ]),
        answer:
            "Prüfe Stromversorgung, Kabel und ob der Monitor eingeschaltet ist."
    },

    {
        priority: 68,
        match: text =>
            containsAny(text, [
                "bildschirm",
                "monitor"
            ]),
        answer:
            "Prüfe zuerst Stromversorgung und Verbindung zum PC."
    },

    /* =====================================================
       🔊 TON / MIKROFON / KAMERA
       ===================================================== */

    {
        priority: 67,
        match: text =>
            containsAny(text, [
                "kein ton",
                "sound funktioniert nicht",
                "ton geht nicht",
                "kein sound"
            ]),
        answer:
            "Prüfe, ob dein Gerät stummgeschaltet ist und das richtige Ausgabegerät ausgewählt wurde."
    },

    {
        priority: 66,
        match: text =>
            containsAny(text, [
                "mikrofon geht nicht",
                "mikrofon funktioniert nicht",
                "mikro geht nicht",
                "mikro funktioniert nicht"
            ]),
        answer:
            "Prüfe, ob das Mikrofon angeschlossen, aktiviert und nicht stummgeschaltet ist."
    },

    {
        priority: 65,
        match: text =>
            containsAny(text, [
                "kamera geht nicht",
                "kamera funktioniert nicht"
            ]),
        answer:
            "Prüfe, ob die Kamera angeschlossen ist und die verwendete Anwendung Zugriff darauf hat."
    },

    /* =====================================================
       🖨️ DRUCKER
       ===================================================== */

    {
        priority: 64,
        match: text =>
            containsAny(text, [
                "drucker geht nicht",
                "drucker druckt nicht",
                "drucker funktioniert nicht"
            ]),
        answer:
            "Prüfe, ob der Drucker eingeschaltet, verbunden und als Standarddrucker ausgewählt ist."
    },

    {
        priority: 63,
        match: text =>
            containsAny(text, [
                "drucker offline",
                "drucker ist offline"
            ]),
        answer:
            "Prüfe die Verbindung zum Drucker und ob er eingeschaltet ist."
    },

    {
        priority: 62,
        match: text =>
            containsAny(text, [
                "papierstau",
                "papier steckt im drucker"
            ]),
        answer:
            "Schalte den Drucker aus und entferne das Papier vorsichtig."
    },

    /* =====================================================
       📧 E-MAIL / OUTLOOK
       ===================================================== */

    {
        priority: 61,
        match: text =>
            containsAny(text, [
                "kann keine email senden",
                "kann keine e mail senden",
                "kann keine e-mail senden",
                "email senden funktioniert nicht",
                "email schicken funktioniert nicht"
            ]),
        answer:
            "Prüfe Internetverbindung, Empfängeradresse und ob Outlook online ist."
    },

    {
        priority: 60,
        match: text =>
            containsAny(text, [
                "email",
                "e mail",
                "e-mail",
                "outlook"
            ]),
        answer:
            "Prüfe zuerst deine Internetverbindung und ob Outlook korrekt verbunden ist."
    },

    /* =====================================================
       🖱️ MAUS / TASTATUR
       ===================================================== */

    {
        priority: 59,
        match: text =>
            containsAny(text, [
                "maus funktioniert nicht",
                "maus geht nicht",
                "maus reagiert nicht"
            ]),
        answer:
            "Prüfe die Verbindung der Maus. Bei USB-Geräten kannst du einen anderen USB-Anschluss testen."
    },

    {
        priority: 58,
        match: text =>
            containsAny(text, [
                "tastatur funktioniert nicht",
                "tastatur geht nicht",
                "tastatur reagiert nicht"
            ]),
        answer:
            "Prüfe die Verbindung der Tastatur und teste bei USB-Geräten einen anderen Anschluss."
    },

    /* =====================================================
       📁 DATEIEN / ORDNER
       ===================================================== */

    {
        priority: 57,
        match: text =>
            containsAny(text, [
                "datei kann nicht geöffnet werden",
                "datei geht nicht auf",
                "datei lässt sich nicht öffnen"
            ]),
        answer:
            "Prüfe zuerst, ob die Datei noch vorhanden ist und ob das passende Programm installiert ist."
    },

    {
        priority: 56,
        match: text =>
            containsAny(text, [
                "ordner nicht zugänglich",
                "zugriff verweigert",
                "kein zugriff auf ordner"
            ]),
        answer:
            "Dir fehlen möglicherweise die notwendigen Zugriffsrechte. Wende dich bei einem Arbeitsordner an den IT-Support."
    },

    {
        priority: 55,
        match: text =>
            containsAny(text, [
                "datei gelöscht",
                "datei wurde gelöscht",
                "gelöschte datei"
            ]),
        answer:
            "Prüfe zuerst den Papierkorb. Wenn die Datei dort nicht vorhanden ist, kann eventuell ein Backup helfen."
    },

    /* =====================================================
       🧩 SOFTWARE / UPDATES
       ===================================================== */

    {
        priority: 54,
        match: text =>
            containsAny(text, [
                "programm funktioniert nicht",
                "software funktioniert nicht",
                "programm geht nicht"
            ]),
        answer:
            "Starte das Programm neu. Wenn das Problem bleibt, kann ein Update oder eine Reparatur notwendig sein."
    },

    {
        priority: 53,
        match: text =>
            containsAny(text, [
                "software installieren",
                "programm installieren"
            ]),
        answer:
            "Installiere Software auf einem Arbeitsgerät nur, wenn sie freigegeben ist. Bei Unsicherheit frage den IT-Support."
    },

    {
        priority: 52,
        match: text =>
            containsAny(text, [
                "update funktioniert nicht",
                "programm aktualisieren",
                "software aktualisieren"
            ]),
        answer:
            "Prüfe deine Internetverbindung und starte das Programm erneut. Bei Firmenrechnern kann der IT-Support helfen."
    },

    /* =====================================================
       🏢 AWO
       ===================================================== */

    {
        priority: 50,
        match: text =>
            containsAny(text, [
                "was ist die awo",
                "was bedeutet awo",
                "wofür steht awo"
            ]),
        answer:
            "AWO steht für Arbeiterwohlfahrt. Sie ist ein sozialer Wohlfahrtsverband und unterstützt Menschen in vielen Lebensbereichen."
    },

    {
        priority: 49,
        match: text =>
            containsAny(text, [
                "was macht die awo",
                "was bietet die awo"
            ]),
        answer:
            "Die AWO bietet soziale Unterstützung und verschiedene Angebote für Menschen in unterschiedlichen Lebenssituationen."
    },

    /* =====================================================
       🏫 AWO AKADEMIE
       ===================================================== */

    {
        priority: 48,
        match: text =>
            containsAny(text, [
                "was ist die awo akademie",
                "was ist awo akademie"
            ]),
        answer:
            "Die AWO Hamburg Akademie für Bildung und Integration bietet unter anderem Berufsorientierung, Sprachkurse und anerkannte Berufsausbildungen an."
    },

    {
        priority: 47,
        match: text =>
            containsAny(text, [
                "was macht die awo akademie",
                "was bietet die awo akademie"
            ]),
        answer:
            "Die AWO Akademie unterstützt Menschen unter anderem bei Bildung, Sprache, Berufsorientierung und Ausbildung."
    },

    {
        priority: 46,
        match: text =>
            containsAny(text, [
                "wo ist die awo akademie",
                "wo befindet sich die awo akademie"
            ]),
        answer:
            "Die AWO Akademie befindet sich in Hamburg."
    },

    {
        priority: 45,
        match: text =>
            containsAny(text, [
                "welche ausbildungen gibt es bei der awo akademie",
                "welche ausbildungen gibt es bei der awo"
            ]),
        answer:
            "Bei der AWO Akademie gibt es unter anderem anerkannte Ausbildungen im IT-Bereich, darunter Fachinformatik und IT-Systemelektronik."
    },

    /* =====================================================
       📚 AUSBILDUNG
       ===================================================== */

    {
        priority: 44,
        match: text =>
            containsAny(text, [
                "kann man dort fachinformatiker werden",
                "fachinformatiker bei der awo",
                "ausbildung fachinformatik"
            ]),
        answer:
            "Ja. Die AWO Akademie bietet anerkannte Ausbildungsmöglichkeiten im Bereich Fachinformatik an."
    },

    {
        priority: 43,
        match: text =>
            containsAny(text, [
                "was ist fachinformatik",
                "was macht ein fachinformatiker"
            ]),
        answer:
            "Fachinformatik ist ein IT-Ausbildungsberuf. Fachinformatiker entwickeln, betreuen und verbessern Software, Systeme und IT-Lösungen."
    },

    {
        priority: 42,
        match: text =>
            containsAny(text, [
                "was ist it systemelektronik",
                "was ist it-systemelektronik",
                "was macht ein it systemelektroniker"
            ]),
        answer:
            "IT-Systemelektronik beschäftigt sich unter anderem mit IT-Systemen, Netzwerken, Hardware, Installation und technischen Störungen."
    },

    {
        priority: 41,
        match: text =>
            containsAny(text, [
                "welche it ausbildungen gibt es",
                "welche it-ausbildungen gibt es"
            ]),
        answer:
            "Zu den IT-Ausbildungen gehören unter anderem Fachinformatik und IT-Systemelektronik."
    },

    /* =====================================================
       📚 DEUTSCHKURSE / BERUFSORIENTIERUNG
       ===================================================== */

    {
        priority: 40,
        match: text =>
            containsAny(text, [
                "gibt es deutschkurse",
                "deutschkurs bei der awo",
                "deutschkurs awo akademie"
            ]),
        answer:
            "Ja. Die AWO Akademie bietet Deutschkurse und berufsbezogene Sprachangebote an."
    },

    {
        priority: 39,
        match: text =>
            containsAny(text, [
                "gibt es berufsorientierung",
                "berufsorientierung bei der awo",
                "berufsorientierung awo akademie"
            ]),
        answer:
            "Ja. Die AWO Akademie bietet Berufsorientierung und Qualifizierungsangebote an."
    },

    /* =====================================================
       💻 IT-SOZIALKAUFHAUS
       ===================================================== */

    {
        priority: 37,
        match: text =>
            containsAny(text, [
                "was ist das it sozialkaufhaus",
                "was ist das it-sozialkaufhaus"
            ]),
        answer:
            "Im IT-Sozialkaufhaus werden gebrauchte IT-Geräte aufgearbeitet und zu günstigen Preisen angeboten."
    },

    {
        priority: 36,
        match: text =>
            containsAny(text, [
                "kann man dort computer kaufen",
                "computer im it sozialkaufhaus"
            ]),
        answer:
            "Ja. Im IT-Sozialkaufhaus werden unter anderem gebrauchte und aufgearbeitete Computer und IT-Geräte angeboten."
    },

    {
        priority: 35,
        match: text =>
            containsAny(text, [
                "was macht das it sozialkaufhaus",
                "was macht das it-sozialkaufhaus"
            ]),
        answer:
            "Dort werden gebrauchte IT-Geräte aufgearbeitet und anschließend zu günstigen Preisen angeboten."
    },

    /* =====================================================
       📞 KONTAKT
       ===================================================== */

    {
        priority: 33,
        match: text =>
            containsAny(text, [
                "kontakt awo akademie",
                "telefonnummer awo akademie"
            ]),
        answer:
            "Du kannst die AWO Akademie telefonisch unter 040 558 211 710 kontaktieren."
    }
];

/* =========================================================
   🧠 ANTWORT FINDEN
   ========================================================= */

function byteAntwort(frage) {
    const text = normalizeText(frage);

    if (text === "") {
        return "Bitte stelle mir eine Frage. 🤖";
    }

    const sortedCommands = [...commands].sort(
        (a, b) => b.priority - a.priority
    );

    for (const command of sortedCommands) {
        if (command.match(text)) {
            return command.answer;
        }
    }

    // Keine feste Antwort gefunden
    return null;
}

/* =========================================================
   🤖 CLOUDFLARE WORKERS AI
   ========================================================= */

const BYTE_AI_URL =
    "https://byte-ai.said-nihau.workers.dev";

/* =========================================================
   🧠 GESPRÄCHSKONTEXT
   ========================================================= */

const MAX_HISTORY_MESSAGES = 20;

let conversationHistory = [];

function addToConversation(role, content) {
    if (!content || typeof content !== "string") {
        return;
    }

    conversationHistory.push({
        role: role,
        content: content.trim()
    });

    if (conversationHistory.length > MAX_HISTORY_MESSAGES) {
        conversationHistory =
            conversationHistory.slice(-MAX_HISTORY_MESSAGES);
    }
}

function resetConversation() {
    conversationHistory = [];
}

/* =========================================================
   🤖 KI FRAGEN
   ========================================================= */

async function askByteAI() {

    const response = await fetch(
        BYTE_AI_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: conversationHistory
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "AI-Anfrage fehlgeschlagen"
        );
    }

    return (
        data.antwort ||
        "Entschuldigung, ich konnte gerade keine Antwort erzeugen."
    );
}

/* =========================================================
   🚀 NACHRICHT SENDEN
   ========================================================= */

async function sendMessage() {

    const frageOriginal = input.value.trim();

    if (frageOriginal === "") {
        addMessage(
            "Bitte stelle mir eine Frage. 🤖",
            "bot"
        );

        input.focus();
        return;
    }

    /* =====================================================
       👤 USER-NACHRICHT
       ===================================================== */

    addMessage(
        frageOriginal,
        "user"
    );

    addToConversation(
        "user",
        frageOriginal
    );

    input.value = "";
    input.focus();

    /* =====================================================
       🧠 FESTE BYTE-REGELN
       ===================================================== */

    const lokaleAntwort =
        byteAntwort(frageOriginal);

    if (lokaleAntwort !== null) {

        addMessage(
            lokaleAntwort,
            "bot"
        );

        /*
           Auch lokale Antworten werden gespeichert.
           Dadurch kann die KI später den bisherigen
           Gesprächsverlauf verstehen.
        */

        addToConversation(
            "assistant",
            lokaleAntwort
        );

        return;
    }

    /* =====================================================
       🤖 ECHTE KI
       ===================================================== */

    const thinkingMessage =
        document.createElement("div");

    thinkingMessage.classList.add(
        "message",
        "bot"
    );

    thinkingMessage.textContent =
        "Byte denkt nach... 🤖";

    chat.appendChild(
        thinkingMessage
    );

    chat.scrollTop =
        chat.scrollHeight;

    try {

        const antwort =
            await askByteAI();

        thinkingMessage.textContent =
            antwort;

        addToConversation(
            "assistant",
            antwort
        );

        chat.scrollTop =
            chat.scrollHeight;

    } catch (error) {

        console.error(
            "Byte AI Fehler:",
            error
        );

        thinkingMessage.textContent =
            "Die Verbindung zur Byte-KI funktioniert gerade nicht. 🤖";
    }
}

/* =========================================================
   🖱️ BUTTONS
   ========================================================= */

button.addEventListener(
    "click",
    sendMessage
);

clearButton.addEventListener(
    "click",
    clearChat
);

/* =========================================================
   ⌨️ ENTER-TASTE
   ========================================================= */

input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    }
);
