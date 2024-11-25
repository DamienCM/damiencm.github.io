import { dictionary } from "./lang/dictionnary.js";
import * as color_theme from "./color-theme.js";
import { getMinValueFromData } from "./utils.js";


const SOLUTION_COLORS = color_theme.SOLUTION_COLORS;
const LEA30_PIE_COLORS = color_theme.LEA30_PIE_COLORS;
const MAIN_PIE_COLOR = color_theme.MAIN_PIE_COLOR;
const EMBARQUE_PIE_COLORS = color_theme.EMBARQUE_PIE_COLORS;


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

    const showMoreButton = document.createElement('p');
    showMoreButton.classList.add('text-primary');
    showMoreButton.style.cursor = 'pointer';
    showMoreButton.textContent = "+ Voir plus d'informations sur les résultats";

    const showLessButton = document.createElement('p');
    showLessButton.classList.add('text-primary');
    showLessButton.style.cursor = 'pointer';
    showLessButton.textContent = "- Voir moins d'informations sur les résultats";
    showLessButton.style.display = 'none'; // Caché par défaut

    // Gestion des clics sur les boutons
    showMoreButton.onclick = () => {
        hiddenSections.forEach(section => section.classList.add('visible')); // Ajoute la classe 'visible'
        showMoreButton.style.display = 'none'; // Cache le bouton "voir plus"
        showLessButton.style.display = 'inline'; // Affiche le bouton "voir moins"
    };

    showLessButton.onclick = () => {
        hiddenSections.forEach(section => section.classList.remove('visible')); // Retire la classe 'visible'
        showLessButton.style.display = 'none'; // Cache le bouton "voir moins"
        showMoreButton.style.display = 'inline'; // Réaffiche le bouton "voir plus"
    };

    // Ajoutez les boutons après le titre "Résultats"
    buttonsContainer.appendChild(showMoreButton);
    buttonsContainer.appendChild(showLessButton);

    const resultsTitle = document.getElementById('results-title');
    resultsTitle.insertAdjacentElement('afterend', buttonsContainer); // Insère les boutons après le titre "Résultats"

    // Initialisation des sections cachées
    hiddenSections.forEach(section => section.classList.remove('visible')); // Masque les sections
}

// Fonction pour afficher un graphique en barres empilées
export function displayResultsBarGraph(chart_data) {
    const ctx = document.getElementById('bar-chart').getContext('2d');
    console.log(chart_data["LEA30S"].cout_consommable);
    console.log(chart_data["LEA30S"].cout_main_d_oeuvre);
    console.log(chart_data["LEA30S"].cout_total);
    console.log(SOLUTION_COLORS[0].backgroundColor);
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
    const bar_graph = new Chart(ctx, {
        type: 'bar',
        data,
        options
    });

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
export function displayResultsCurveGraph(chart_data) {
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

    // Création du graphique
    const curve_chart = new Chart(ctx, {
        type: 'line',
        data,
        options
    });

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
}

export function displayPieCharts(chart_data) {
    // Conteneurs des graphiques pour chaque solution
    const solutions = [
        { name: 'LEA30', checkboxId: 'lea30-checkbox', containerId: 'lea30-pie-container', main: 'pie-chart-lea30-main', consommable: 'pie-chart-lea30-consommable', colors: LEA30_PIE_COLORS, name_fancy: "LEA30s" },
        { name: 'EMBARQUE', checkboxId: 'bobine-embarquee-checkbox', containerId: 'bobine-pie-container', main: 'pie-chart-bobine-main', consommable: 'pie-chart-bobine-consommable', colors: EMBARQUE_PIE_COLORS, name_fancy: "Outil à bobine embarquée" },
        { name: 'MAIN', checkboxId: 'manuelle-checkbox', containerId: 'manuelle-pie-container', main: 'pie-chart-manuelle-main', consommable: 'pie-chart-manuelle-consommable', colors: MAIN_PIE_COLOR, name_fancy: "Attache manuelle" }
    ];

    // Données fictives pour les détails
    const detailsMainOeuvre = {
        LEA30: chart_data.LEA30S.detail_main_d_oeuvre, // Exemple : [Temps attache, Temps pause]
        EMBARQUE: chart_data.EMBARQUE.detail_main_d_oeuvre,
        MAIN: chart_data.MAIN.detail_main_d_oeuvre
    };
    const labelMainOeuvre = chart_data.LEA30S.detail_main_d_oeuvre_label;
    const labelConsommable = chart_data.LEA30S.detail_consommable_label;

    const detailsConsommable = {
        LEA30: chart_data.LEA30S.detail_consommable, // Exemple : [Corde, Autres consommables]
        EMBARQUE: chart_data.EMBARQUE.detail_consommable,
        MAIN: chart_data.MAIN.detail_consommable
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Répartition des coûts',
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
        maintainAspectRatio: false
    };

    // Fonction pour trier les données d'un PieChart
    function sortPieChartData(chartData) {
        // Regroupe les données et les étiquettes
        console.log(chartData);
        const combined = chartData.labels.map((label, index) => ({
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

    // Crée les camemberts pour chaque solution
    solutions.forEach(solution => {
        const ctxMain = document.getElementById(solution.main).getContext('2d');
        const ctxConsommable = document.getElementById(solution.consommable).getContext('2d');

        // Données pour le détail main d'œuvre
        const mainOeuvreData = {
            labels: labelMainOeuvre,
            datasets: [{
                data: detailsMainOeuvre[solution.name],
                backgroundColor: solution.colors
            }]
        };

        // Données pour le détail consommable
        const consommableData = {
            labels: labelConsommable,
            datasets: [{
                data: detailsConsommable[solution.name],
                backgroundColor: solution.colors
            }]
        };

        // Trie des données
        const sortedMainOeuvreData = sortPieChartData(mainOeuvreData);
        const sortedConsommableData = sortPieChartData(consommableData);

        // Création du camembert pour Main d'œuvre
        new Chart(ctxMain, {
            type: 'pie',
            data: sortedMainOeuvreData,
            options: {
                ...options, plugins: {
                    legend: {
                        display : false
                    },
                    title: { display: true, text: `Main d'oeuvre`, font: { size: 18 } },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const label = tooltipItem.label || '';
                                const value = tooltipItem.raw; // Accède à la valeur brute
                                return `${label}: ${value} h`; // Ajoute l'unité ici
                            }
                        }
                    }
                }
            }
        });

        // Création du camembert pour Consommable
        new Chart(ctxConsommable, {
            type: 'pie',
            data: sortedConsommableData,
            options: {
                ...options, plugins: {
                    legend: {
                        display : false
                    },
                    title: { display: true, text: `Consommable`, font: { size: 18 } },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const label = tooltipItem.label || '';
                                const value = tooltipItem.raw; // Accède à la valeur brute
                                return `${label}: ${value} €`; // Ajoute l'unité ici
                            }
                        }
                    }
                }
            }
        });
    });

    // Gestion de la visibilité des camemberts avec les checkboxes
    function togglePieCharts(solutionIndex, visible) {
        const container = document.getElementById(solutions[solutionIndex].containerId);
        container.style.display = visible ? 'flex' : 'none';
    }

    // Initialisation des camemberts avec les états des checkboxes
    solutions.forEach((solution, index) => {
        const checkbox = document.getElementById(solution.checkboxId);
        togglePieCharts(index, checkbox.checked);

        // Attache l'événement de changement
        checkbox.addEventListener('change', function () {
            togglePieCharts(index, this.checked);
        });
    });

    // Texte Cliquable "Voir plus / Voir moins"
    const toggleText = document.getElementById('toggle-pie-charts');
    const container = document.getElementById('pie-charts-container');

    toggleText.addEventListener('click', function () {
        if (container.classList.contains('visible')) {
            container.classList.remove('visible'); // Réduit avec transition
            toggleText.textContent = "+ Voir le detail des main d'oeuvre et du consommable";
        } else {
            container.classList.add('visible'); // Étend avec transition
            toggleText.textContent = '- Voir moins';
        }
    });


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