export const dictionary = {
    Francais: {
        pageTitle: "Calculateur LEA30s",
        launchCalculation: "Lancer le calcul",
        resultsTitle: "Résultats",
        inputFields: ["Superficie ha :", "Pieds de vigne à l'hectare :", "Nombre d'attaches par pied :", "Cout horaire d'un salarié en € :", "Nombre d'outils :", "Type de bobine :"],
        inputFieldsIllustration: [
            "../illustrations/superficie.jpg",
            "../illustrations/vines-per-ha.webp",
            "../illustrations/attache-par-pied.jpg",
            "../illustrations/contrat.webp",
            "../illustrations/lea-transparent.png",
            "../illustrations/bobines-de-lien.png",
        ],
        defaultValues: [
            10, //superficie
            4000,//vigne par ha
            4,//attache par pied
            18,//cout h du salarie
            2,//nbre outil
            null],
        errorInputs: "Veuillez remplir tous les champs correctement.",
        tooltips: ["\\(\\text{Superficie (ha)} = \\frac{\\text{Largeur(m)} \\times \\text{Longueur(m)}}{10\\ 000}\\)",
            "\\(\\text{Pieds par ha} = \\frac{10\\ 000}{\\text{Ecart entre pieds(m)} \\times \\text{Ecart entre rangs(m)}}\\)",
            "Nombre d'attaches par pied", "Cout moyen d'un salarié par heure pour attacher la vigne", "Nombre d'outil à disposition des salariés", "Papier : Biodegradable,\n Photo : dégradation moyenne,\n PVC : pas dégrabdable"],
        moreOptions: ["+ Voir plus"],
        lessOptions: ["- Voir moins"],
        extraOptions: ["Temps deplacement entre les ceps (s)", "Temps de cycle outil (s)", "Temps changement bobine (s) ", "Temps de pose de la baguette (s)", "Temps entre les liens (s)", "Temps de travail (heures/jours)", "Temps de pause par jour en minutes (hors pause midi)", "Temps de mise en route et rangement (min)", "Prix d'achat de l'outil (€)", "Frais de révision annuelle (€)"],
        defaultValuesExtra: [
            0.7, //deplacement
            .6, // cycle outil 
            120, //t chgt bbobin
            0.45, //t pose baguette
            0.7, // t entre lien
            8, //h travial
            30,//pause
            15,//mise en route
            1280,//acaht
            100//rev
        ],
        tooltipsExtra: ["Temps de déplacement en seconde pour que l'opérateur marche d'un ceps à un autre à une allure de travail", "Temps en secondes pour que le LEA30 fasse une attache (0.6s pour 11 tours, 0.4s pour 5 tours)", "Temps total en secondes qu'il faut à l'opérateur pour changer de bobine (enlever le gilet, ouvrir le capot et changer la bobine, remettre le harnais...) : 30s pour un operateur experimenté, 120s pour un débutant", "Temps en seconde qu'il faut pour plier la baguette de la vigne et la positionner dans la position souhaitée avant de l'attacher. Si plusieurs baguette indiqué (Guyot double arcure) indiquer le temps total passé à plier", "Temps qu'il faut à l'opérateur pour déplacer son outil jusqu'au prochain emplacement d'attache", "Temps total travaillé en une journée", "Temps de pause cumulé sur la journée ", "Temps de mise en route de l'opérateur en minutes pour : sortir l'outil, mettre le harnais, se rendre au premier cep", "Prix public neuf HT : 1280€", "La révision annuelle est obligatoire pour assurer le bon fonctionnement de l'outil, la garantie s'annulle si elle n'est pas faite (prix : 125e)", 1, 9],
        bobineOptions: ["Papier", "PVC", "Photo"] // Options spécifiques à "Bobine"

    },
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
        tooltipsExtra: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        bobineOptions: ["Paper", "PVC", "Photo"] // Options spécifiques à "Spool"

    }
}