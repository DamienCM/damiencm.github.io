// DCM 2024
import {dictionary} from "../lang/dictionary.js";
import * as display from "./display.js"

export function change_language(language){
    document.getElementById('page-title').innerText = dictionary[language].pageTitle;
    document.getElementById('results-title').innerText = dictionary[language].resultsTitle;
    document.getElementById("calculate-button").innerText = dictionary[language].launchCalculation;

    display.loadInputFields(language);
    display.loadExtraOptions(language); 
}