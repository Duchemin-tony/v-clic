
// Objet compteur
var Compteur = {
    minutes : 20, 
    secondes : 00, 
    minutesElt : null, // Élément minutes (celui qui sera inséré dans le HTML)
    secondesElt : null, // Éléments secondes (celui qui sera inséré dans le HTML)
    nomStation : null, 
    compteARebour : null, // Propriété du compte à rebours
    compteARebourTerminer : null, // Propriété du compte à rebours terminé
    annulationReservation : false, // Demande de confirmation d'annulation de la réservation
    nomClient : document.getElementById("infoClient") , // Propriété d'information client (nom)
    prenomClient : document.getElementById("infoClient"), // Propriété d'information client (prenom)

     // Méthode de lancement d'une réservation
    lancementReservation : function() {
        // On récupére le nom et prénom du client
        var nomElt = document.getElementById("nom");
        var prenomElt = document.getElementById("prenom");
        var valeurNom = nomElt.value;
        var valeurPrenom = prenomElt.value;
        // Mis en place des sessions storage
        sessionStorage.setItem("minutes", this.minutes);
        sessionStorage.setItem("secondes", this.secondes);
        sessionStorage.setItem("nomStation", Station.nom);
        sessionStorage.setItem("Nom", valeurNom);
        sessionStorage.setItem("Prenom", valeurPrenom);
        // Enregistre la session storage du nom de la station dans son attribut
        this.nomStation = sessionStorage.getItem("nomStation");
        // Enregistre la session storage du nom et prénom du client dans son attribut
        this.nomClient = sessionStorage.getItem("nomClient");
        this.prenomClient = sessionStorage.getItem("prenomClient");
        // On cache le Canvas sauf la section de location
        document.getElementById("containerCanvas").style.display = "none"; // Le canvas
        document.getElementById("sectionLocation").style.display = "block"; // La section de location
        // Affichage du message de confirmation
        document.getElementById("messageConfirmationLocation").style.display = "block";
        // Disparition du message de confirmation
        setTimeout(function() {
        document.getElementById("messageConfirmationLocation").style.display = "none";
        }, 3000);
        // Insert le nom de la station
        document.getElementById("messageLocation").querySelector("strong").innerHTML = this.nomStation;
        // Insert le nom et le prénom du client
        document.getElementById("infoClient").innerHTML = valeurNom + " " + valeurPrenom;
        // Lancement du compte à rebours
        this.compteARebour = setInterval("Compteur.initCompteur()", 1000);
    },

     // Méthode ré-initialisation du compte à rebours
    initCompteur : function() {
        if(this.minutes < 10) { // SI il reste moins de 10 minutes
            // Ajoute un 0 devant les minutes
            this.minutesElt = "0" + this.minutes;
        } else {
            // Sinon les minutes s'affichent normalement
            this.minutesElt = this.minutes;
        }
         if(this.secondes < 10) { // Si il reste moins de 10 secondes
            // Ajoute un 0 devant les secondes
            this.secondesElt = "0" + this.secondes;
        } else {
            // Sinon les secondes s'affichent normalement
            this.secondesElt = this.secondes;
        }
         // Insertion du compte à rebours dans le HTML
        document.getElementById("compteur").innerHTML = this.minutesElt + " : " + this.secondesElt;
         // Lance le fonctionnement du compte à rebours
        this.compteurStart();
    },
     // Méthode de fonctionnement du compte à rebours
    compteurStart : function() {
        if((this.minutes >= 0) && (this.secondes > 0)) { // Si il reste plus de 0 seconde
             // On diminue les secondes
            this.secondes--;
            // Modification de la session storage
            sessionStorage.setItem("secondes", this.secondes);
         } else if((this.minutes > 0) && (this.secondes <= 0)) { // Sinon si les minutes sont Supérieures à 0 et les secondes inférieures ou égale à 0
             // On replace les secondes à 59
            this.secondes = 59;
            // On diminue les minutes
            this.minutes--;
             // Modification des session storage
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("secondes", this.secondes);
         } else if((this.minutes == 0) && (this.secondes == 0)) { // Sinon si les minutes et les secondes sont égales à 0 (compte à rebours terminer)
             // Affichage du message de fin de location
            document.getElementById("messageFinLocation").style.display = "block";
             // Cache le message de location
            document.getElementById("messageLocation").style.display = "none";
             // Appel de la méthode "reservationTerminer"
            this.compteARebourTerminer = setTimeout("Compteur.reservationTerminer()", 4000);
        }
    },
     // Méthode appelée à la fin de la réservation
    reservationTerminer : function() {
        // Arrêt du compte à rebours
        clearInterval(this.compteARebour);
         // Reset des attributs du compte à rebours
        this.minutes = 20;
        this.secondes = 00;
        this.minutesElt = null;
        this.secondesElt = null;
         // Suppression de la session storage
        sessionStorage.clear();
         // Arrêt de l'appel à la méthode
        clearTimeout(this.compteARebourTerminer);
         // Remets en place l'affichage par défaut des blocs
        document.getElementById("sectionLocation").style.display = "none";
        document.getElementById("messageFinLocation").style.display = "none";
        document.getElementById("messageLocation").style.display = "block";
    },
     // Méthode d'annulation d'une réservation
    annulerReservation : function() {
         // Fait apparaître le message de confirmation de la suppression
        document.getElementById("annulationReservation").style.display = "block";
        // Le message disparaît après 3 secondes
        setTimeout(function() {
        document.getElementById("annulationReservation").style.display = "none";
        }, 3000);
         // Lance la méthode de fin d'une réservation afin de supprimer les sessions storage et arrêter le compte à rebours
        this.reservationTerminer();
    },
     // Méthode qui vérifie si une réservation est en cours lors du rafraîchissement
    verificationSessionStorage : function() {
        if (sessionStorage.getItem("minutes")) { // Si une réservation est en cours
            // Récupération et stockage des sessions storage dans les attributs
            this.minutes = sessionStorage.getItem("minutes"); // Minutes
            this.secondes = sessionStorage.getItem("secondes"); // Secondes
            this.nomStation = sessionStorage.getItem("nomStation"); // Nom de la station de réservation
            this.nomClient = sessionStorage.getItem("Nom"); // Nom du client 
            this.prenomClient = sessionStorage.getItem("Prenom"); // Prénom du client
             // Relance le compte à rebours
            this.compteARebour = setInterval("Compteur.initCompteur()", 1000);
             // Insert le nom de la station
            document.getElementById("messageLocation").querySelector("strong").innerHTML = this.nomStation;
            // Insert le nom et le prénom du client
            document.getElementById("infoClient").innerHTML = this.nomClient + " " + this.prenomClient;
            document.getElementById("sectionLocation").style.display = "block";
        } else { // Si aucune réservation est en cours
            // Fait disparaître le cadre de réservation
            document.getElementById("sectionLocation").style.display = "none";
        }
    },
     // Méthode qui annule la réservation en cours
    resetReservation : function() {
        if(this.nomStation != Station.nom) { 
            // Affiche une demande de confirmation
            this.annulationReservation = window.confirm("Cette nouvelle réservation annulera la réservation sur la station : " + this.nomStation +
            "\net enregistrera une nouvelle réservation sur la station " + Station.nom);
        } else { // Sinon les deux noms sont identiques
            // Affiche une demande de confirmation
            this.annulationReservation = window.confirm("Cette nouvelle réservation remplacera la réservation déja existante sur la station : \n" + this.nomStation);
        }
         if (this.annulationReservation) { // Si l'utilisateur a souhaité supprimer sa réservation en cours
            // Suppression de la session storage
            sessionStorage.clear();
             // Arrêt du compte à rebours
            clearInterval(this.compteARebour);
             // Reset des attributs du compte à rebours
            this.minutes = 20;
            this.secondes = 00;
            this.minutesElt = null; 
            this.secondesElt = null;
             // Lance la méthode de lancement d'une réservation
            this.lancementReservation();
        }
    }
}


 // Vérification de l'existence d'une réservation
Compteur.verificationSessionStorage();
 // Événements lors de la validation du Canvas et des input
document.getElementById("boutonValider").addEventListener("click", function() {
    var name = document.getElementById("nom").value;
    var lastName = document.getElementById("prenom").value;
    submitOK = "true";
    if (name.length > 10 || name.length < 2) {
        alert("Votre nom doit comporter entre 2 et 10 caractères");
        submitOK = "false";
    } 
    if (lastName.length > 10 || lastName.length < 2) {
        alert("Votre prénom doit comporter entre 2 et 10 caractères");
        submitOK = "false";
    } 
    if (submitOK == "false") {
        return false;
    }
    Signature.clearCanvas(); // Efface le Canvas
     // Vérification d'une réservation existante
    if(sessionStorage.getItem("minutes")) { // Si une réservation existe
        // Suppression de la réservation existante
        Compteur.resetReservation();
    } else { // Aucune réservation n'existe
        // Lance la méthode de lancement de la réservation
        Compteur.lancementReservation();
    }
});
 // Evénement lors du clique sur le bouton d'annulation d'une réservation
document.getElementById("annulation").addEventListener("click", function() {
    // Lance la méthode d'annulation
    Compteur.annulerReservation();
});

// localStorage Nom
var nomClient = document.getElementById("nom");

if (localStorage.getItem("autosaveA")) {
    nomClient.value = localStorage.getItem("autosaveA");
}

nomClient.addEventListener("change", function() {
    localStorage.setItem("autosaveA", nomClient.value);
});

// localStorage Prenom
var prenomClient = document.getElementById("prenom");

if (localStorage.getItem("autosaveB")) {
    prenomClient.value = localStorage.getItem("autosaveB");
}

prenomClient.addEventListener("change", function() {
    localStorage.setItem("autosaveB", prenomClient.value);
});








































