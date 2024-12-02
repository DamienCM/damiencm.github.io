import { displayWarning } from "./display.js";
import { dictionary } from "../lang/dictionary.js";

let stack = [];
let modal = null;
let button = null;

export function availableLanguage(language){
    switch (language) {
        case "Francais":
            return true;
        default:
            return false;
    }
}


export function getMinValueFromData(datasets) {
    let minValue = Infinity;
    datasets.forEach(dataset => {
        dataset.data.forEach(value => {
            // console.log(Number(value),Number(minValue));
            // console.log(typeof(value),typeof(minValue));
            if (Number(value) < Number(minValue)) {
                // console.log("changed");
                minValue=value;
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

export function manageStack(fstack){
    // recursive function
    setTimeout(() => {
        stack = fstack;
        console.log("manage stack called, stack length = ");
        console.log(stack.length);
        console.log(stack[0]);
        if (stack.length===1){
            // console.log(stack[0][0]);
            displayWarning(stack[0][0],stack[0][1]);
            stack.shift();
        }
        if (stack.length>=2){
            modal = displayWarning(fstack[0][0],fstack[0][1]);
            button =  document.getElementById("close-warning");
            stack.shift();
            button.addEventListener("click",function(){
                manageStack(stack);
            });

        }    
    },200);
    return stack;

}