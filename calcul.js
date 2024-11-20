let language = 'fr';

const bobines= {
    A : {
        Type : "Papier",
        Taille : "1x40",
        Prix : 11.80,
        Prix_embarque: 64./60.,
        Nombre_lien_bobine : 3200.,
        Nombre_lien_bobine_embarque : 450.,
        Longueur : "x",
        Biodegradable : "Oui",
    },
    B : {
        Type : "Photo",
        Taille : "1x40",
        Prix : 9.00,
        Nombre_lien_bobine : 2500.,
        Longueur : "x",
        Biodegradable : "Moyen",
    },
    C : {
        Type : "PVC",
        Taille : "1x40",
        Prix : 9.25,
        Nombre_lien_bobine : 2500.,
        Longueur : "x",
        Biodegradable : "Non",
    }
}

const dictionary = {
    English: {
        pageTitle: "LEA30s Cost calculator",
        launchCalculation: "Launch Calculation",
        resultsTitle: "Results",
        inputFields: ["Surface hA :", "Vine plants per hectare :", "Number of ties per plant :", "Hourly cost of an employee (€) :", "Number of employee", "Spool"],
        inputFieldsIllustration: ["lang/en/illustrations/surface.png", "lang/en/illustrations/ceps-ha.png", "lang/en/illustrations/ties.png", "lang/en/illustrations/hourly-cost.png", "lang/en/illustrations/workers.png", "lang/en/illustrations/spool.png",],
        defaultValues: [10, 2000, 5, 20, 2, null],
        errorInputs: "Some fields are incorrects.",
        tooltips: [1, 2, 3, 4, 5, 6],
        moreOptions: ["+ Show more"],
        lessOptions: ["- Show less"],
        extraOptions: ["Displacement time", "Tool time to attach", "Spool change time", "Tool price", "Revision cost", "Work time per day"],
        defaultValuesExtra: [5, 0.6, 120, 1280, 125, 10],
        tooltipsExtra: [0,0,0,0,0,0,0,0,0],
        bobineOptions: ["Paper", "PVC", "Photo"] // Options spécifiques à "Spool"

    },
    Francais: {
        pageTitle: "Calculateur LEA30s",
        launchCalculation: "Lancer le calcul",
        resultsTitle: "Résultats",
        inputFields: ["Superficie ha :", "Pieds de vigne à l'hectare :", "Nombre d'attaches par pied :", "Cout horaire d'un salarié en € :", "Nombre d'outils :", "Type de bobine :"],
        inputFieldsIllustration: ["illustrations/superficie.jpg", "illustrations/pieds-per-ha.jpg", "illustrations/attache-par-pied.jpg", "illustrations/contrat.webp", "illustrations/lea-transparent.jpg", "illustrations/bobines-de-lien.jpg",],
        defaultValues: [10, 4000, 2, 18, 2, null],
        errorInputs: "Veuillez remplir tous les champs correctement.",
        tooltips: ["\\(\\text{Superficie (ha)} = \\frac{\\text{Largeur(m)} \\times \\text{Longueur(m)}}{10\\ 000}\\)",
            "\\(\\text{Pieds par ha} = \\frac{10\\ 000}{\\text{Ecart entre pieds(m)} \\times \\text{Ecart entre rangs(m)}}\\)",
            "Nombre d'attaches par pied", "Cout moyen d'un salarié par heure pour attacher la vigne", "Nombre d'outil à disposition des salariés", "Papier : Biodegradable,\n Photo : dégradation moyenne,\n PVC : pas dégrabdable"],
        moreOptions: ["+ Voir plus"],
        lessOptions: ["- Voir moins"],
        extraOptions: ["Temps deplacement entre les ceps (s)", "Temps de cycle outil (s)", "Temps changement bobine (s) ","Temps de pose de la baguette (s)","Temps entre les liens (s)", "Temps de travail (heures/jours)","Temps de pause par jour en minutes (hors pause midi)", "Temps de mise en route et rangement (min)","Prix d'achat de l'outil (€)", "Frais de révision annuelle (€)" ],
        defaultValuesExtra: [4, 0.6, 120, 1.5, 1,  8, 30, 15,1280, 100],
        tooltipsExtra: ["Temps de déplacement en seconde pour que l'opérateur marche d'un ceps à un autre à une allure de travail","Temps en secondes pour que le LEA30 fasse une attache (0.6s pour 11 tours, 0.4s pour 5 tours)","Temps total en secondes qu'il faut à l'opérateur pour changer de bobine (enlever le gilet, ouvrir le capot et changer la bobine, remettre le harnais...) : 30s pour un operateur experimenté, 120s pour un débutant","Temps en seconde qu'il faut pour plier la baguette de la vigne et la positionner dans la position souhaitée avant de l'attacher. Si plusieurs baguette indiqué (Guyot double arcure) indiquer le temps total passé à plier","Temps qu'il faut à l'opérateur pour déplacer son outil jusqu'au prochain emplacement d'attache","Temps total travaillé en une journée","Temps de pause cumulé sur la journée ","Temps de mise en route de l'opérateur en minutes pour : sortir l'outil, mettre le harnais, se rendre au premier cep","Prix public neuf HT : 1280€","La révision annuelle est obligatoire pour assurer le bon fonctionnement de l'outil, la garantie s'annulle si elle n'est pas faite (prix : 125e)",1,9],
        bobineOptions: ["Papier", "PVC", "Photo"] // Options spécifiques à "Bobine"

    }
};

// Initialisation de la langue
function changeLanguage() {
    language = document.getElementById('selected-language').innerText
    console.log(language);
    document.getElementById('page-title').innerText = dictionary[language].pageTitle;
    document.getElementById('results-title').innerText = dictionary[language].resultsTitle;
    document.getElementById("calculate-button").innerText = dictionary[language].launchCalculation;

    const extraOptions = document.getElementById('extra-options');
    if (extraOptions.style.display === 'none') {
        document.getElementById("show-more-options").textContent = dictionary[language].moreOptions;
    }
    else {
        document.getElementById("show-more-options").textContent = dictionary[language].lessOptions;

    }

    loadInputFields();
    loadExtraOptions();
}

function loadInputFields() {
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

function loadExtraOptions() {
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


// Lancer le calcul
function launchCalculation() {
    if (validateInputs()) {
        const inputs = dictionary[language].inputFields.map((_, index) => parseFloat(document.getElementById(`input-${index}`).value));
        const extra_inputs = dictionary[language].extraOptions.map((_, index) => parseFloat(document.getElementById(`input-extra-${index}`).value));
        const [results,chart_data] = calculateResults(inputs, extra_inputs);

        displayResultsRaw(results);
        displayResultsBarGraph(chart_data);
        displayResultsCurveGraph(chart_data);
        // saveResultsAsJson(inputs, results);
    }
    else {

    }
}

// Calcul des résultats (exemple simple)
function calculateResults(inputs, extra_inputs) {
    // const total = inputs.reduce((acc, value) => acc + value, 0);
    // return { total, yearlyCosts: Array.from({ length: 10 }, (_, i) => total * (1 + i * 0.05)) };

    // Recuperation des inputs
    const selectBobine = document.querySelector("#input-" + (dictionary[language].inputFields.length - 1)); // Champ bobine (dernier champ)
    superficie =                        parseFloat(inputs[0]);
    pieds_par_ha =                      parseFloat(inputs[1]);
    attaches_par_pieds =                parseFloat(inputs[2]);
    couts_horaire_salarie =             parseFloat(inputs[3]);
    couts_seconde_salarie =             couts_horaire_salarie/60/60;
    nombre_outils =                     parseFloat(inputs[4]);
    type_de_bobine =                    selectBobine.value;
    //
    temps_deplacement_entre_ceps =      parseFloat(extra_inputs[0]); 
    temps_cycle_outil =                 parseFloat(extra_inputs[1]); 
    temps_changement_bobine =           parseFloat(extra_inputs[2]); 
    temps_pose_baguette =               parseFloat(extra_inputs[3]); 
    temps_entre_liens =                 parseFloat(extra_inputs[4]); 
    temps_travail_journalier =          parseFloat(extra_inputs[5])*60.*60.; 
    temps_pause_journalier =            parseFloat(extra_inputs[6])*60.; 
    temps_mise_en_route =               parseFloat(extra_inputs[7])*60.; 
    prix_outil =                        parseFloat(extra_inputs[8]); 
    frais_revision =                    parseFloat(extra_inputs[9]); 
    
    frais_revision_embarque = 100;
    
    
    // Calculs exhaustifs du consommable
    total_pieds = pieds_par_ha * superficie; 
    total_attaches = total_pieds * attaches_par_pieds;
    total_longueur_fil = 157e-3 * total_attaches;
    nombre_total_bobines = total_attaches/bobines[type_de_bobine].Nombre_lien_bobine;
    nombre_total_bobines_embarque = total_attaches/bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    prix_par_bobine = bobines[type_de_bobine].Prix;
    prix_par_bobine_embarque = bobines[type_de_bobine].Prix_embarque;
    prix_total_bobines = prix_par_bobine * nombre_total_bobines;
    prix_total_bobines_embarque = prix_par_bobine_embarque * nombre_total_bobines_embarque;
    prix_consommable = prix_total_bobines + frais_revision*nombre_outils;
    prix_consommable_embarque = prix_total_bobines_embarque + frais_revision_embarque*nombre_outils;
    
    //embarque const
    temps_changement_bobine_embarque = 120;//s
    temps_cycle_outil_embarque=1;//s
    prix_outil_embarque = 900;//e
    temps_entre_liens_embarque=temps_entre_liens*1.0;
    // Calculs du exhaustifs du temps de travail
    // on calcule le nombre d'attache possible a la journee
    temps_par_cep = temps_pose_baguette + (temps_entre_liens+temps_cycle_outil)*attaches_par_pieds+temps_deplacement_entre_ceps;
    temps_par_cep_corrige = temps_par_cep + temps_changement_bobine * attaches_par_pieds/bobines[type_de_bobine].Nombre_lien_bobine; 
    temps_par_cep_embarque = temps_pose_baguette + (temps_entre_liens_embarque+temps_cycle_outil_embarque)*attaches_par_pieds+temps_deplacement_entre_ceps;
    temps_par_cep_corrige_embarque = temps_par_cep_embarque + temps_changement_bobine_embarque * attaches_par_pieds/bobines[type_de_bobine].Nombre_lien_bobine_embarque; 
    
    temps_attache_journalier = (temps_travail_journalier-2*temps_mise_en_route)*nombre_outils; // temps jounralier consacré a attacher (facteur 2 = un rangement a midi)
    ceps_par_jour = temps_attache_journalier/temps_par_cep_corrige;
    ceps_par_jour_embarque = temps_attache_journalier/temps_par_cep_corrige_embarque;

    attaches_par_jour = ceps_par_jour * attaches_par_pieds;
    attaches_par_jour_embarque = ceps_par_jour_embarque * attaches_par_pieds;
    bobines_par_jour = attaches_par_jour /bobines[type_de_bobine].Nombre_lien_bobine;
    bobines_par_jour_embarque = attaches_par_jour /bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    nombre_de_jours_parcelle = total_pieds/ceps_par_jour;
    nombre_de_jours_parcelle_embarque = total_pieds/ceps_par_jour_embarque;
    prix_main_d_oeuvre = nombre_de_jours_parcelle * temps_travail_journalier * couts_seconde_salarie * nombre_outils;
    prix_main_d_oeuvre_embarque = nombre_de_jours_parcelle_embarque * temps_travail_journalier * couts_seconde_salarie * nombre_outils;

    prix_achat_outils = nombre_outils*prix_outil;
    prix_achat_outils_embarque = nombre_outils*prix_outil_embarque;

    cout_total = prix_consommable + prix_main_d_oeuvre;
    cout_total_embarque = prix_consommable_embarque + prix_main_d_oeuvre_embarque;


    results_lea = {
        ____ :["","_ Entrées",""],
        superficie:[superficie,"superficie","ha"],
        pieds_par_ha:[pieds_par_ha,"pieds_par_ha","pieds/ha"],
        attaches_par_pieds:[attaches_par_pieds,"attaches_par_pieds","attaches/pied"],
        couts_horaire_salarie:[couts_horaire_salarie,"couts_horaire_salarie","euros/heure"],
        couts_seconde_salarie:[couts_seconde_salarie,"couts_seconde_salarie","euros/seconde"],
        nombre_outils:[nombre_outils,"nombre_outils","outils"],
        type_de_bobine:[type_de_bobine,"type_de_bobine","type"],
        temps_deplacement_entre_ceps :[temps_deplacement_entre_ceps,"temps_deplacement_entre_ceps","seconde"],
        temps_cycle_outil : [temps_cycle_outil,"temps_cycle_outil","seconde"],
        temps_changement_bobine :[temps_changement_bobine,"temps_changement_bobine","seconde"],
        temps_pose_baguette :[temps_pose_baguette,"temps_pose_baguette","seconde"],
        temps_entre_liens :[temps_entre_liens,"temps_entre_liens","seconde"],
        temps_travail_journalier :[temps_travail_journalier,"temps_travail_journalier","secondes"],
        temps_pause_journalier :[temps_pause_journalier,"temps_pause_journalier","secondes"],
        temps_mise_en_route :[temps_mise_en_route,"temps_mise_en_route","secondes"],
        prix_outil :[prix_outil,"prix_outil","euros"],
        frais_revision :[frais_revision,"frais_revision","euros"],
        _ : ["","_Consommable",""],
        // Calculs exhaustifs du consommable
        total_pieds:[total_pieds,"total_pieds","pieds"],
        total_attaches:[total_attaches,"total_attaches","attaches"],
        total_longueur_fil:[total_longueur_fil,"total_longueur_fil","metres"],
        nombre_total_bobines:[nombre_total_bobines,"nombre_total_bobines","bobines"],
        prix_par_bobine:[prix_par_bobine,"prix_par_bobine","euros/bobine"],
        prix_total_bobines:[prix_total_bobines,"prix_total_bobines","euros"],
        prix_consommable:[prix_consommable,"prix_consommable","euros"],
        // Main d'oeuvre
        __ : ["","_Main d'oeuvre",""],

        temps_par_cep:[temps_par_cep,"temps_par_cep","secondes"],
        temps_par_cep_corrige:[temps_par_cep_corrige,"temps_par_cep_corrige","secondes"],
        temps_attache_journalier:[temps_attache_journalier,"temps_attache_journalier (pour N outils)","secondes"],
        ceps_par_jour:[ceps_par_jour,"ceps_par_jour","ceps"],
        attaches_par_jour:[attaches_par_jour,"attaches_par_jour","attaches/jour"],
        bobines_par_jour:[bobines_par_jour,"bobines_par_jour","bobines"],
        // nombre_de_jours_parcelle:[nombre_de_jours_parcelle,"nombre_de_jours_parcelle","jours"],
        prix_main_d_oeuvre:[prix_main_d_oeuvre,"prix_main_d_oeuvre (bobines + revisions)","euros"],
        nombre_de_jours_parcelle:[nombre_de_jours_parcelle,"nombre_de_jours_parcelle","jours"],
        ___ : ["","_Total LEA30s",""],
        prix_achat_outils : [prix_achat_outils,"prix_achat_outils (investissement)", "euros"],
        prix_consommable_bis:[prix_consommable,"prix_consommable","euros"],
        prix_main_d_oeuvre_bis:[prix_main_d_oeuvre,"prix_main_d_oeuvre (bobines + revisions)","euros"],
        nombre_de_jours_parcelle_bis:[nombre_de_jours_parcelle,"nombre_de_jours_parcelle","jours"],
        cout_total:[cout_total,"cout_total (hors investissement outils)","euros"]
        //
    }
    
    chart_data ={
        LEA30S:{
            cout_consommable :prix_consommable,
            cout_total: cout_total,
            cout_cummulatif : [
                prix_achat_outils+1*cout_total,
                prix_achat_outils+2*cout_total,
                prix_achat_outils+3*cout_total,
                prix_achat_outils+4*cout_total,
                prix_achat_outils+5*cout_total,
                prix_achat_outils+6*cout_total,
                prix_achat_outils+7*cout_total,
                prix_achat_outils+8*cout_total,
                prix_achat_outils+9*cout_total
            ]
        },
        EMBARQUE:{
            cout_consommable :prix_consommable_embarque,
            cout_total: cout_total_embarque,
            cout_cummulatif : [
                prix_achat_outils_embarque+1*cout_total_embarque,
                prix_achat_outils_embarque+2*cout_total_embarque,
                prix_achat_outils_embarque+3*cout_total_embarque,
                prix_achat_outils_embarque+4*cout_total_embarque,
                prix_achat_outils_embarque+5*cout_total_embarque,
                prix_achat_outils_embarque+6*cout_total_embarque,
                prix_achat_outils_embarque+7*cout_total_embarque,
                prix_achat_outils_embarque+8*cout_total_embarque,
                prix_achat_outils_embarque+9*cout_total_embarque,
            ],
        }
    }



    return [results_lea,chart_data]

}

function displayResultsRaw(results) {
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
                currentSection.classList.add('hidden-section');
                currentSection.style.display = 'none'; // Masquer par défaut
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
                resultElement.innerHTML = `<strong>${value[1]}:</strong> ${Number(value[0]).toFixed(3)} ${value[2]}`;
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
    showMoreButton.textContent = "+ voir plus";
    showMoreButton.onclick = () => {
        hiddenSections.forEach(section => section.style.display = 'block');
        showMoreButton.style.display = 'none';
        showLessButton.style.display = 'inline'; // Affiche le bouton "voir moins"
    };

    const showLessButton = document.createElement('p');
    showLessButton.classList.add('text-primary');
    showLessButton.style.cursor = 'pointer';
    showLessButton.textContent = "voir moins";
    showLessButton.style.display = 'none'; // Caché par défaut
    showLessButton.onclick = () => {
        hiddenSections.forEach(section => section.style.display = 'none');
        showLessButton.style.display = 'none';
        showMoreButton.style.display = 'inline'; // Réaffiche le bouton "voir plus"
    };

    buttonsContainer.appendChild(showMoreButton);
    buttonsContainer.appendChild(showLessButton);
    resultsSummary.appendChild(buttonsContainer);

    // Gestion du graphique (TODO)
    // console.log("Chart data:", chart_data);
}




// Palette de couleurs pour les solutions
const solutionColors = [
    {
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.8)', // LEA30s
        backgroundColorLight: 'rgba(54, 162, 235, 0.2)' // LEA30s (light)
    },
    {
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Outil à bobine embarquée
        backgroundColorLight: 'rgba(255, 99, 132, 0.2)' // Outil à bobine embarquée (light)
    },
    {
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Attache manuelle
        backgroundColorLight: 'rgba(75, 192, 192, 0.2)' // Attache manuelle (light)
    }
];

// Fonction pour afficher un graphique en barres empilées
function displayResultsBarGraph(chart_data) {
    const ctx = document.getElementById('bar-chart').getContext('2d');

    // Données fictives pour 3 solutions
    const data = {
        labels: ['LEA30s', 'Outil à bobine embarquée', 'Attache manuelle'],
        datasets: [
            {
                label: 'Consommable',
                data: [chart_data["LEA30S"].cout_consommable, chart_data["EMBARQUE"].cout_consommable], // Coûts consommables
                backgroundColor: [
                    solutionColors[0].backgroundColor,
                    solutionColors[1].backgroundColor,
                    // solutionColors[2].backgroundColor
                ]
            },
            {
                label: 'Main d\'œuvre',
                data: [chart_data["LEA30S"].cout_total, chart_data["EMBARQUE"].cout_total], // Coûts main d'œuvre
                backgroundColor: [
                    solutionColors[0].backgroundColorLight,
                    solutionColors[1].backgroundColorLight,
                    solutionColors[2].backgroundColorLight
                ]
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Coûts annuel par solution (consommables et main d\'œuvre)'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        responsive: true,
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

    new Chart(ctx, {
        type: 'bar',
        data,
        options
    });
}

// Fonction pour afficher un graphique en courbes
function displayResultsCurveGraph(chart_data) {
    const ctx = document.getElementById('curve-chart').getContext('2d');

    // Données fictives pour 3 solutions
    const data = {
        labels: ['Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5','Année 6','Année 7','Année 8','Année 9',],
        datasets: [
            {
                label: 'LEA30s',
                data: chart_data["LEA30S"].cout_cummulatif, // Coût cumulatif
                borderColor: solutionColors[0].borderColor,
                backgroundColor: solutionColors[0].backgroundColorLight,
                fill: true
            },
            {
                label: 'Outil à bobine embarquée',
                data: chart_data["EMBARQUE"].cout_cummulatif,
                borderColor: solutionColors[1].borderColor,
                backgroundColor: solutionColors[1].backgroundColorLight,
                fill: true
            },
            // {
            //     label: 'Attache manuelle',
            //     data: [150, 350, 650, 1050, 1400],
            //     borderColor: solutionColors[2].borderColor,
            //     backgroundColor: solutionColors[2].backgroundColorLight,
            //     fill: true
            // }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Coût cumulatif par solution selon les années'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Année'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Coût cumulatif (€)'
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'line',
        data,
        options
    });
}


// Sauvegarde des résultats en JSON
function saveResultsAsJson(inputs, results) {
    const data = { inputs, results };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'calculateur_resultats.json';
    link.click();
}

// Réinitialisation du formulaire
function resetForm() {
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('calculator-form').reset();
    loadInputFields();
    loadExtraOptions();
}

function validateInputs() {
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

function toggleExtraOptions() {
    const extraOptions = document.getElementById('extra-options');
    const showMoreText = document.getElementById('show-more-options');

    if (extraOptions.style.display === 'none') {
        extraOptions.style.display = 'block';
        showMoreText.innerText = dictionary[language].lessOptions;
    } else {
        extraOptions.style.display = 'none';
        showMoreText.innerText = dictionary[language].moreOptions;
    }
}

function attachTooltipEvents() {
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

function toggleTooltip(element) {
    element.classList.toggle('tooltip-active');
}

function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}
//
function toggleDropdown() {
    document.querySelector('.language-selector').classList.toggle('active');
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

function toggleTooltip(element) {
    // Vérifier si l'utilisateur est sur mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        element.classList.toggle('tooltip-active'); // Affiche/cache le tooltip au clic
    } else {
        // Sur PC, le tooltip est géré par le survol (CSS `hover`)
        return;
    }
}

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
