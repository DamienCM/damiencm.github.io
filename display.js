import { dictionary } from "./lang/dictionnary.js";
import * as color_theme from "./color-theme.js";
import { getMinValueFromData } from "./utils.js";


const SOLUTION_COLORS = color_theme.SOLUTION_COLORS;
const LEA30_PIE_COLORS = color_theme.LEA30_PIE_COLORS;
const MAIN_PIE_COLOR = color_theme.MAIN_PIE_COLOR;
const EMBARQUE_PIE_COLORS = color_theme.EMBARQUE_PIE_COLORS;
const WARNING_KEY_NBR_JRS = "temps_parcelle";
const WARNING_KEY_NBR_ATTACHES = "nbre_attaches";

const WARNING_MESSAGES_JRS = ["Attention !", "Temps pour la parcelle important : "];
const WARNING_MESSAGES_ATTACHES = ["Attention !", "Revision requise au cours de la saison. Nombre total d'attaches requise par outil : "];
const modalElement = document.getElementById('dangerModal');
let dangerModalBody = document.getElementById("dangerModalBody");
let dangerModalLabel = document.getElementById("dangerModalLabel");
let showMoreButtonRaw = null;
let showLessButtonRaw = null;
let showMoreLessPieChart = null;
let pieChartContainer = null;




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



export function loadInputFields(language) {
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

export function loadExtraOptions(language) {
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

export function displayResultsRaw(results, language) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block'; // Rendre visible la section des résultats

    const resultsSummary = document.getElementById('results-summary');
    resultsSummary.innerHTML = ''; // Réinitialise le contenu

    let currentSection = null; // Pointeur pour la section en cours
    const hiddenSections = []; // Stocke les sections à cacher

    for (const [key, value] of Object.entries(results)) {
        if (value[1] && value[1].startsWith("_")) {
            const sectionTitle = value[1].replace("_", "").trim(); // Retire les "_"
            currentSection = document.createElement('div');
            currentSection.classList.add('results-section');

            // Ajoute une classe pour identifier les sections non "Total"
            if (sectionTitle !== "Total LEA30s") {
                currentSection.classList.add('hidden-section'); // Classe pour transition
                hiddenSections.push(currentSection); // Ajoute aux sections cachées
            }

            const sectionHeader = document.createElement('h5');
            sectionHeader.innerHTML = `<u>${sectionTitle || "Section"}</u>`;
            currentSection.appendChild(sectionHeader);
            resultsSummary.appendChild(currentSection);
        } else if (currentSection) {
            const resultElement = document.createElement('p');
            if (isNaN(value[0])) {
                resultElement.innerHTML = `<strong>${value[1]}:</strong> ${value[0]} ${value[2]}`;
            } else {
                resultElement.innerHTML = `<strong>${value[1]}:</strong> ${Number(value[0]).toFixed(value[3])} ${value[2]}`;
            }
            currentSection.appendChild(resultElement);
        }
    }

    // Ajouter les boutons "+voir plus" et "voir moins"
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('results-buttons');

    if (showMoreButtonRaw === null) {
        showMoreButtonRaw = document.createElement('p');
        showMoreButtonRaw.classList.add('text-primary');
        showMoreButtonRaw.style.cursor = 'pointer';
        showMoreButtonRaw.textContent = "+ Voir plus d'informations sur les résultats";
        showMoreButtonRaw.style.display = 'inline';
    }
    if (showLessButtonRaw === null) {
        showLessButtonRaw = document.createElement('p');
        showLessButtonRaw.classList.add('text-primary');
        showLessButtonRaw.style.cursor = 'pointer';
        showLessButtonRaw.textContent = "- Voir moins d'informations sur les résultats";
        showLessButtonRaw.style.display = 'none'; // Caché par défaut
    }

    // Gestion des clics sur les boutons
    showMoreButtonRaw.onclick = () => {
        hiddenSections.forEach(section => section.classList.add('visible')); // Ajoute la classe 'visible'
        showMoreButtonRaw.style.display = 'none'; // Cache le bouton "voir plus"
        showLessButtonRaw.style.display = 'inline'; // Affiche le bouton "voir moins"
    };

    showLessButtonRaw.onclick = () => {
        hiddenSections.forEach(section => section.classList.remove('visible')); // Retire la classe 'visible'
        showLessButtonRaw.style.display = 'none'; // Cache le bouton "voir moins"
        showMoreButtonRaw.style.display = 'inline'; // Réaffiche le bouton "voir plus"
    };

    // Ajoutez les boutons après le titre "Résultats"
    buttonsContainer.appendChild(showMoreButtonRaw);
    buttonsContainer.appendChild(showLessButtonRaw);

    const resultsTitle = document.getElementById('results-title');
    resultsTitle.insertAdjacentElement('afterend', buttonsContainer); // Insère les boutons après le titre "Résultats"

    // Initialisation des sections cachées
    if (showMoreButtonRaw.style.display === 'inline') { //menu contracte
        // console.log("masquer les sections")
        hiddenSections.forEach(section => section.classList.remove('visible')); // Masque les sections
    }
    else {
        hiddenSections.forEach(section => section.classList.add('visible')); // Masque les sections
    }
}

// Fonction pour afficher un graphique en barres empilées
export function displayResultsBarGraph(chart_data, bar_graph) {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    // console.log(chart_data["LEA30S"].cout_consommable);
    // console.log(chart_data["LEA30S"].cout_main_d_oeuvre);
    // console.log(chart_data["LEA30S"].cout_total);
    // console.log(SOLUTION_COLORS[0].backgroundColor);
    let data = {
        labels: ['LEA30s', 'Outil à bobine embarquée', 'Attache manuelle'],
        datasets: [
            {
                label: 'Consommable',
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
                label: "Main d'oeuvre",
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
                text: "Coûts annuel par solution (consommables et main d'oeuvre)",
                font: {
                    size: 18 // Taille de la police en pixels
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
                    text: 'Coût (€)'
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
        bar_graph.data.datasets[0].data[index] = visible
            ? chart_data[Object.keys(chart_data)[index]].cout_consommable
            : 0; // Met à jour uniquement la valeur "Consommable"

        bar_graph.data.datasets[1].data[index] = visible
            ? chart_data[Object.keys(chart_data)[index]].cout_main_d_oeuvre
            : 0; // Met à jour uniquement la valeur "Main d'œuvre"

        bar_graph.update(); // Met à jour le graphique
    }

    // Initialisation des solutions avec l'état des checkboxes
    const solutions = [
        { checkboxId: 'lea30-checkbox', index: 0 },
        { checkboxId: 'bobine-embarquee-checkbox', index: 1 },
        { checkboxId: 'manuelle-checkbox', index: 2 }
    ];

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
        labels: ['Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5', 'Année 6', 'Année 7', 'Année 8', 'Année 9'],
        datasets: [
            {
                label: 'LEA30s',
                data: chart_data["LEA30S"].cout_cummulatif, // Coût cumulatif
                borderColor: SOLUTION_COLORS[0].borderColor,
                backgroundColor: SOLUTION_COLORS[0].backgroundColorLight,
                fill: false
            },
            {
                label: 'Outil à bobine embarquée',
                data: chart_data["EMBARQUE"].cout_cummulatif,
                borderColor: SOLUTION_COLORS[1].borderColor,
                backgroundColor: SOLUTION_COLORS[1].backgroundColorLight,
                fill: false
            },
            {
                label: 'Attache manuelle',
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
                text: 'Coûts par solution',
                font: {
                    size: 18 // Taille de la police en pixels
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw; // Accède à la valeur brute
                        return `${label}: ${value} €`; // Ajoute l'unité ici
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
                    text: 'Années'
                }
            },
            y: {
                stacked: false,
                min: getMinValueFromData(data.datasets) - 5000, // Ajuste la limite inférieure
                title: {
                    display: true,
                    text: 'Coût (€)'
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

    // OUTDATED ?
    // let options = {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Répartition des coûts',
    //             font: {
    //                 size: 18 // Taille de la police en pixels
    //             }
    //         },
    //         tooltip: {
    //             callbacks: {
    //                 label: function (tooltipItem) {
    //                     let label = tooltipItem.label || '';
    //                     let value = tooltipItem.raw; // Accède à la valeur brute
    //                     return `${label}: ${value} €`; // Ajoute l'unité ici
    //                 }
    //             }
    //         }
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false
    // };

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
                title: { display: true, text: `Consommable`, font: { size: 18 } },
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
                title: { display: true, text: `Main d'oeuvre`, font: { size: 18 } },
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
        let container = document.getElementById(solutions[solutionIndex].containerId);
        container.style.display = visible ? 'flex' : 'none';
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

    if (showMoreLessPieChart === null) {
        showMoreLessPieChart = document.getElementById('toggle-pie-charts');
        pieChartContainer = document.getElementById('pie-charts-container');
        showMoreLessPieChart.addEventListener('click', function () {
            if (pieChartContainer.classList.contains('visible')) {
                pieChartContainer.classList.remove('visible'); // Réduit avec transition
                showMoreLessPieChart.textContent = "+ Voir le detail des main d'oeuvre et du consommable";
            } else {
                pieChartContainer.classList.add('visible'); // Étend avec transition
                showMoreLessPieChart.textContent = '- Voir moins';
            }
        });
    }


    return pie_charts;

}

export function toggleExtraOptions() {
    const extraOptions = document.getElementById('extra-options');
    const showMoreText = document.getElementById('show-more-options');

    // Vérifie si la section est visible
    if (extraOptions.classList.contains('visible')) {
        extraOptions.classList.remove('visible'); // Masque avec transition
        showMoreText.innerText = '+ Afficher plus d\'options'; // Texte "Afficher plus"
    } else {
        extraOptions.classList.add('visible'); // Affiche avec transition
        showMoreText.innerText = '- Afficher moins d\'options'; // Texte "Afficher moins"
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


export function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}
//

// function toggleTooltip(element) {
//     element.classList.toggle('tooltip-active');
// }

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


export function displayWarning(warning_type, display_data) {
    //log
    // console.log('Warning message display');
    // Crée une instance de modal Bootstrap
    let myModal = new bootstrap.Modal(modalElement);
    switch (warning_type) {
        case WARNING_KEY_NBR_JRS:
            dangerModalLabel.textContent = WARNING_MESSAGES_JRS[0];
            dangerModalBody.textContent = WARNING_MESSAGES_JRS[1] + display_data[0].toFixed(0) + " jours";
            // Quand le modal se ferme, appeler récursivement pour le suivant
            break;

        case WARNING_KEY_NBR_ATTACHES:
            dangerModalLabel.textContent = WARNING_MESSAGES_ATTACHES[0];
            dangerModalBody.textContent = WARNING_MESSAGES_ATTACHES[1] + display_data[0].toFixed(0) + " attaches";
            break;


        default:
            break;
    }

    // Affiche le modal
    myModal.show();
    return myModal;
}