import { bobines } from "./database.js";
import { dictionary } from "../lang/dictionary.js";

// Calcul des résultats (exemple simple)
export function calculateResults(inputs, extra_inputs, language) {
    // const total = inputs.reduce((acc, value) => acc + value, 0);
    // return { total, yearlyCosts: Array.from({ length: 10 }, (_, i) => total * (1 + i * 0.05)) };

    // Recuperation des inputs
    const selectBobine = document.querySelector("#input-" + (dictionary[language].inputFields.length - 1)); // Champ bobine (dernier champ)
    let superficie = parseFloat(inputs[0]);
    let pieds_par_ha = parseFloat(inputs[1]);
    let attaches_par_pieds = parseFloat(inputs[2]);
    let couts_horaire_salarie = parseFloat(inputs[3]);
    let couts_seconde_salarie = couts_horaire_salarie / 60 / 60;
    let nombre_outils = parseFloat(inputs[4]);
    let type_de_bobine = selectBobine.value;
    let temps_deplacement_entre_ceps = parseFloat(extra_inputs[0]);
    let temps_cycle_outil = parseFloat(extra_inputs[1]);
    let temps_changement_bobine = parseFloat(extra_inputs[2]);
    let temps_pose_baguette = parseFloat(extra_inputs[3]);
    let temps_entre_liens = parseFloat(extra_inputs[4]);
    let temps_travail_journalier = parseFloat(extra_inputs[5]) * 60. * 60.;
    let temps_pause_journalier = parseFloat(extra_inputs[6]) * 60.;
    let temps_mise_en_route = parseFloat(extra_inputs[7]) * 60.;
    let prix_outil = parseFloat(extra_inputs[8]);
    let frais_revision = parseFloat(extra_inputs[9]);
    let frais_revision_embarque = 100.;
    let frais_revision_main = 0.;


    // Calculs exhaustifs du consommable
    let total_pieds = pieds_par_ha * superficie;
    let total_attaches = total_pieds * attaches_par_pieds;
    let total_attaches_par_outil = total_attaches/nombre_outils;
    let total_longueur_fil = 157e-3 * total_attaches;
    let nombre_total_bobines = total_attaches / bobines[type_de_bobine].Nombre_lien_bobine;
    let nombre_total_bobines_embarque = total_attaches / bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    let nombre_total_bobines_main = total_attaches / bobines[type_de_bobine].Nombre_lien_bobine_main
    let prix_par_bobine = bobines[type_de_bobine].Prix;
    let prix_par_bobine_embarque = bobines[type_de_bobine].Prix_embarque;
    let prix_par_bobine_main = bobines[type_de_bobine].Prix_main;
    let prix_par_hectare_bobine = nombre_total_bobines/superficie;
    let prix_par_hectare_bobine_embarquee = nombre_total_bobines_embarque/superficie;
    let prix_par_hectare_bobine_main = nombre_total_bobines_main/superficie;

    let prix_total_bobines = prix_par_bobine * nombre_total_bobines;
    let prix_du_lien = prix_par_bobine /bobines[type_de_bobine].Nombre_lien_bobine;
    let prix_total_bobines_embarque = prix_par_bobine_embarque * nombre_total_bobines_embarque;
    let prix_du_lien_embarque = prix_par_bobine_embarque /bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    let prix_total_bobines_main = prix_par_bobine_main * nombre_total_bobines_main;
    let prix_du_lien_main = prix_par_bobine_main /bobines[type_de_bobine].Nombre_lien_bobine_main;
    let prix_total_bobines_par_ha = prix_total_bobines/superficie;
    let prix_total_bobines_embarque_par_ha = prix_total_bobines_embarque/superficie;
    let prix_total_bobines_main_par_ha = prix_total_bobines_main/superficie;

    let prix_revision_total = frais_revision * nombre_outils
    let prix_revision_total_embarque = frais_revision_embarque * nombre_outils
    let prix_consommable = prix_total_bobines + prix_revision_total;
    let prix_consommable_embarque = prix_total_bobines_embarque + prix_revision_total_embarque;
    let prix_consommable_main = prix_total_bobines_main + frais_revision_main * nombre_outils;

    let facteur_embarquee = 567/505; // cf revue LaVigne mars 2015 11%
    //embarque main const
    let temps_changement_bobine_embarque = 120;//s
    let temps_changement_bobine_main = 30.;//s
    let temps_cycle_outil_embarquee = 0.6*facteur_embarquee;//s 
    let temps_cycle_outil_main = 5.;//s
    let temps_pose_baguette_embarquee = temps_pose_baguette * facteur_embarquee;
    let temps_pose_baguette_main = temps_pose_baguette * 1.0;
    let temps_deplacement_entre_ceps_embarquee = temps_deplacement_entre_ceps * facteur_embarquee;
    let temps_deplacement_entre_ceps_main = temps_deplacement_entre_ceps * 1.0;

    let prix_outil_embarque = 900.;//e
    let prix_outil_main = 0;//e
    let temps_entre_liens_embarquee = temps_entre_liens *facteur_embarquee;
    let temps_entre_liens_main = 2.;
    // Calculs du exhaustifs du temps de travail
    // on calcule le nombre d'attache possible a la journee
    let temps_par_cep = temps_pose_baguette + (temps_entre_liens + temps_cycle_outil) * attaches_par_pieds + temps_deplacement_entre_ceps;
    let ceps_par_heure = 3600/temps_par_cep;
    let temps_par_cep_corrige = temps_par_cep + temps_changement_bobine * attaches_par_pieds / bobines[type_de_bobine].Nombre_lien_bobine;
    let ceps_par_heure_corrige = 3600/temps_par_cep_corrige;
    let temps_par_cep_embarque = temps_pose_baguette_embarquee + (temps_entre_liens_embarquee + temps_cycle_outil_embarquee) * attaches_par_pieds + temps_deplacement_entre_ceps_embarquee;
    let temps_par_cep_corrige_embarque = temps_par_cep_embarque + temps_changement_bobine_embarque * attaches_par_pieds / bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    let temps_par_cep_main = temps_pose_baguette_main + (temps_entre_liens_main + temps_cycle_outil_main) * attaches_par_pieds + temps_deplacement_entre_ceps_main;
    let temps_par_cep_corrige_main = temps_par_cep_main + temps_changement_bobine_main * attaches_par_pieds / bobines[type_de_bobine].Nombre_lien_bobine_main;

    //Temps totaux pour pie-chart
    let temps_total_pose_baguette = (temps_pose_baguette * total_pieds / 3600);
    let temps_total_cycle_outil = (temps_cycle_outil * total_pieds * attaches_par_pieds / 3600);
    let temps_total_entre_liens = (temps_entre_liens * total_pieds * attaches_par_pieds / 3600);
    let temps_total_deplacement_entre_ceps = (temps_deplacement_entre_ceps * total_pieds / 3600);
    let temps_total_changement_bobine = (nombre_total_bobines * temps_changement_bobine / 3600);

    let temps_total_pose_baguette_embarquee = (temps_pose_baguette_embarquee * total_pieds / 3600);
    let temps_total_cycle_outil_embarquee = (temps_cycle_outil_embarquee * total_pieds * attaches_par_pieds / 3600);
    let temps_total_entre_liens_embarquee = (temps_entre_liens_embarquee * total_pieds * attaches_par_pieds / 3600);
    let temps_total_deplacement_entre_ceps_embarquee = (temps_deplacement_entre_ceps_embarquee * total_pieds / 3600);
    let temps_total_changement_bobine_embarque = (nombre_total_bobines_embarque * temps_changement_bobine_embarque / 3600);


    let temps_total_pose_baguette_main = (temps_pose_baguette_main * total_pieds / 3600);
    let temps_total_cycle_outil_main = (temps_cycle_outil_main * total_pieds * attaches_par_pieds / 3600);
    let temps_total_entre_liens_main = (temps_entre_liens_main * total_pieds * attaches_par_pieds / 3600);
    let temps_total_deplacement_entre_ceps_main = (temps_deplacement_entre_ceps_main * total_pieds / 3600);
    let temps_total_changement_bobine_main = (nombre_total_bobines_main * temps_changement_bobine_main / 3600);

    //calcul a la journee
    let temps_attache_journalier = (temps_travail_journalier - 2 * temps_mise_en_route) * nombre_outils; // temps jounralier consacré a attacher (facteur 2 = un rangement a midi)
    let ceps_par_jour = temps_attache_journalier / temps_par_cep_corrige;
    let ceps_par_jour_embarque = temps_attache_journalier / temps_par_cep_corrige_embarque;
    let ceps_par_jour_main = temps_attache_journalier / temps_par_cep_corrige_main;

    //calcul nbre de jours
    let attaches_par_jour = ceps_par_jour * attaches_par_pieds;
    let attaches_par_jour_embarque = ceps_par_jour_embarque * attaches_par_pieds;
    let attaches_par_jour_main = ceps_par_jour_main * attaches_par_pieds;
    let bobines_par_jour = attaches_par_jour / bobines[type_de_bobine].Nombre_lien_bobine;
    let bobines_par_jour_embarque = attaches_par_jour / bobines[type_de_bobine].Nombre_lien_bobine_embarque;
    let bobines_par_jour_main = attaches_par_jour / bobines[type_de_bobine].Nombre_lien_bobine_main;
    let nombre_de_jours_parcelle = total_pieds / ceps_par_jour;
    let nombre_de_jours_parcelle_embarquee = total_pieds / ceps_par_jour_embarque;
    let nombre_de_jours_parcelle_main = total_pieds / ceps_par_jour_main;
    let prix_main_d_oeuvre = nombre_de_jours_parcelle * temps_travail_journalier * couts_seconde_salarie * nombre_outils;
    let prix_main_d_oeuvre_embarque = nombre_de_jours_parcelle_embarquee * temps_travail_journalier * couts_seconde_salarie * nombre_outils;
    let prix_main_d_oeuvre_main = nombre_de_jours_parcelle_main * temps_travail_journalier * couts_seconde_salarie * nombre_outils;

    //pie-chart
    let temps_total_pause = (nombre_de_jours_parcelle * nombre_outils * temps_pause_journalier / 3600);
    let temps_total_mise_en_route = (2 * nombre_de_jours_parcelle * nombre_outils * temps_mise_en_route / 3600);

    let temps_total_pause_embarquee = (nombre_de_jours_parcelle_embarquee * nombre_outils * temps_pause_journalier / 3600);
    let temps_total_mise_en_route_embarquee = (2 * nombre_de_jours_parcelle_embarquee * nombre_outils * temps_mise_en_route / 3600);

    let temps_total_pause_main = (nombre_de_jours_parcelle_main * nombre_outils * temps_pause_journalier / 3600);
    let temps_total_mise_en_route_main = (2 * nombre_de_jours_parcelle_main * nombre_outils * temps_mise_en_route / 3600);


    let prix_achat_outils = nombre_outils * prix_outil;
    let prix_achat_outils_embarque = nombre_outils * prix_outil_embarque;
    let prix_achat_outils_main = nombre_outils * prix_outil_main;

    let cout_total = prix_consommable + prix_main_d_oeuvre;
    let cout_total_par_ha = cout_total/superficie;
    let cout_total_embarque = prix_consommable_embarque + prix_main_d_oeuvre_embarque;
    let cout_total_embarque_par_ha = cout_total_embarque/superficie;
    let cout_total_main = prix_consommable_main + prix_main_d_oeuvre_main;
    let cout_total_main_par_ha = cout_total_main/superficie;

    let results_lea = {         //Value                                     //Display                                       // Units             //Chiffres significatifs
        ____: ["", "_ Entrées", ""],
        superficie: [superficie, "Superficie", "ha", 1],
        pieds_par_ha: [pieds_par_ha, "Pieds de vigne par hectare", "pieds/ha", 0],
        attaches_par_pieds: [attaches_par_pieds, "Attaches par pieds", "attaches/pied", 0],
        couts_horaire_salarie: [couts_horaire_salarie, "Cout horaire d'un salarie", "euros/heure", 0],
        // couts_seconde_salarie: [couts_seconde_salarie, "Cout seconde d'un salarie", "euros/seconde", 3],
        nombre_outils: [nombre_outils, "Nombre d'outils", "outils", 0],
        // type_de_bobine: [type_de_bobine, "Type de bobine", "type", 0],
        temps_deplacement_entre_ceps: [temps_deplacement_entre_ceps, "Temps de deplacement entre les ceps", "seconde", 1],
        temps_cycle_outil: [temps_cycle_outil, "Temps de cycle de l'outil", "seconde", 1],
        temps_changement_bobine: [temps_changement_bobine, "Temps pour changer de bobine", "seconde", 0],
        temps_pose_baguette: [temps_pose_baguette, "Temps pour poser la baguette (temps de pliage)", "seconde", 1],
        temps_entre_liens: [temps_entre_liens, "Temps entre les liens", "seconde", 1],
        temps_travail_journalier: [temps_travail_journalier, "Temps de travail journalier", "secondes", 0],
        temps_pause_journalier: [temps_pause_journalier, "Temps de pause journalier", "secondes", 0],
        temps_mise_en_route: [temps_mise_en_route, "Temps de mise en route", "secondes", 0],
        prix_outil: [prix_outil, "Prix de l'outil", "euros", 0],
        frais_revision: [frais_revision, "Frais de revision", "euros", 0],
        
        _: ["", "_Consommable", ""],
        // Calculs exhaustifs du consommable
        prix_achat_outils: [prix_achat_outils, "Prix d'achat outils (investissement)", "euros", 2],
        total_pieds: [total_pieds, "Total de pieds sur la parcelle", "pieds", 0],
        total_attaches: [total_attaches, "Total d'attaches", "attaches", 0],
        total_attaches_par_outil: [total_attaches_par_outil, "Total d'attaches par outils", "attaches", 0],
        prix_du_lien: [prix_du_lien, "Prix par lien", "euros", 5],
        // total_longueur_fil: [total_longueur_fil, "Longueur de fil total requise", "metres", 0],
        nombre_total_bobines: [nombre_total_bobines, "Nombre total de bobines requises", "bobines", 0],
        prix_par_bobine: [prix_par_bobine, "Prix par bobine", "euros/bobine", 2],
        prix_total_bobines: [prix_total_bobines, "Prix total des bobines", "euros", 2],
        prix_revision_total: [prix_revision_total, "Prix total des revisions outils", "euros", 2],
        // prix_consommable: [prix_consommable, "Prix du total consommable (revision+bobines)", "euros", 2],
        
        // Main d'oeuvre
        __: ["", "_Main d'oeuvre", ""],
        temps_par_cep: [temps_par_cep, "Temps passe par cep", "secondes", 1],
        ceps_par_heure: [ceps_par_heure, "Ceps par heure", "ceps/heures", 0],
        temps_par_cep_corrige: [temps_par_cep_corrige, "Temps par cep corrige (incluant changement de bobine)", "secondes", 0],
        temps_attache_journalier: [temps_attache_journalier, "Temps d'attache journalier (pour N outils)", "secondes", 0],
        ceps_par_jour: [ceps_par_jour, "Ceps par jours attaches", "ceps", 0],
        attaches_par_jour: [attaches_par_jour, "Attaches par jour", "attaches/jour", 0],
        bobines_par_jour: [bobines_par_jour, "Bobines ecoulees par jour", "bobines", 1],
        // nombre_de_jours_parcelle:[nombre_de_jours_parcelle,"nombre_de_jours_parcelle","jours"],
        prix_main_d_oeuvre: [prix_main_d_oeuvre, "Prix de la main d'oeuvre", "euros", 2],
        cout_total_par_ha: [cout_total_par_ha, "Cout total par ha", "euros/ha", 1],
        nombre_de_jours_parcelle: [nombre_de_jours_parcelle, "Nombre de jours pour faire la parcelle", "jours", 0],
        prix_main_d_oeuvre_bis: [prix_main_d_oeuvre, "Prix de la main d'oeuvre", "euros", 2],
        
        ___: ["", "_Total LEA30s", ""],
        // prix_consommable_bis: [prix_consommable, "Prix du consommable (bobines+revisions)", "euros", 2],
        prix_total_bobines_par_ha: [prix_total_bobines_par_ha, "Cout bobines a l'hectare", "euros", 2],
        prix_total_bobines_bis: [prix_total_bobines, "Prix total des bobines", "euros", 2],
        nombre_total_bobines_bis: [nombre_total_bobines, "Nombre total de bobines", "bobines", 0],
        ceps_par_jour_bis: [ceps_par_jour, "Pieds par jours", "pieds/jours",0],
        ceps_par_heure_corrige_bis: [ceps_par_heure_corrige, "Pieds par heure", "pieds/heure",1],
        nombre_de_jours_parcelle_bis: [nombre_de_jours_parcelle, "Nombre de jour pour faire la parcelle", "jours", 1],
        cout_total: [cout_total, "Cout total annuel (hors investissement outils)", "euros", 2]
        //
    }

    let chart_data = {
        LEA30S: {
            cout_consommable: prix_consommable.toFixed(0),
            cout_main_d_oeuvre: prix_main_d_oeuvre.toFixed(0),
            cout_total: cout_total.toFixed(0),
            detail_consommable: [prix_total_bobines.toFixed(0), frais_revision * nombre_outils],
            detail_consommable_label: ["Prix total bobines", "Frais de révisions"],
            detail_main_d_oeuvre: [temps_total_pose_baguette, temps_total_cycle_outil, temps_total_entre_liens, temps_total_deplacement_entre_ceps, temps_total_pause, temps_total_mise_en_route, temps_total_changement_bobine],
            detail_main_d_oeuvre_label: ["Pose baguette", "Cycle outil", "Entre liens", "Deplacement", "Pause operateur", "Mise en route", "Changement bobine"],
            cout_cummulatif: [
                (prix_achat_outils + 1 * cout_total).toFixed(0),
                (prix_achat_outils + 2 * cout_total).toFixed(0),
                (prix_achat_outils + 3 * cout_total).toFixed(0),
                (prix_achat_outils + 4 * cout_total).toFixed(0),
                (prix_achat_outils + 5 * cout_total).toFixed(0),
                (prix_achat_outils + 6 * cout_total).toFixed(0),
                (prix_achat_outils + 7 * cout_total).toFixed(0),
                (prix_achat_outils + 8 * cout_total).toFixed(0),
                (prix_achat_outils + 9 * cout_total.toFixed(0))
            ]
        },
        EMBARQUE: {
            cout_consommable: prix_consommable_embarque.toFixed(0),
            cout_main_d_oeuvre: prix_main_d_oeuvre_embarque.toFixed(0),

            cout_total: cout_total_embarque.toFixed(0),
            detail_consommable: [prix_total_bobines_embarque.toFixed(0), frais_revision_embarque * nombre_outils],
            detail_consommable_label: ["Prix total bobines", "Frais de révisions"],
            detail_main_d_oeuvre: [temps_total_pose_baguette_embarquee, temps_total_cycle_outil_embarquee, temps_total_entre_liens_embarquee, temps_total_deplacement_entre_ceps_embarquee, temps_total_pause_embarquee, temps_total_mise_en_route_embarquee, temps_total_changement_bobine_embarque],
            detail_main_d_oeuvre_label: ["Pose baguette", "Cycle outil", "Entre lien", "Deplacement", "Pause operateur", "Mise en route", "Changement bobine"],
            cout_cummulatif: [
                (prix_achat_outils_embarque + 1 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 2 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 3 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 4 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 5 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 6 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 7 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 8 * cout_total_embarque).toFixed(0),
                (prix_achat_outils_embarque + 9 * cout_total_embarque).toFixed(0),
            ],
        },
        MAIN: {
            cout_consommable: prix_consommable_main.toFixed(0),
            cout_main_d_oeuvre: prix_main_d_oeuvre_main.toFixed(0),
            cout_total: cout_total_main.toFixed(0),
            detail_consommable: [prix_total_bobines_main.toFixed(0), frais_revision_main * nombre_outils],
            detail_consommable_label: ["Prix total bobines", "Frais de révisions"],
            detail_main_d_oeuvre: [temps_total_pose_baguette_main, temps_total_cycle_outil_main, temps_total_entre_liens_main, temps_total_deplacement_entre_ceps_main, temps_total_pause_main, temps_total_mise_en_route_main, temps_total_changement_bobine_main],
            detail_main_d_oeuvre_label: ["temps_total_pose_baguette", "temps_total_cycle_outil", "temps_total_entre_liens", "temps_total_deplacement_entre_ceps", "temps_total_pause", "temps_total_mise_en_route", "temps_total_changement_bobine_main"],

            cout_cummulatif: [
                (prix_achat_outils_main + 1 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 2 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 3 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 4 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 5 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 6 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 7 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 8 * cout_total_main).toFixed(0),
                (prix_achat_outils_main + 9 * cout_total_main).toFixed(0),
            ],
        }
    }



    return [results_lea, chart_data]

}