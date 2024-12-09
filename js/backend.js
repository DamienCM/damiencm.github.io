import * as display from "./display.js"

const BACKEND_URL_BASE = "https://backend-mage-agri.onrender.com";

// Fonction pour envoyer les données au backend
export function send_inputs(inputs, extra_inputs) {
    console.log("Sending inputs to backend")
    fetch(`${BACKEND_URL_BASE}/submit_data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: inputs,
            extra_inputs: extra_inputs,
        }),
    })
        .then(response => {
            if (!response.ok) {
                console.log("reponse serveur :");
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data sent successfully:", data);
            // alert("Data sent successfully!");
        })
        .catch(error => {
            console.error("Error sending data:", error);
            // alert("Error sending data.");
        });
}


export function send_email_address(email, inputs, extra_inputs) {
    const timeout = 100000; // Timeout en millisecondes (5 secondes)

    display.loading_email(true);

    // Créer une promesse qui rejette après le délai défini
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout : le serveur ne répond pas.")), timeout)
    );

    console.log("inputs=");
    console.log(inputs);
    console.log("extra_inputs=");
    console.log(extra_inputs);
    // Requête fetch
    const fetchPromise = fetch(`${BACKEND_URL_BASE}/submit_email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: inputs,
            extra_inputs: extra_inputs,
            email:email
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi des données.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Réponse du serveur :", data);
            display.loading_email(false);
            display.success_email();

        });

    // Utiliser Promise.race pour limiter la durée d'attente de la requête
    Promise.race([fetchPromise, timeoutPromise])
        .catch((error) => {            
            console.error("Erreur :", error);
            display.loading_email(false);
            display.error_email(); // Affiche une erreur si le timeout est atteint ou une autre erreur survient
        });
}
