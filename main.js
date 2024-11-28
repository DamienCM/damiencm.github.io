
import * as utils from "./utils.js";
import * as display from "./display.js";
import * as database from "./database.js";
import * as colortheme from "./color-theme.js";
import { dictionary } from "./lang/dictionnary.js";
import { toggleDropdown } from "./display.js";
import * as chart from "./chart.js";
import * as calcul from "./calcul.js";

const WARNING_THRESHOLD_NBR_JRS = 40;
const WARNING_THRESHOLD_NBR_ATTACHES = 300000;
const WARNING_KEY_NBR_JRS = "temps_parcelle";
const WARNING_KEY_NBR_ATTACHES = "nbre_attaches";


let language = 'fr';
let bar_graph = null;
let curve_chart = null;
let pie_charts=null;
let warningModal = null;
let stackWarnings = [];


function init_document(){
    // Masquer les tooltips si l’utilisateur clique ailleurs
    document.addEventListener('click', function (event) {
        const helpIcon = event.target.closest('.help-icon'); // Vérifie si on a cliqué sur une icône d'aide
        if (!helpIcon) {
            // Masquer tous les tooltips
            document.querySelectorAll('.help-icon').forEach(icon => icon.classList.remove('tooltip-active'));
        }
    });
    // Initialisation
    changeLanguage();
    // Attache l'événement au clic
    document.getElementById('show-more-options').addEventListener('click', display.toggleExtraOptions);
    document.getElementById('calculate-button').addEventListener('click',launchCalculation);
    // Rendre la fonction globale
    window.toggleDropdown = toggleDropdown;
    window.selectLanguage = selectLanguage;
}

// Initialisation de la langue
function changeLanguage() {
    
    language = document.getElementById('selected-language').innerText
    // console.log(language);
    document.getElementById('page-title').innerText = dictionary[language].pageTitle;
    document.getElementById('results-title').innerText = dictionary[language].resultsTitle;
    document.getElementById("calculate-button").innerText = dictionary[language].launchCalculation;

    // const extraOptions = document.getElementById('extra-options');
    // if (extraOptions.style.display === 'none') {
    //     document.getElementById("show-more-options").textContent = dictionary[language].moreOptions;
    // }
    // else {
    //     document.getElementById("show-more-options").textContent = dictionary[language].lessOptions;

    // }

    display.loadInputFields(language);
    display.loadExtraOptions(language); 
}

// Lancer le calcul
function launchCalculation() {
    if (utils.validateInputs(language)) {
        let inputs = dictionary[language].inputFields.map((_, index) => parseFloat(document.getElementById(`input-${index}`).value));
        let extra_inputs = dictionary[language].extraOptions.map((_, index) => parseFloat(document.getElementById(`input-extra-${index}`).value));
        let [results,chart_data] = calcul.calculateResults(inputs, extra_inputs,language);
        display.displayResultsRaw(results,language);
        // console.log(bar_graph);
        bar_graph =  display.displayResultsBarGraph(chart_data, bar_graph);
        curve_chart = display.displayResultsCurveGraph(chart_data,curve_chart);
        
        // Appel de la fonction
        pie_charts = display.displayPieCharts(chart_data, pie_charts);
        
        if (results.nombre_de_jours_parcelle[0]>=WARNING_THRESHOLD_NBR_JRS){
            stackWarnings.push([WARNING_KEY_NBR_JRS,[results.nombre_de_jours_parcelle[0]]]);
        }

        if (results.total_attaches_par_outil[0]>WARNING_THRESHOLD_NBR_ATTACHES){
            stackWarnings.push([WARNING_KEY_NBR_ATTACHES,[results.total_attaches_par_outil[0]]]);
        }
        stackWarnings = utils.manageStack(stackWarnings);
        // saveResultsAsJson(inputs, results);
    }
    else {

    }
}

function selectLanguage(language, code) {
    // Met à jour le texte et l'icône du bouton principal
    document.getElementById('selected-language').innerText = language;
    document.querySelector('.dropdown-toggle img').src = `icons/flags/${code}.png`; // Met à jour l'icône du drapeau

    // Ferme le menu après la sélection
    toggleDropdown();

    // Appeler la fonction de changement de langue si nécessaire
    changeLanguage();
}

init_document();

