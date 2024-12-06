import { dictionary } from "../lang/dictionary.js";
import * as color_theme from "./color-theme.js";
import { getMinValueFromData } from "./utils.js";
import * as chart from "./chart.js";


const SOLUTION_COLORS = color_theme.SOLUTION_COLORS;
const LEA30_PIE_COLORS = color_theme.LEA30_PIE_COLORS;
const MAIN_PIE_COLOR = color_theme.MAIN_PIE_COLOR;
const EMBARQUE_PIE_COLORS = color_theme.EMBARQUE_PIE_COLORS;
export const ERROR_KEY_NBR_JRS = "temps_parcelle";
export const ERROR_KEY_NBR_ATTACHES = "nbre_attaches";
export const ERROR_KEY_LANG_NOT_AVAILABLE = "language_not_available";
export const WARNING_KEY_LANG_NOT_VERIFIED = "language_not_verified";
export const WARNING_KEY_PHOTOD = "photo";
export const WARNING_KEY_PVC = "pvc";
const dangerModalElement = document.getElementById('dangerModal');
let dangerModalBody = document.getElementById("dangerModalBody");
let dangerModalLabel = document.getElementById("dangerModalLabel");
const warningModalElement = document.getElementById('warningModal');
let warningModalBody = document.getElementById("warningModalBody");
let warningModalLabel = document.getElementById("warningModalLabel");


let showMoreButtonRaw = null;
let showLessButtonRaw = null;
let showMoreLessPieChart = null;
let pieChartContainer = null;
let language = null;



function addData(chart, newData) {
    // chart.data.labels.push(label);
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(newData.dataset);
    // });
    chart.data = newData;
    chart.update();
    return chart;
}

function addDataPieChart(chart, newData) {
    // chart.data.labels.push(label);
    chart.data = newData;
    chart.update();
    return chart;
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
    return chart;
}

function change_options(chart, new_options) {
    chart.options = new_options;
    chart.update();
    return chart;
}

export function set_language(lang) {
    language = lang;
}


export function success_email() {
    const popup = document.getElementById("notificationPopup");
    const popupContent = document.getElementById("popupContent");
    const popupIcon = document.getElementById("popupIcon");

    // Configure le popup pour un succès
    popupContent.style.backgroundColor = "#d4edda"; // Light green background
    popupIcon.className = "bi bi-check-circle-fill fs-1"; // Icône de succès
    popupIcon.style.color = "green";
    popupIcon.textContent = "✓"; // Icône de succès

    popup.style.display = "block";

    // Masquer le popup après 3 secondes
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

export function error_email() {
    // alert("Une erreur s'est produite.");
    const popup = document.getElementById("notificationPopup");
    const popupContent = document.getElementById("popupContent");
    const popupIcon = document.getElementById("popupIcon");

    // Configure le popup pour une erreur
    popupContent.style.backgroundColor = "#f8d7da"; // Light red background
    popupIcon.className = "bi bi-x-circle-fill fs-1"; // Error icon
    popupIcon.style.color = "red";
    popupIcon.textContent = "✗"; // Icône d'erreur
    // Afficher le popup
    popup.style.display = "block";

    // Masquer le popup après 3 secondes
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}


export function loading_email(status) {
    // Fonction pour afficher l'état de chargement
    const popup = document.getElementById("awaiting-notificationPopup");
    const popupContent = document.getElementById("awaiting-popupContent");
    const popupIcon = document.getElementById("awaiting-popupIcon");

    // Configure le popup pour le chargement
    popupContent.style.backgroundColor = "#e5f1ff"; // Light blue background
    popupIcon.className = "bi bi-hourglass-split fs-1"; // Icône de chargement (utiliser Bootstrap Icons)
    popupIcon.style.color = "#6c757d"; // Couleur grise
    popupIcon.textContent = "⌛"; // Texte de chargement ou icône

    // Afficher le popup
    if (status){
        popup.style.display = "block";
    }
    else{
        popup.style.display = "none";
    }
}


export function loadInputFields() {
    console.log("Loading extra fields");
    const inputContainer = document.getElementById('input-fields');
    inputContainer.innerHTML = '';

    dictionary[language].inputFields.forEach((field, index) => {
        // Vérifie si le champ est "Bobine" (le dernier champ dans la liste)
        if (index === dictionary[language].inputFields.length - 1) {
            // Crée un menu déroulant pour le champ "Bobine"
            inputContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="illustrated-field">
                    <img src="${dictionary[language].inputFieldsIllustration[index]}" height="300" width="300" class="img-fluid my-3">
                    <div class="form-group">
                        <label>${field}
                            <span class="help-icon">
                                ?
                                <span class="tooltip-content">
                                    ${dictionary[language].tooltips[index]}
                                </span>
                            </span>
                        </label>
                        <select class="form-control" id="input-${index}">
                            <option value="A">${dictionary[language].bobineOptions[0]}</option>
                            <option value="B">${dictionary[language].bobineOptions[1]}</option>
                            <option value="C">${dictionary[language].bobineOptions[2]}</option>
                        </select>
                    </div>
                </div>
            </div>`;
        } else {
            // Pour tous les autres champs, crée un champ numérique
            inputContainer.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="illustrated-field">
                    <img src="${dictionary[language].inputFieldsIllustration[index]}" height="300" width="300" class="img-fluid my-3">
                    <div class="form-group">
                        <label>${field}
                            <span class="help-icon">
                                ?
                                <span class="tooltip-content">
                                    ${dictionary[language].tooltips[index]}
                                </span>
                            </span>
                        </label>
                        <input type="number" class="form-control" id="input-${index}" value="${dictionary[language].defaultValues[index]}">
                    </div>
                </div>
            </div>`;
        }
    });
    // Ajoute l'événement après l'insertion du HTML
    attachTooltipEvents();
}

export function loadExtraOptions() {
    const inputContainer = document.getElementById('extra-options');
    inputContainer.innerHTML = '';

    dictionary[language].extraOptions.forEach((field, index) => {
        inputContainer.innerHTML += `
            <div class="form-group">
                <label>${field}
                    <span class="help-icon">
                        ?
                        <span class="tooltip-content-extra-options">
                            ${dictionary[language].tooltipsExtra[index]}
                        </span>
                    </span>
                </label>
                <input type="number" class="form-control" id="input-extra-${index}" value="${dictionary[language].defaultValuesExtra[index]}">
            </div>`;
    });
}

export function displayResultsRaw(results) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block'; // Rendre visible la section des résultats

    const mainValuesContainer = document.getElementById('main-values-results');
    const extraResultsContainer = document.getElementById('extra-results');

    // Réinitialiser les contenus
    mainValuesContainer.innerHTML = '';
    extraResultsContainer.innerHTML = '';

    let currentSection = null; // Pointeur pour la section en cours

    for (const [key, value] of Object.entries(results)) {
        if (value[1] && (value[1].startsWith("_") || value[1].startsWith("%"))) {
            const sectionTitle = value[1].replace("_", "").replace("%", "").trim(); // Retire les marqueurs

            // Créer une nouvelle section
            currentSection = document.createElement('div');
            const sectionHeader = document.createElement('h5');
            sectionHeader.innerHTML = `<u>${sectionTitle || "Section"}</u>`;
            currentSection.appendChild(sectionHeader);

            // Définir la destination en fonction du marqueur
            if (value[1].startsWith("_")) {
                // currentSection.classList.add('results-section-container'); // Section supplémentaire
                extraResultsContainer.appendChild(currentSection);
            } else if (value[1].startsWith("%")) {
                // currentSection.classList.add('results-section-container', 'visible'); // Section principale
                mainValuesContainer.appendChild(currentSection);
            }
        } else if (currentSection) {
            // Ajouter les résultats à la section actuelle
            const resultElement = document.createElement('p');
            if (isNaN(value[0])) {
                resultElement.innerHTML = `<strong>${value[1]}:</strong> ${value[0]} ${value[2]}`;
            } else {
                resultElement.innerHTML = `<strong>${value[1]}:</strong> ${Number(value[0]).toFixed(value[3])} ${value[2]}`;
            }
            currentSection.appendChild(resultElement);
        }
    }
}

// Fonction pour afficher un graphique en barres empilées
export function displayResultsBarGraph(chart_data, bar_graph, state_checkboxes) {
    // Initialisation des solutions avec l'état des checkboxes
    const solutions = [
        { checkboxId: 'lea30-checkbox', index: 0 },
        { checkboxId: 'bobine-embarquee-checkbox', index: 1 },
        { checkboxId: 'manuelle-checkbox', index: 2 }
    ];
    const ctx = document.getElementById('bar-chart').getContext('2d');
    // console.log(chart_data["LEA30S"].cout_consommable);
    // console.log(chart_data["LEA30S"].cout_main_d_oeuvre);
    // console.log(chart_data["LEA30S"].cout_total);
    // console.log(SOLUTION_COLORS[0].backgroundColor);
    let data = {
        labels: [dictionary[language].LEA30_barchart_label, dictionary[language].embarquee_barchart_label, dictionary[language].manuelle_barchart_label],
        datasets: [
            {
                label: dictionary[language].consommable_barchart,
                data: [
                    chart_data["LEA30S"].cout_consommable,
                    chart_data["EMBARQUE"].cout_consommable,
                    chart_data["MAIN"].cout_consommable
                ],
                backgroundColor: [
                    SOLUTION_COLORS[0].backgroundColor,
                    SOLUTION_COLORS[1].backgroundColor,
                    SOLUTION_COLORS[2].backgroundColor
                ]
            },
            {
                label: dictionary[language].main_d_oeuvre_barchart,
                data: [
                    chart_data["LEA30S"].cout_main_d_oeuvre,
                    chart_data["EMBARQUE"].cout_main_d_oeuvre,
                    chart_data["MAIN"].cout_main_d_oeuvre
                ],
                backgroundColor: [
                    SOLUTION_COLORS[0].backgroundColorLight,
                    SOLUTION_COLORS[1].backgroundColorLight,
                    SOLUTION_COLORS[2].backgroundColorLight
                ]
            }
        ]
    };

    let options = {
        plugins: {
            title: {
                display: true,
                text: dictionary[language].cout_annuel_barchart,
                font: {
                    size: 12 // Taille de la police en pixels
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                // callbacks: {
                //     label: function (tooltipItem) {
                //         const label = tooltipItem.label || '';
                //         const value = tooltipItem.raw; // Accède à la valeur brute
                //         return `${label}: ${value} €`; // Ajoute l'unité ici
                //     }
                // }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: dictionary[language].cout_euros_barchart_yaxis,
                }
            }
        }
    };


    // Création du graphique
    if (bar_graph === null) {
        // console.log("Creating new graph");
        bar_graph = new Chart(ctx, {
            type: 'bar',
            data,
            options
        });
    }
    else { // Edition du graph
        // console.log("Changing graph data");
        bar_graph = removeData(bar_graph);
        bar_graph = addData(bar_graph, data);
    }
    // Fonction pour gérer la visibilité des solutions
    function toggleSolution(index, visible) {
        // Met à jour le dataset correspondant uniquement
        let checked = [
            document.getElementById(solutions[0].checkboxId).checked,
            document.getElementById(solutions[1].checkboxId).checked,
            document.getElementById(solutions[2].checkboxId).checked
        ];
        let display_labels = [];
        let dataset_consommable = [];
        let dataset_main_oeuvre = [];
        let bg_colors_consommable = [];
        let bg_colors_main_oeuvre = [];

        if (checked[0]) {
            display_labels.push(dictionary[language].LEA30_barchart_label);
            dataset_consommable.push(chart_data["LEA30S"].cout_consommable);
            dataset_main_oeuvre.push(chart_data["LEA30S"].cout_main_d_oeuvre);
            bg_colors_consommable.push(SOLUTION_COLORS[0].backgroundColor);
            bg_colors_main_oeuvre.push(SOLUTION_COLORS[0].backgroundColorLight);
        }
        if (checked[1]) {
            display_labels.push(dictionary[language].embarquee_barchart_label);
            dataset_consommable.push(chart_data["EMBARQUE"].cout_consommable);
            dataset_main_oeuvre.push(chart_data["EMBARQUE"].cout_main_d_oeuvre);
            bg_colors_consommable.push(SOLUTION_COLORS[1].backgroundColor);
            bg_colors_main_oeuvre.push(SOLUTION_COLORS[1].backgroundColorLight);

        }
        if (checked[2]) {
            display_labels.push(dictionary[language].manuelle_barchart_label);
            dataset_consommable.push(chart_data["MAIN"].cout_consommable);
            dataset_main_oeuvre.push(chart_data["MAIN"].cout_main_d_oeuvre);
            bg_colors_consommable.push(SOLUTION_COLORS[2].backgroundColor);
            bg_colors_main_oeuvre.push(SOLUTION_COLORS[2].backgroundColorLight);
        }
        bar_graph.data.labels = display_labels;
        bar_graph.data.datasets[0].data = dataset_consommable;
        bar_graph.data.datasets[0].backgroundColor = bg_colors_consommable;
        bar_graph.data.datasets[1].data = dataset_main_oeuvre;
        bar_graph.data.datasets[1].backgroundColor = bg_colors_main_oeuvre;
        bar_graph.update(); // Met à jour le graphique
    }



    solutions.forEach(solution => {
        const checkbox = document.getElementById(solution.checkboxId);

        // Initialise la visibilité en fonction de l'état initial de la checkbox
        toggleSolution(solution.index, checkbox.checked);

        // Ajoute un écouteur pour mettre à jour dynamiquement
        checkbox.addEventListener('change', function () {
            toggleSolution(solution.index, this.checked);
        });
    });

    return bar_graph;
}

// Fonction pour afficher un graphique en courbes
export function displayResultsCurveGraph(chart_data, curve_chart) {
    const ctx = document.getElementById('curve-chart').getContext('2d');

    // Données fictives pour 3 solutions
    const data = {
        labels: [
            dictionary[language].annee_curve_chart + "1",
            dictionary[language].annee_curve_chart + "2",
            dictionary[language].annee_curve_chart + "3",
            dictionary[language].annee_curve_chart + "4",
            dictionary[language].annee_curve_chart + "5",
            dictionary[language].annee_curve_chart + "6",
            dictionary[language].annee_curve_chart + "7",
            dictionary[language].annee_curve_chart + "8",
            dictionary[language].annee_curve_chart + "9"
        ],
        datasets: [
            {
                label: dictionary[language].label_lea30s_curve_chart,
                data: chart_data["LEA30S"].cout_cummulatif, // Coût cumulatif
                borderColor: SOLUTION_COLORS[0].borderColor,
                backgroundColor: SOLUTION_COLORS[0].backgroundColorLight,
                fill: false
            },
            {
                label: dictionary[language].label_embarquee_curve_chart,
                data: chart_data["EMBARQUE"].cout_cummulatif,
                borderColor: SOLUTION_COLORS[1].borderColor,
                backgroundColor: SOLUTION_COLORS[1].backgroundColorLight,
                fill: false
            },
            {
                label: dictionary[language].label_manuelle_curve_chart,
                data: chart_data["MAIN"].cout_cummulatif,
                borderColor: SOLUTION_COLORS[2].borderColor,
                backgroundColor: SOLUTION_COLORS[2].backgroundColorLight,
                fill: false
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: dictionary[language].cout_par_solution_curve_chart,
                font: {
                    size: 18 // Taille de la police en pixels
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw; // Accède à la valeur brute
                        return `${label}: ${value} ${dictionary[language].devise_curve_chart}`; // Ajoute l'unité ici
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false,
                title: {
                    display: true,
                    text: dictionary[language].annees_curve_chart
                }
            },
            y: {
                stacked: false,
                min: getMinValueFromData(data.datasets) - 500, // Ajuste la limite inférieure
                title: {
                    display: true,
                    text: dictionary[language].cout_euros_curve_chart_yaxis,
                }
            }
        }
    };

    if (curve_chart === null) {
        // Création du graphique
        curve_chart = new Chart(ctx, {
            type: 'line',
            data,
            options
        });
    }
    else { // Edition du graph
        // console.log("Changing graph data");
        curve_chart = removeData(curve_chart);
        curve_chart = addData(curve_chart, data);
    }
    // Initialisation et gestion de la visibilité des courbes avec les checkboxes
    const solutions = [
        { checkboxId: 'lea30-checkbox', datasetIndex: 0 },
        { checkboxId: 'bobine-embarquee-checkbox', datasetIndex: 1 },
        { checkboxId: 'manuelle-checkbox', datasetIndex: 2 }
    ];

    solutions.forEach(solution => {
        const checkbox = document.getElementById(solution.checkboxId);

        // Initialise la visibilité des courbes en fonction de l'état des checkboxes
        curve_chart.data.datasets[solution.datasetIndex].hidden = !checkbox.checked;

        // Ajoute un écouteur pour mettre à jour la visibilité des courbes
        checkbox.addEventListener('change', function () {
            curve_chart.data.datasets[solution.datasetIndex].hidden = !this.checked;
            curve_chart.update();
        });
    });

    curve_chart.update(); // Applique les modifications initiales
    return curve_chart;
}

export function displayPieCharts(chart_data, pie_charts) {
    if (pie_charts === null) {
        pie_charts = [
            [null, null],
            [null, null],
            [null, null]
        ];
    }
    // Conteneurs des graphiques pour chaque solution
    let solutions = [
        { name: 'LEA30', checkboxId: 'lea30-checkbox', containerId: 'lea30-pie-container', main: 'pie-chart-lea30-main', consommable: 'pie-chart-lea30-consommable', colors: LEA30_PIE_COLORS, name_fancy: "LEA30s" },
        { name: 'EMBARQUE', checkboxId: 'bobine-embarquee-checkbox', containerId: 'bobine-pie-container', main: 'pie-chart-bobine-main', consommable: 'pie-chart-bobine-consommable', colors: EMBARQUE_PIE_COLORS, name_fancy: "Outil à bobine embarquée" },
        { name: 'MAIN', checkboxId: 'manuelle-checkbox', containerId: 'manuelle-pie-container', main: 'pie-chart-manuelle-main', consommable: 'pie-chart-manuelle-consommable', colors: MAIN_PIE_COLOR, name_fancy: "Attache manuelle" }
    ];

    // Données fictives pour les détails
    let detailsMainOeuvre = {
        LEA30: chart_data.LEA30S.detail_main_d_oeuvre, // Exemple : [Temps attache, Temps pause]
        EMBARQUE: chart_data.EMBARQUE.detail_main_d_oeuvre,
        MAIN: chart_data.MAIN.detail_main_d_oeuvre
    };
    let labelMainOeuvre = chart_data.LEA30S.detail_main_d_oeuvre_label;
    let labelConsommable = chart_data.LEA30S.detail_consommable_label;

    let detailsConsommable = {
        LEA30: chart_data.LEA30S.detail_consommable, // Exemple : [Corde, Autres consommables]
        EMBARQUE: chart_data.EMBARQUE.detail_consommable,
        MAIN: chart_data.MAIN.detail_consommable
    };

    // Fonction pour trier les données d'un PieChart
    function sortPieChartData(chartData) {
        // Regroupe les données et les étiquettes
        // console.log(chartData);
        let combined = chartData.labels.map((label, index) => ({
            label: label,
            value: chartData.datasets[0].data[index],
            color: chartData.datasets[0].backgroundColor[index]
        }));


        // Trie par ordre decroissant des valeurs
        combined.sort((a, b) => b.value - a.value);
        let i = 0;
        combined.forEach(element => {
            i += 1;
            element.color = chartData.datasets[0].backgroundColor[i - 1]
        });

        // Met à jour les données triées
        chartData.labels = combined.map(item => item.label);
        chartData.datasets[0].data = combined.map(item => item.value);
        chartData.datasets[0].backgroundColor = combined.map(item => item.color);

        return chartData;
    }

    let i = 0;
    // Crée les camemberts pour chaque solution
    solutions.forEach(solution => {
        let ctxMain = document.getElementById(solution.main).getContext('2d');
        let ctxConsommable = document.getElementById(solution.consommable).getContext('2d');

        detailsConsommable[solution.name] = detailsConsommable[solution.name].map((number) => Number(number).toFixed(1));

        detailsMainOeuvre[solution.name] = detailsMainOeuvre[solution.name].map((number) => Number(number).toFixed(1));

        // Données pour le détail main d'œuvre
        let mainOeuvreData = {
            labels: labelMainOeuvre,
            datasets: [{
                data: detailsMainOeuvre[solution.name],
                backgroundColor: solution.colors
            }]
        };

        // Données pour le détail consommable
        let consommableData = {
            labels: labelConsommable,
            datasets: [{
                data: detailsConsommable[solution.name],
                backgroundColor: solution.colors
            }]
        };

        // Trie des données
        let sortedMainOeuvreData = sortPieChartData(mainOeuvreData);
        let sortedConsommableData = sortPieChartData(consommableData);

        let options_consommable = {
            plugins: {
                legend: {
                    display: false
                },
                title: { display: true, text: `Consommable`, font: { size: 12 } },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let label = tooltipItem.label || '';
                            let value = tooltipItem.raw; // Accède à la valeur brute
                            return `${label}: ${value} €`; // Ajoute l'unité ici
                        }
                    }
                }
            }
        }

        let options_main_d_oeuvre = {
            plugins: {
                legend: {
                    display: false
                },
                title: { display: true, text: `Main d'oeuvre`, font: { size: 12 } },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let label = tooltipItem.label || '';
                            let value = tooltipItem.raw; // Accède à la valeur brute
                            return `${label}: ${value} h`; // Ajoute l'unité ici
                        }
                    }
                }
            }
        }
        // Création du camembert pour Main d'œuvre
        if (pie_charts[i][0] === null) {
            pie_charts[i][0] = new Chart(ctxMain, {
                type: 'pie',
                data: sortedMainOeuvreData,
                options: options_main_d_oeuvre
            });

            // Création du camembert pour Consommable
            pie_charts[i][1] = new Chart(ctxConsommable, {
                type: 'pie',
                data: sortedConsommableData,
                options: options_consommable
            });
        }
        else {
            pie_charts[i][0] = removeData(pie_charts[i][0]);
            pie_charts[i][1] = removeData(pie_charts[i][1]);
            pie_charts[i][0] = addDataPieChart(pie_charts[i][0], sortedMainOeuvreData);
            pie_charts[i][1] = addDataPieChart(pie_charts[i][1], sortedConsommableData);
            pie_charts[i][0] = change_options(pie_charts[i][0], options_main_d_oeuvre);
            pie_charts[i][1] = change_options(pie_charts[i][1], options_consommable);
        }
        i = i + 1;
    });

    // Gestion de la visibilité des camemberts avec les checkboxes
    function togglePieCharts(solutionIndex, visible) {
        console.log("toggling individual pie-chart");
        console.log(solutions[solutionIndex].containerId);
        let container = document.getElementById(solutions[solutionIndex].containerId);
        if (container.classList.contains('visible')) {
            container.classList.remove('visible');
        }
        else {
            container.classList.add('visible');
        }
        if (visible) {
            container.classList.add('visible');
        }
    }

    // Initialisation des camemberts avec les états des checkboxes
    solutions.forEach((solution, index) => {
        let checkbox = document.getElementById(solution.checkboxId);
        togglePieCharts(index, checkbox.checked);

        // Attache l'événement de changement
        checkbox.addEventListener('change', function () {
            togglePieCharts(index, this.checked);
        });
    });

    // Texte Cliquable "Voir plus / Voir moins"

    // if (showMoreLessPieChart === null) {
    //     showMoreLessPieChart = document.getElementById('toggle-pie-charts');
    //     pieChartContainer = document.getElementById('pie-charts-container');
    //     showMoreLessPieChart.addEventListener('click', function () {
    //         if (pieChartContainer.classList.contains('visible')) {
    //             pieChartContainer.classList.remove('visible'); // Réduit avec transition
    //             showMoreLessPieChart.textContent = "+ Voir le detail des main d'oeuvre et du consommable";
    //         } else {
    //             pieChartContainer.classList.add('visible'); // Étend avec transition
    //             showMoreLessPieChart.textContent = '- Voir moins';
    //         }
    //     });
    // }


    return pie_charts;

}

export function toggleExtraOptions() {
    const extraOptions = document.getElementById('extra-options');
    const showMoreText = document.getElementById('show-more-options');
    const showLessText = document.getElementById('show-less-options');
    const showMoreTextContainer = document.getElementById('show-more-options-container');
    const showLessTextContainer = document.getElementById('show-less-options-container');

    // Vérifie si la section est visible
    if (extraOptions.classList.contains('visible')) {
        extraOptions.classList.remove('visible'); // Masque avec transition
        showMoreTextContainer.classList.add('visible');
        showLessTextContainer.classList.remove('visible');

    } else {
        extraOptions.classList.add('visible'); // Affiche avec transition
        // showMoreText.innerText = dictionary[language].showLessOptions; // Texte "Afficher moins"
        // showLessText.add('visible');
        showMoreTextContainer.classList.remove('visible');
        showLessTextContainer.classList.add('visible');
    }
}

export function toggleExtraResults() {
    console.log("toggle-extra results");

    const extraResultsContainer = document.getElementById('extra-results');
    // const mainResultsContainer = document.getElementById('main-values-results');
    const showMoreButtonContainer = document.getElementById('show-more-results-container');
    const showLessButtonContainer = document.getElementById('show-less-results-container');

    // Basculer la visibilité des résultats supplémentaires
    if (extraResultsContainer.classList.contains('visible')) {
        // mainResultsContainer.classList.remove('visible'); // Masque les résultats supplémentaires
        showMoreButtonContainer.classList.add('visible'); // Affiche "Voir plus"
        extraResultsContainer.classList.remove('visible'); // Masque les résultats supplémentaires
        showLessButtonContainer.classList.remove('visible'); // Cache "Voir moins"
    } else {
        // mainResultsContainer.classList.add('visible'); // Affiche les résultats supplémentaires
        showMoreButtonContainer.classList.remove('visible'); // Cache "Voir plus"
        extraResultsContainer.classList.add('visible'); // Affiche les résultats supplémentaires
        showLessButtonContainer.classList.add('visible'); // Affiche "Voir moins"
    }
}


export function attachTooltipEvents() {
    const helpIcons = document.querySelectorAll('.help-icon');

    helpIcons.forEach(icon => {
        icon.addEventListener('click', function (event) {
            toggleTooltip(icon);
            event.stopPropagation(); // Empêche la fermeture immédiate du tooltip
        });
    });

    // Masquer les tooltips lorsque l'utilisateur clique en dehors d'une icône
    document.addEventListener('click', function (event) {
        helpIcons.forEach(icon => icon.classList.remove('tooltip-active'));
    });
}

export function toggleAllPieCharts() {
    const textTogglePlusContainer = document.getElementById("show-more-pie-chart-container");
    const textToggleMoinsContainer = document.getElementById("show-less-pie-chart-container");
    if (textTogglePlusContainer.classList.contains('visible')) {
        textTogglePlusContainer.classList.remove('visible');
        textToggleMoinsContainer.classList.add('visible');
    }
    else {
        textTogglePlusContainer.classList.add('visible');
        textToggleMoinsContainer.classList.remove('visible');
    }
    console.log("toggleAllPieCharts");
    const pieChartContainer = document.getElementById("pie-charts-container");
    if (pieChartContainer.classList.contains('visible')) {
        pieChartContainer.classList.remove('visible');
    }
    else {
        pieChartContainer.classList.add("visible");

    }
}

export function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

export function toggleTooltip(element) {
    // Vérifier si l'utilisateur est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        element.classList.toggle('tooltip-active'); // Affiche/cache le tooltip au clic
    } else {
        // Sur PC, le tooltip est géré par le survol (CSS `hover`)
        return;
    }
}

export function displayError(key, display_data) {
    //log
    console.log('Error message display');
    // Crée une instance de modal Bootstrap
    let myModal = new bootstrap.Modal(dangerModalElement);
    console.log(myModal);
    switch (key) {
        case ERROR_KEY_NBR_JRS:
            console.log("error nbre jours ");
            dangerModalLabel.textContent = dictionary[language].ERROR_MESSAGES_JRS[0];
            dangerModalBody.textContent = dictionary[language].ERROR_MESSAGES_JRS[1] + display_data[0].toFixed(0) + " " + dictionary[language].jours;
            // Quand le modal se ferme, appeler récursivement pour le suivant
            break;

        case ERROR_KEY_NBR_ATTACHES:
            console.log("error nbre attaches");

            dangerModalLabel.textContent = dictionary[language].ERROR_MESSAGES_ATTACHES[0];
            dangerModalBody.textContent = dictionary[language].ERROR_MESSAGES_ATTACHES[1] + display_data[0].toFixed(0) + " " + dictionary[language].attaches;
            break;

        case ERROR_KEY_LANG_NOT_AVAILABLE:
            console.log("error lang not available");
            dangerModalLabel.textContent = dictionary[language].ERROR_MESSAGES_LANG_NOT_AVAILABLE[0];
            dangerModalBody.textContent = dictionary[language].ERROR_MESSAGES_LANG_NOT_AVAILABLE[1];
            break;
        case WARNING_KEY_PVC:
            dangerModalLabel.textContent = dictionary[language].ERROR_MSG_PVC[0];
            dangerModalBody.textContent = dictionary[language].ERROR_MSG_PVC[1];

            break;
        default:
            break;
    }

    // Affiche le modal
    myModal.show();
    return myModal;
}

export function displayWarning(key, display_data) {
    //log
    console.log('Warning message display');
    // Crée une instance de modal Bootstrap
    let myModal = new bootstrap.Modal(warningModalElement);
    console.log(myModal);
    switch (key) {
        case WARNING_KEY_LANG_NOT_VERIFIED:
            console.log("Warning : Lang not verified");
            warningModalLabel.textContent = dictionary[language].WARNING_MESSAGES_TRADUCTION[0];
            warningModalBody.textContent = dictionary[language].WARNING_MESSAGES_TRADUCTION[1];
            break;
        case WARNING_KEY_PHOTOD:
            warningModalLabel.textContent = dictionary[language].WARNING_MSG_PHOTO[0];
            warningModalBody.textContent = dictionary[language].WARNING_MSG_PHOTO[1];
            break;

        default:
            break;
    }

    // Affiche le modal
    myModal.show();
    return myModal;
}