import { displayError, displayWarning } from "./display.js";
import { dictionary } from "../lang/dictionary.js";
import * as backend from "./backend.js" 

let stack = [];
let modal = null;
let button = null;

export const STACK_KEYS = {
    warning: 0,
    error: 1,
};



export function getMinValueFromData(datasets) {
    let minValue = Infinity;
    datasets.forEach(dataset => {
        dataset.data.forEach(value => {
            // console.log(Number(value),Number(minValue));
            // console.log(typeof(value),typeof(minValue));
            if (Number(value) < Number(minValue)) {
                // console.log("changed");
                minValue = value;
            }
        });
    });
    // console.log("min",minValue);
    return minValue;
}

// Sauvegarde des résultats en JSON
export function saveResultsAsJson(inputs, results) {
    const data = { inputs, results };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'calculateur_resultats.json';
    link.click();
}

// Réinitialisation du formulaire
export function resetForm() {
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('calculator-form').reset();
    loadInputFields();
    loadExtraOptions();
}

export function validateInputs(language) {
    const inputs = document.querySelectorAll("#input-fields input");
    const selectBobine = document.querySelector("#input-" + (dictionary[language].inputFields.length - 1)); // Champ bobine (dernier champ)
    let allValid = true;
    document.getElementById("error-message").innerText = ""; // Reset error message

    // Valider les champs numériques
    inputs.forEach(input => {
        input.classList.remove("is-invalid"); // Reset error styling

        if (!input.value || isNaN(input.value) || Number(input.value) <= 0) {
            input.classList.add("is-invalid"); // Add error styling if empty or invalid
            allValid = false;
        }
    });

    // Valider la sélection du champ bobine
    if (selectBobine && !selectBobine.value) {
        selectBobine.classList.add("is-invalid"); // Ajoute une bordure rouge si aucune valeur n'est sélectionnée
        allValid = false;
    } else if (selectBobine) {
        console.log("Type de bobine sélectionné :", selectBobine.value); // Log ou utilisez la valeur comme souhaité
    }

    // Affiche un message d'erreur si nécessaire
    if (!allValid) {
        document.getElementById("error-message").innerText = dictionary[language].errorInputs;
    }

    return allValid;
}

export function manageStack(fstack) {
    // fstacks = [
    //  msg_type (1,2,3) from STACK KEY,
    // 
    //  ]

    // recursive function
    setTimeout(() => {
        stack = fstack;
        console.log("manage stack called, stack length = ");
        console.log(stack.length);
        console.log(stack[0]);
        if (stack.length === 1) {
            switch (stack[0][0]) {
                case STACK_KEYS.error:
                    displayError(stack[0][1], stack[0][2]);
                    break;
                case STACK_KEYS.warning:
                    displayWarning(stack[0][1], stack[0][2]);
                    break;
                default:
                    break;
            }
            stack.shift();
        }
        if (stack.length >= 2) {
            switch (stack[0][0]) {
                case STACK_KEYS.error:
                    modal = displayError(fstack[0][1], fstack[0][2]);
                    button = document.getElementById("close-error");
                    stack.shift();
                    button.addEventListener("click", function () {
                        manageStack(stack);
                    });
                    break;
                case STACK_KEYS.warning:
                    modal = displayWarning(fstack[0][0], fstack[0][1]);
                    button = document.getElementById("close-warning");
                    stack.shift();
                    button.addEventListener("click", function () {
                        manageStack(stack);
                    });
                    break;
                default:
                    break;
            }


        }
    }, 200);
    return stack;

}

export function handle_email_form_submission(e,inputs,extra_inputs) {
    // Récupérer l'adresse email depuis l'input
    const email = document.getElementById("emailInput").value;

    // Vérifier si une adresse email valide a été saisie
    if (email) {
        console.log(`Adresse email saisie : ${email}`);
        // alert(`Adresse email saisie : ${email}`);

        // Optionnel : cacher le modal après la soumission
        const modal = bootstrap.Modal.getInstance(document.getElementById("emailModal"));
        modal.hide();

        // Envoyer l'email à un serveur ou traiter localement
        // Exemple : envoyer une requête POST
        backend.send_email_address(email,inputs,extra_inputs);

    } else {
        alert("Veuillez entrer une adresse email valide.");
    }
}

export function pageScroll() {
    const target = document.getElementById("results-section").offsetTop-10; // Position verticale de la section
    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
}
