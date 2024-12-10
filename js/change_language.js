// DCM 2024
import {dictionary} from "../lang/dictionary.js";
import * as display from "./display.js"
import * as calcul from "./calcul.js";


const available_langs =  ["Francais", "English", "Español","Italiano", "Português","Deutsch"]
const verified_langs =  ["Francais"]

export function availableLanguage(language){
    if (available_langs.includes(language)){
        return true;
    }
    else{
        return false;
    }

}

export function verifiedLanguage(language){
    if (verified_langs.includes(language)){
        return true;
    }
    else{
        return false;
    }

}


export function change_language(language){
    display.set_language(language);
    calcul.set_language(language);
    document.getElementById('page-title').innerText = dictionary[language].pageTitle;
    // document.getElementById('results-title').innerText = dictionary[language].resultsTitle;
    document.getElementById("calculate-button").innerText = dictionary[language].launchCalculation;
    document.getElementById("tools-compare").innerText = dictionary[language].toCompareTools;
    document.getElementById("lea30-checkbox-text").innerHTML = dictionary[language].LEA30Checkbox;
    document.getElementById("bobine-embarquee-checkbox-text").innerText = dictionary[language].embarqueeCheckbox;
    document.getElementById("manuelle-checkbox-text").innerText = dictionary[language].manuelleCheckbox;
    // document.getElementById("toggle-pie-charts").innerText = dictionary[language].voir_plus_main_oeuvre_consommable;

    document.getElementById("show-more-options").innerText = dictionary[language].showMoreOptions; // Texte "Afficher plus"
    document.getElementById("show-less-options").innerText = dictionary[language].showLessOptions; // Texte "Afficher plus"
    document.getElementById("show-more-results").innerText = dictionary[language].showMoreResults; // Texte "Afficher plus"
    document.getElementById("show-less-results").innerText = dictionary[language].showLessResults; // Texte "Afficher plus"
    document.getElementById("show-more-pie-chart").innerText = dictionary[language].voir_plus_main_oeuvre_consommable; // Texte "Afficher plus"
    document.getElementById("show-less-pie-chart").innerText = dictionary[language].voir_moins_main_oeuvre_consommable; // Texte "Afficher plus"

    document.getElementById("button-trigger-modal-email-text").innerText=dictionary[language].button_trigger_modal_email_text;
    document.getElementById("emailModalLabel").innerText=dictionary[language].emailModalLabel;
    document.getElementById("emailInput").innerText=dictionary[language].emailInput;
    document.getElementById("form-text-email").innerHTML=dictionary[language].form_text_email;
    document.getElementById("close-email-modal-button").innerText=dictionary[language].close_email_modal_button;
    document.getElementById("submit-email-modal-button").innerText=dictionary[language].submit_email_modal_button;
    document.getElementById("emailInputText").innerText=dictionary[language].emailInputText;
    




    display.loadInputFields(language);
    display.loadExtraOptions(language); 


}