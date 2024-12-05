import * as utils from "./js/utils.js";
import * as display from "./js/display.js";
import { dictionary } from "./lang/dictionary.js";
import { toggleDropdown } from "./js/display.js";
import * as calcul from "./js/calcul.js";
import * as change_language from "./js/change_language.js"
import * as backend from "./js/backend.js"

const WARNING_THRESHOLD_NBR_JRS = 40;
const WARNING_THRESHOLD_NBR_ATTACHES = 300000;
const WARNING_KEY_NBR_JRS = display.ERROR_KEY_NBR_JRS;
const WARNING_KEY_NBR_ATTACHES = display.ERROR_KEY_NBR_ATTACHES;
const ERROR_KEY_LANG_NOT_AVAILABLE = display.ERROR_KEY_LANG_NOT_AVAILABLE;
const WARNING_KEY_LANG_NOT_VERIFIED = display.WARNING_KEY_LANG_NOT_VERIFIED;
const WARNING_KEY_PHOTOD = display.WARNING_KEY_PHOTOD;
const STACK_KEYS = utils.STACK_KEYS;

let language = 'fr';
let bar_graph = null;
let curve_chart = null;
let pie_charts = null;
let warningModal = null;
let stackWarnings = [];


function init_document() {
    // Masquer les tooltips si l’utilisateur clique ailleurs
    document.addEventListener('click', function (event) {
        const helpIcon = event.target.closest('.help-icon'); // Vérifie si on a cliqué sur une icône d'aide
        if (!helpIcon) {
            // Masquer tous les tooltips
            document.querySelectorAll('.help-icon').forEach(icon => icon.classList.remove('tooltip-active'));
        }
    });
    // Initialisation
    language = document.getElementById('selected-language').innerText;
    // Attache l'événement au clic
    document.getElementById('show-more-options').addEventListener('click', display.toggleExtraOptions);
    document.getElementById('show-less-options').addEventListener('click', display.toggleExtraOptions);
    document.getElementById('show-more-results').addEventListener('click', display.toggleExtraResults);
    document.getElementById('show-less-results').addEventListener('click', display.toggleExtraResults);
    document.getElementById('show-more-pie-chart').addEventListener('click', display.toggleAllPieCharts);
    document.getElementById('show-less-pie-chart').addEventListener('click', display.toggleAllPieCharts);
    document.getElementById('calculate-button').addEventListener('click', launchCalculation);
    document.getElementById("emailForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        utils.handle_email_form_submission(); // Appeler la fonction définie dans utils.js
    });   // Rendre la fonction globale
    window.toggleDropdown = toggleDropdown;
    window.selectLanguage = selectLanguage;
    // change lang to charge page
    change_language.change_language(language);
}

// Initialisation de la langue
function checkLanguage() {
    let language_selected = document.getElementById('selected-language').innerText;
    if (change_language.availableLanguage(language_selected)) {
        language = language_selected;
        change_language.change_language(language);

    }
    else {
        stackWarnings.push([STACK_KEYS.error, ERROR_KEY_LANG_NOT_AVAILABLE, [""]]);
    }
    if (!change_language.verifiedLanguage(language_selected)) {
        stackWarnings.push([STACK_KEYS.warning, WARNING_KEY_LANG_NOT_VERIFIED, [""]]);
    }

    stackWarnings = utils.manageStack(stackWarnings);
}

// Lancer le calcul
function launchCalculation() {
    if (utils.validateInputs(language)) {
        let inputs = dictionary[language].inputFields.map((_, index) => parseFloat(document.getElementById(`input-${index}`).value));
        inputs[inputs.length - 1] = document.getElementById(`input-5`).value;
        let extra_inputs = dictionary[language].extraOptions.map((_, index) => parseFloat(document.getElementById(`input-extra-${index}`).value));
        let [results, chart_data, undisplayed_data] = calcul.calculateResults(inputs, extra_inputs, language);
        let state_checkboxes =
            display.displayResultsRaw(results, language);
        // console.log(bar_graph);
        bar_graph = display.displayResultsBarGraph(chart_data, bar_graph, state_checkboxes);
        curve_chart = display.displayResultsCurveGraph(chart_data, curve_chart);

        // Appel de la fonction
        pie_charts = display.displayPieCharts(chart_data, pie_charts);

        if (results.nombre_de_jours_parcelle[0] >= WARNING_THRESHOLD_NBR_JRS) {
            stackWarnings.push([STACK_KEYS.error, WARNING_KEY_NBR_JRS, [results.nombre_de_jours_parcelle[0]]]);
        }

        if (results.total_attaches_par_outil[0] > WARNING_THRESHOLD_NBR_ATTACHES) {
            stackWarnings.push([STACK_KEYS.error, WARNING_KEY_NBR_ATTACHES, [results.total_attaches_par_outil[0]]]);
        }
        if (undisplayed_data.type_de_bobine === "B") { // pvc
            stackWarnings.push([STACK_KEYS.error, display.WARNING_KEY_PVC, ""])
        }
        if (undisplayed_data.type_de_bobine === "C") { // photo
            stackWarnings.push([STACK_KEYS.warning, WARNING_KEY_PHOTOD, ""])
        }
        stackWarnings = utils.manageStack(stackWarnings);
        // saveResultsAsJson(inputs, results);

        // at the end of the calculation
        // backend.send_inputs(inputs, extra_inputs);
        console.log(inputs);
        backend.send_inputs(inputs, extra_inputs);
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
    checkLanguage();
}

init_document();

