let language = 'fr';
const dictionary = {
    English: {
        pageTitle: "LEA30s Cost calculator",
        launchCalculation: "Launch Calculation",
        resultsTitle: "Results",
        inputFields: ["Surface hA :", "Vine plants per hectare :", "Number of ties per plant :","Hourly cost of an employee (€) :","Number of employee","Spool"],
        inputFieldsIllustration:["lang/en/illustrations/surface.png","lang/en/illustrations/ceps-ha.png","lang/en/illustrations/ties.png","lang/en/illustrations/hourly-cost.png","lang/en/illustrations/workers.png","lang/en/illustrations/spool.png",],
        defaultValues: [10, 2000, 5, 20, 2, null],
        errorInputs: "Some fields are incorrects.",
        tooltips: [1,2,3,4,5,6],
        moreOptions : ["+ Show more"],
        lessOptions : ["- Show less"],
        extraOptions: ["Displacement time","Tool time to attach","Spool change time", "Tool price", "Revision cost","Work time per day"],
        defaultValuesExtra : [5,0.6,120,1280,125,10],
        tooltipsExtra : [],
        bobineOptions: ["Paper", "PVC", "Photo"] // Options spécifiques à "Spool"

    },
    Francais: {
        pageTitle: "Calculateur LEA30s",
        launchCalculation: "Lancer le calcul",
        resultsTitle: "Résultats",
        inputFields: ["Superficie hA :", "Pieds de vigne à l'hectare :", "Attaches par pied :","Cout horaire d'un salarié en € :", "Nombre d'outils","Bobine"],
        inputFieldsIllustration:["lang/en/illustrations/surface.png","lang/en/illustrations/ceps-ha.png","lang/en/illustrations/ties.png","lang/en/illustrations/hourly-cost.png","lang/en/illustrations/workers.png","lang/en/illustrations/spool.png",],
        defaultValues: [10, 2000, 5, 20, 2, null],
        errorInputs: "Veuillez remplir tous les champs correctement.",
        tooltips: [1,2,3,4,5,6],
        moreOptions : ["+ Voir plus"],
        lessOptions : ["- Voir moins"],
        extraOptions: ["Temps deplacement","Temps de cycle outil","Temps changement bobine", "Prix d'achat", "Frais de revision","Temps de travail journalier"],
        defaultValuesExtra : [5,0.6,120,1280,125,8],
        tooltipsExtra : ["tooltips/en/surface.bmp", "tooltips/en/vine_plants_per_ha.bmp","tooltips/en/number_of_ties.bmp"],
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
    if (extraOptions.style.display === 'none'){
        document.getElementById("show-more-options").textContent = dictionary[language].moreOptions;
    }
    else{
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
                    <img src="${dictionary[language].inputFieldsIllustration[index]}" height="5cm" class="img-fluid my-3">
                    <div class="form-group">
                        <label>${field}
                            <span class="help-icon" data-tooltip="${dictionary[language].tooltips[index]}">
                                ?
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
                    <img src="${dictionary[language].inputFieldsIllustration[index]}" height="5cm" class="img-fluid my-3">
                    <div class="form-group">
                        <label>${field}
                            <span class="help-icon" data-tooltip="${dictionary[language].tooltips[index]}">
                                ?
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

function loadExtraOptions(){
    const inputContainer = document.getElementById('extra-options');
    inputContainer.innerHTML = '';
    
    dictionary[language].extraOptions.forEach((field, index) => {
        inputContainer.innerHTML += `
            <div class="form-group">
                <label>${field}
                    <span class="help-icon">
                        ?<img src="${dictionary[language].tooltipsExtra[index]}" class="tooltip-image" alt="Help image for ${field}">
                    </span>
                </label>
                <input type="number" class="form-control" id="input-${index}" value="${dictionary[language].defaultValuesExtra[index]}">
            </div>`;
    });
}


// Lancer le calcul
function launchCalculation() {
        if (validateInputs()){
        const inputs = dictionary[language].inputFields.map((_, index) => parseFloat(document.getElementById(`input-${index}`).value));
        const results = calculateResults(inputs);

        displayResults(results);
        saveResultsAsJson(inputs, results);
        }
        else{

        }
}

// Calcul des résultats (exemple simple)
function calculateResults(inputs) {
    const total = inputs.reduce((acc, value) => acc + value, 0);
    return { total, yearlyCosts: Array.from({ length: 10 }, (_, i) => total * (1 + i * 0.05)) };
}

// Affichage des résultats
function displayResults(results) {
    document.getElementById('results-summary').innerText = `Total: ${results.total}`;
    document.getElementById('results-section').style.display = 'block';
    renderChart(results.yearlyCosts);
}

// Affichage du graphique avec Chart.js
function renderChart(yearlyCosts) {
    const ctx = document.getElementById('cost-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: yearlyCosts.length }, (_, i) => `Année ${i + 1}`),
            datasets: [{
                label: 'Coût par année',
                data: yearlyCosts
            }]
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
        icon.addEventListener('click', function(event) {
            toggleTooltip(icon);
            event.stopPropagation(); // Empêche la fermeture immédiate du tooltip
        });
    });

    // Masquer les tooltips lorsque l'utilisateur clique en dehors d'une icône
    document.addEventListener('click', function(event) {
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

// Fermer le menu si on clique en dehors
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.language-selector');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Initialisation
changeLanguage();
