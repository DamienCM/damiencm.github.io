let language = 'fr';

const bobines= {
    A : {
        Type : "Papier",
        Taille : "1x40",
        Prix : 11.80,
        Prix_embarque: 64./60.,
        Prix_main:3.15,
        Nombre_lien_bobine : 3200.,
        Nombre_lien_bobine_embarque : 450.,
        Nombre_lien_bobine_main : 1500.,
        Longueur : 500.,
        Longueur_embarque : 60.,
        Longueur_main : 230.,
        Biodegradable : "Oui",
        ref_embarque : "https://store.pellenc.com/attacheur-vigne-electrique-batterie/607-petites-bobines-liens-inox-fixion-2-carton-60-bobines.html",
        ref_main : "https://www.e-viti.com/comfr/ficelle-a-lier-la-vigne-ligapal.html"
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
        inputFieldsIllustration: ["illustrations/superficie.jpg", "illustrations/vines-per-ha.webp", "illustrations/attache-par-pied.jpg", "illustrations/contrat.webp", "illustrations/lea-transparent.png", "illustrations/bobines-de-lien.png",],
        defaultValues: [
            10, //superficie
             4000,//vigne par ha
             3,//attache par pied
             18,//cout h du salarie
             2,//nbre outil
             null],
        errorInputs: "Veuillez remplir tous les champs correctement.",
        tooltips: ["\\(\\text{Superficie (ha)} = \\frac{\\text{Largeur(m)} \\times \\text{Longueur(m)}}{10\\ 000}\\)",
            "\\(\\text{Pieds par ha} = \\frac{10\\ 000}{\\text{Ecart entre pieds(m)} \\times \\text{Ecart entre rangs(m)}}\\)",
            "Nombre d'attaches par pied", "Cout moyen d'un salarié par heure pour attacher la vigne", "Nombre d'outil à disposition des salariés", "Papier : Biodegradable,\n Photo : dégradation moyenne,\n PVC : pas dégrabdable"],
        moreOptions: ["+ Voir plus"],
        lessOptions: ["- Voir moins"],
        extraOptions: ["Temps deplacement entre les ceps (s)", "Temps de cycle outil (s)", "Temps changement bobine (s) ","Temps de pose de la baguette (s)","Temps entre les liens (s)", "Temps de travail (heures/jours)","Temps de pause par jour en minutes (hors pause midi)", "Temps de mise en route et rangement (min)","Prix d'achat de l'outil (€)", "Frais de révision annuelle (€)" ],
        defaultValuesExtra: [
            2, //deplacement
            .6, // cycle outil 
            120, //t chgt bbobin
            1.5, //t pose baguete
            1, // t entre lien
            8, //h travial
            30,//pause
            15,//mise en route
            1280,//acaht
            100//rev
            ],
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

    // const extraOptions = document.getElementById('extra-options');
    // if (extraOptions.style.display === 'none') {
    //     document.getElementById("show-more-options").textContent = dictionary[language].moreOptions;
    // }
    // else {
    //     document.getElementById("show-more-options").textContent = dictionary[language].lessOptions;

    // }

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
        
        // Appel de la fonction
        displayPieCharts(chart_data);
        
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
    
    frais_revision_embarque = 100.;
    frais_revision_main = 0.;
    
    
    // Calculs exhaustifs du consommable
    total_pieds = pieds_par_ha * superficie; 
    total_attaches = total_pieds * attaches_par_pieds;
    total_longueur_fil = 157e-3 * total_attaches;
    nombre_total_bobines = total_attaches/bobines[type_de_bobine].Nombre_lien_bobine;
    nombre_total_bobines_embarque = total_attaches/bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    nombre_total_bobines_main = total_attaches/bobines[type_de_bobine].Nombre_lien_bobine_main
    prix_par_bobine = bobines[type_de_bobine].Prix;
    prix_par_bobine_embarque = bobines[type_de_bobine].Prix_embarque;
    prix_par_bobine_main = bobines[type_de_bobine].Prix_main;

    prix_total_bobines = prix_par_bobine * nombre_total_bobines;
    prix_total_bobines_embarque = prix_par_bobine_embarque * nombre_total_bobines_embarque;
    prix_total_bobines_main = prix_par_bobine_main * nombre_total_bobines_main;
    prix_consommable = prix_total_bobines + frais_revision*nombre_outils;
    prix_consommable_embarque = prix_total_bobines_embarque + frais_revision_embarque*nombre_outils;
    prix_consommable_main = prix_total_bobines_main + frais_revision_main*nombre_outils;

    //embarque main const
    temps_changement_bobine_embarque = 120.;//s
    temps_changement_bobine_main = 30.;//s
    temps_cycle_outil_embarquee=1.;//s
    temps_cycle_outil_main=5.;//s
    temps_pose_baguette_embarquee = temps_pose_baguette*1.0;
    temps_pose_baguette_main = temps_pose_baguette*1.0;
    temps_deplacement_entre_ceps_embarquee = temps_deplacement_entre_ceps*1.0;
    temps_deplacement_entre_ceps_main = temps_deplacement_entre_ceps*1.0;

    prix_outil_embarque = 900.;//e
    prix_outil_main = 0;//e
    temps_entre_liens_embarquee=temps_entre_liens*1.0;
    temps_entre_liens_main=2.;
    // Calculs du exhaustifs du temps de travail
    // on calcule le nombre d'attache possible a la journee
    temps_par_cep = temps_pose_baguette + (temps_entre_liens+temps_cycle_outil)*attaches_par_pieds+temps_deplacement_entre_ceps;
    temps_par_cep_corrige = temps_par_cep + temps_changement_bobine * attaches_par_pieds/bobines[type_de_bobine].Nombre_lien_bobine; 
    temps_par_cep_embarque = temps_pose_baguette_embarquee + (temps_entre_liens_embarquee+temps_cycle_outil_embarquee)*attaches_par_pieds+temps_deplacement_entre_ceps_embarquee;
    temps_par_cep_corrige_embarque = temps_par_cep_embarque + temps_changement_bobine_embarque * attaches_par_pieds/bobines[type_de_bobine].Nombre_lien_bobine_embarque; 
    temps_par_cep_main = temps_pose_baguette_main + (temps_entre_liens_main+temps_cycle_outil_main)*attaches_par_pieds+temps_deplacement_entre_ceps_main;
    temps_par_cep_corrige_main = temps_par_cep_main + temps_changement_bobine_main * attaches_par_pieds/bobines[type_de_bobine].Nombre_lien_bobine_main; 

    //Temps totaux pour pie-chart
    temps_total_pose_baguette = (temps_pose_baguette*total_pieds/3600).toFixed(1);
    temps_total_cycle_outil = (temps_cycle_outil*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_entre_liens = (temps_entre_liens*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_deplacement_entre_ceps = (temps_deplacement_entre_ceps*total_pieds/3600).toFixed(1);
    temps_total_changement_bobine = (nombre_total_bobines*temps_changement_bobine/3600).toFixed(1);

    temps_total_pose_baguette_embarquee = (temps_pose_baguette_embarquee*total_pieds/3600).toFixed(1);
    temps_total_cycle_outil_embarquee = (temps_cycle_outil_embarquee*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_entre_liens_embarquee = (temps_entre_liens_embarquee*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_deplacement_entre_ceps_embarquee = (temps_deplacement_entre_ceps_embarquee*total_pieds/3600).toFixed(1);
    temps_total_changement_bobine_embarque = (nombre_total_bobines_embarque*temps_changement_bobine_embarque/3600).toFixed(1);


    temps_total_pose_baguette_main = (temps_pose_baguette_main*total_pieds/3600).toFixed(1);
    temps_total_cycle_outil_main = (temps_cycle_outil_main*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_entre_liens_main = (temps_entre_liens_main*total_pieds*attaches_par_pieds/3600).toFixed(1);
    temps_total_deplacement_entre_ceps_main = (temps_deplacement_entre_ceps_main*total_pieds/3600).toFixed(1);
    temps_total_changement_bobine_main = (nombre_total_bobines_main*temps_changement_bobine_main/3600).toFixed(1);

    //calcul a la journee
    temps_attache_journalier = (temps_travail_journalier-2*temps_mise_en_route)*nombre_outils; // temps jounralier consacré a attacher (facteur 2 = un rangement a midi)
    ceps_par_jour = temps_attache_journalier/temps_par_cep_corrige;
    ceps_par_jour_embarque = temps_attache_journalier/temps_par_cep_corrige_embarque;
    ceps_par_jour_main = temps_attache_journalier/temps_par_cep_corrige_main;

    //calcul nbre de jours
    attaches_par_jour = ceps_par_jour * attaches_par_pieds;
    attaches_par_jour_embarque = ceps_par_jour_embarque * attaches_par_pieds;
    attaches_par_jour_main = ceps_par_jour_main * attaches_par_pieds;
    bobines_par_jour = attaches_par_jour /bobines[type_de_bobine].Nombre_lien_bobine;
    bobines_par_jour_embarque = attaches_par_jour /bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    bobines_par_jour_main = attaches_par_jour /bobines[type_de_bobine].Nombre_lien_bobine_main;
    nombre_de_jours_parcelle = total_pieds/ceps_par_jour;
    nombre_de_jours_parcelle_embarquee = total_pieds/ceps_par_jour_embarque;
    nombre_de_jours_parcelle_main = total_pieds/ceps_par_jour_main;
    prix_main_d_oeuvre = nombre_de_jours_parcelle * temps_travail_journalier * couts_seconde_salarie * nombre_outils;
    prix_main_d_oeuvre_embarque = nombre_de_jours_parcelle_embarquee * temps_travail_journalier * couts_seconde_salarie * nombre_outils;
    prix_main_d_oeuvre_main = nombre_de_jours_parcelle_main * temps_travail_journalier * couts_seconde_salarie * nombre_outils;

    //pie-chart
    temps_total_pause = (nombre_de_jours_parcelle*nombre_outils*temps_pause_journalier/3600).toFixed(1);
    temps_total_mise_en_route = (2*nombre_de_jours_parcelle*nombre_outils*temps_mise_en_route/3600).toFixed(1);

    temps_total_pause_embarquee = (nombre_de_jours_parcelle_embarquee*nombre_outils*temps_pause_journalier/3600).toFixed(1);
    temps_total_mise_en_route_embarquee = (2*nombre_de_jours_parcelle_embarquee*nombre_outils*temps_mise_en_route/3600).toFixed(1);

    temps_total_pause_main = (nombre_de_jours_parcelle_main*nombre_outils*temps_pause_journalier/3600).toFixed(1);
    temps_total_mise_en_route_main = (2*nombre_de_jours_parcelle_main*nombre_outils*temps_mise_en_route/3600).toFixed(1);


    prix_achat_outils = nombre_outils*prix_outil;
    prix_achat_outils_embarque = nombre_outils*prix_outil_embarque;
    prix_achat_outils_main = nombre_outils*prix_outil_main;

    cout_total = prix_consommable + prix_main_d_oeuvre;
    cout_total_embarque = prix_consommable_embarque + prix_main_d_oeuvre_embarque;
    cout_total_main = prix_consommable_main + prix_main_d_oeuvre_main;


    results_lea = {         //Value                                     //Display                                       // Units             //Chiffres significatifs
        ____ :["","_ Entrées",""],
        superficie:[superficie,                                         "superficie",                                   "ha",               1],
        pieds_par_ha:[pieds_par_ha,                                     "pieds_par_ha",                                 "pieds/ha",         0],
        attaches_par_pieds:[attaches_par_pieds,                         "attaches_par_pieds",                           "attaches/pied",    0],
        couts_horaire_salarie:[couts_horaire_salarie,                   "couts_horaire_salarie",                        "euros/heure",      0],
        couts_seconde_salarie:[couts_seconde_salarie,                   "couts_seconde_salarie",                        "euros/seconde",    3],
        nombre_outils:[nombre_outils,                                   "nombre_outils",                                "outils",           0],
        type_de_bobine:[type_de_bobine,                                 "type_de_bobine",                               "type",             0],
        temps_deplacement_entre_ceps :[temps_deplacement_entre_ceps,    "temps_deplacement_entre_ceps",                 "seconde",          1],
        temps_cycle_outil : [temps_cycle_outil,                         "temps_cycle_outil",                            "seconde",          1],
        temps_changement_bobine :[temps_changement_bobine,              "temps_changement_bobine",                      "seconde",          0],
        temps_pose_baguette :[temps_pose_baguette,                      "temps_pose_baguette",                          "seconde",          1],
        temps_entre_liens :[temps_entre_liens,                          "temps_entre_liens",                            "seconde",          1],
        temps_travail_journalier :[temps_travail_journalier,            "temps_travail_journalier",                     "secondes",         0],
        temps_pause_journalier :[temps_pause_journalier,                "temps_pause_journalier",                       "secondes",         0],
        temps_mise_en_route :[temps_mise_en_route,                      "temps_mise_en_route",                          "secondes",         0],
        prix_outil :[prix_outil,                                        "prix_outil",                                   "euros",            0],
        frais_revision :[frais_revision,                                "frais_revision",                               "euros",            0],
        _ : ["","_Consommable",""],
        // Calculs exhaustifs du consommable
        total_pieds:[total_pieds,                                       "total_pieds",                                  "pieds",            0],
        total_attaches:[total_attaches,                                 "total_attaches",                               "attaches",         0],
        total_longueur_fil:[total_longueur_fil,                         "total_longueur_fil",                           "metres",           0],
        nombre_total_bobines:[nombre_total_bobines,                     "nombre_total_bobines",                         "bobines",          0],
        prix_par_bobine:[prix_par_bobine,                               "prix_par_bobine",                              "euros/bobine",     2],
        prix_total_bobines:[prix_total_bobines,                         "prix_total_bobines",                           "euros",            2],
        prix_consommable:[prix_consommable,                             "prix_consommable",                             "euros",            2],
        // Main d'oeuvre
        __ : ["","_Main d'oeuvre",""],

        temps_par_cep:[temps_par_cep,                                   "temps_par_cep",                                "secondes",         0],
        temps_par_cep_corrige:[temps_par_cep_corrige,                   "temps_par_cep_corrige",                        "secondes",         0],
        temps_attache_journalier:[temps_attache_journalier,             "temps_attache_journalier (pour N outils)",     "secondes",         0],
        ceps_par_jour:[ceps_par_jour,                                   "ceps_par_jour",                                "ceps",             0],
        attaches_par_jour:[attaches_par_jour,                           "attaches_par_jour",                            "attaches/jour",    0],
        bobines_par_jour:[bobines_par_jour,                             "bobines_par_jour",                             "bobines",          1],
        // nombre_de_jours_parcelle:[nombre_de_jours_parcelle,"nombre_de_jours_parcelle","jours"],
        prix_main_d_oeuvre:[prix_main_d_oeuvre,                         "prix_main_d_oeuvre (bobines + revisions)",     "euros",            2],
        nombre_de_jours_parcelle:[nombre_de_jours_parcelle,             "nombre_de_jours_parcelle",                     "jours",            0],
        ___ : ["","_Total LEA30s",""],          
        prix_achat_outils : [prix_achat_outils,                         "prix_achat_outils (investissement)",           "euros",            2],
        prix_consommable_bis:[prix_consommable,                         "prix_consommable",                             "euros",            2],
        prix_main_d_oeuvre_bis:[prix_main_d_oeuvre,                     "prix_main_d_oeuvre (bobines + revisions)",     "euros",            2],
        nombre_de_jours_parcelle_bis:[nombre_de_jours_parcelle,         "nombre_de_jours_parcelle",                     "jours",            1],
        cout_total:[cout_total,                                         "cout_total (hors investissement outils)",      "euros",            2]
        //
    }
    
    chart_data ={
        LEA30S:{
            cout_consommable :prix_consommable.toFixed(0),
            cout_main_d_oeuvre :prix_main_d_oeuvre.toFixed(0),
            cout_total: cout_total.toFixed(0),
            detail_consommable:[prix_total_bobines.toFixed(0),frais_revision*nombre_outils],
            detail_consommable_label:["Prix total bobines","Frais de révisions"],
            detail_main_d_oeuvre:[temps_total_pose_baguette,temps_total_cycle_outil,temps_total_entre_liens,temps_total_deplacement_entre_ceps,temps_total_pause,temps_total_mise_en_route,temps_total_changement_bobine],
            detail_main_d_oeuvre_label:["temps_total_pose_baguette","temps_total_cycle_outil","temps_total_entre_liens","temps_total_deplacement_entre_ceps","temps_total_pause","temps_total_mise_en_route","temps_total_changement_bobine"], 
            cout_cummulatif : [
            (prix_achat_outils+1*cout_total).toFixed(0),
            (prix_achat_outils+2*cout_total).toFixed(0),
            (prix_achat_outils+3*cout_total).toFixed(0),
            (prix_achat_outils+4*cout_total).toFixed(0),
            (prix_achat_outils+5*cout_total).toFixed(0),
            (prix_achat_outils+6*cout_total).toFixed(0),
            (prix_achat_outils+7*cout_total).toFixed(0),
            (prix_achat_outils+8*cout_total).toFixed(0),
            (prix_achat_outils+9*cout_total.toFixed(0))
            ]
        },
        EMBARQUE:{
            cout_consommable :prix_consommable_embarque.toFixed(0),
            cout_main_d_oeuvre :prix_main_d_oeuvre_embarque.toFixed(0),

            cout_total: cout_total_embarque.toFixed(0),
            detail_consommable:[prix_total_bobines_embarque.toFixed(0),frais_revision_embarque*nombre_outils],
            detail_consommable_label:["Prix total bobines","Frais de révisions"],
            detail_main_d_oeuvre:[temps_total_pose_baguette_embarquee, temps_total_cycle_outil_embarquee, temps_total_entre_liens_embarquee, temps_total_deplacement_entre_ceps_embarquee, temps_total_pause_embarquee, temps_total_mise_en_route_embarquee,temps_total_changement_bobine_embarque],
            detail_main_d_oeuvre_label:["temps_total_pose_baguette","temps_total_cycle_outil","temps_total_entre_liens","temps_total_deplacement_entre_ceps","temps_total_pause","temps_total_mise_en_route","temps_total_changement_bobine"], 
            cout_cummulatif : [
            (prix_achat_outils_embarque+1*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+2*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+3*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+4*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+5*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+6*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+7*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+8*cout_total_embarque).toFixed(0),
            (prix_achat_outils_embarque+9*cout_total_embarque).toFixed(0),
            ],
        },
        MAIN:{
            cout_consommable :prix_consommable_main.toFixed(0),
            cout_main_d_oeuvre :prix_main_d_oeuvre_main.toFixed(0),
            cout_total: cout_total_main.toFixed(0),
            detail_consommable:[prix_total_bobines_main.toFixed(0),frais_revision_main*nombre_outils],
            detail_consommable_label:["Prix total bobines","Frais de révisions"],
            detail_main_d_oeuvre:[temps_total_pose_baguette_main, temps_total_cycle_outil_main, temps_total_entre_liens_main, temps_total_deplacement_entre_ceps_main ,temps_total_pause_main, temps_total_mise_en_route_main,temps_total_changement_bobine_main],
            detail_main_d_oeuvre_label:["temps_total_pose_baguette","temps_total_cycle_outil","temps_total_entre_liens","temps_total_deplacement_entre_ceps","temps_total_pause","temps_total_mise_en_route","temps_total_changement_bobine_main"], 

            cout_cummulatif : [
            (prix_achat_outils_main+1*cout_total_main).toFixed(0),
            (prix_achat_outils_main+2*cout_total_main).toFixed(0),
            (prix_achat_outils_main+3*cout_total_main).toFixed(0),
            (prix_achat_outils_main+4*cout_total_main).toFixed(0),
            (prix_achat_outils_main+5*cout_total_main).toFixed(0),
            (prix_achat_outils_main+6*cout_total_main).toFixed(0),
            (prix_achat_outils_main+7*cout_total_main).toFixed(0),
            (prix_achat_outils_main+8*cout_total_main).toFixed(0),
            (prix_achat_outils_main+9*cout_total_main).toFixed(0),
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
    console.log(chart_data["LEA30S"].cout_consommable);
    console.log(chart_data["LEA30S"].cout_main_d_oeuvre);
    console.log(chart_data["LEA30S"].cout_total);
    data = {
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
                    solutionColors[0].backgroundColor,
                    solutionColors[1].backgroundColor,
                    solutionColors[2].backgroundColor
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
                    solutionColors[0].backgroundColorLight,
                    solutionColors[1].backgroundColorLight,
                    solutionColors[2].backgroundColorLight
                ]
            }
        ]
    };

    options = {
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


function getMinValueFromData(datasets) {
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

// Fonction pour afficher un graphique en courbes
function displayResultsCurveGraph(chart_data) {
    const ctx = document.getElementById('curve-chart').getContext('2d');

    // Données fictives pour 3 solutions
    const data = {
        labels: ['Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5', 'Année 6', 'Année 7', 'Année 8', 'Année 9'],
        datasets: [
            {
                label: 'LEA30s',
                data: chart_data["LEA30S"].cout_cummulatif, // Coût cumulatif
                borderColor: solutionColors[0].borderColor,
                backgroundColor: solutionColors[0].backgroundColorLight,
                fill: false
            },
            {
                label: 'Outil à bobine embarquée',
                data: chart_data["EMBARQUE"].cout_cummulatif,
                borderColor: solutionColors[1].borderColor,
                backgroundColor: solutionColors[1].backgroundColorLight,
                fill: false
            },
            {
                label: 'Attache manuelle',
                data: chart_data["MAIN"].cout_cummulatif,
                borderColor: solutionColors[2].borderColor,
                backgroundColor: solutionColors[2].backgroundColorLight,
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


LEA30_PIE_COLORS = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(75, 192, 245, 0.8)',
    'rgba(40, 140, 210, 0.8)',
    'rgba(130, 202, 255, 0.8)',
    'rgba(90, 150, 210, 0.8)',
    'rgba(30, 120, 200, 0.8)',
    'rgba(80, 170, 250, 0.8)'
]

EMBARQUE_PIE_COLORS = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 120, 150, 0.8)',
    'rgba(235, 50, 85, 0.8)',
    'rgba(255, 150, 170, 0.8)',
    'rgba(210, 70, 130, 0.8)',
    'rgba(200, 40, 80, 0.8)',
    'rgba(255, 120, 100, 0.8)'
]

MAIN_PIE_COLOR = [
    'rgba(75, 192, 192, 0.8)',
    'rgba(90, 210, 210, 0.8)',
    'rgba(60, 175, 175, 0.8)',
    'rgba(120, 220, 220, 0.8)',
    'rgba(55, 160, 160, 0.8)',
    'rgba(40, 130, 130, 0.8)',
    'rgba(100, 200, 200, 0.8)'
]



function displayPieCharts(chart_data) {
    // Conteneurs des graphiques pour chaque solution
    const solutions = [
        { name: 'LEA30', checkboxId: 'lea30-checkbox', containerId: 'lea30-pie-container', main: 'pie-chart-lea30-main', consommable: 'pie-chart-lea30-consommable',colors:LEA30_PIE_COLORS,name_fancy:"LEA30s"},
        { name: 'EMBARQUE', checkboxId: 'bobine-embarquee-checkbox', containerId: 'bobine-pie-container', main: 'pie-chart-bobine-main', consommable: 'pie-chart-bobine-consommable',colors:EMBARQUE_PIE_COLORS,name_fancy:"Outil à bobine embarquée" },
        { name: 'MAIN', checkboxId: 'manuelle-checkbox', containerId: 'manuelle-pie-container', main: 'pie-chart-manuelle-main', consommable: 'pie-chart-manuelle-consommable',colors:MAIN_PIE_COLOR,name_fancy:"Attache manuelle" }
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
        maintainAspectRatio: true
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
        options: { ...options, plugins: { title: { display: true, text: `Détail main d'oeuvre (heures) : ${solution.name_fancy}`,font:{size: 18} },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw; // Accède à la valeur brute
                        return `${label}: ${value} h`; // Ajoute l'unité ici
                    }
                }
            } } }
    });

    // Création du camembert pour Consommable
    new Chart(ctxConsommable, {
        type: 'pie',
        data: sortedConsommableData,
        options: { ...options, plugins: { title: { display: true, text: `Détail consommable (euros) : ${solution.name_fancy}` ,font:{size: 18} },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw; // Accède à la valeur brute
                    return `${label}: ${value} €`; // Ajoute l'unité ici
                }
            }
        } } }
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

    // Vérifie si la section est visible
    if (extraOptions.classList.contains('visible')) {
        extraOptions.classList.remove('visible'); // Masque avec transition
        showMoreText.innerText = '+ Afficher plus d\'options'; // Texte "Afficher plus"
    } else {
        extraOptions.classList.add('visible'); // Affiche avec transition
        showMoreText.innerText = '- Afficher moins d\'options'; // Texte "Afficher moins"
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
// Attache l'événement au clic
document.getElementById('show-more-options').addEventListener('click', toggleExtraOptions);
