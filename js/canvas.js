// Signature Canvas
var Signature = {
    // Propriétés
    ecriture : false, // Propriété d'activation de l'écriture
    canvas : document.getElementById("signature"), // Sélection du canvas dans le HTML
    context : null, // Définira le contexte d'utilisation du canvas

     // Méthode qui traduit l'événement Touch en Évenement pour écrans tactiles
    convertTouchEvent : function(ev) {
        var touch, ev_type, mouse_ev;
        touch = ev.targetTouches[0];
        ev.preventDefault();
        switch (ev.type) {
            // EV déclenché si un point tactile est placé sur la surface tactile
            case 'touchstart':
                // S'assure qu'un doigt est sur la cible
                if (ev.targetTouches.length != 1) {
                    return;
                }
                touch = ev.targetTouches[0];
                // Événement décenché si un bouton de pointage est appuyé sur l'élément
                ev_type = 'mousedown';
                break;
                // EV déclenché si un point tactile est déplacé le long de la surface tactile
            case 'touchmove':
                // S'assure qu'un doigt est sur la cible
                if (ev.targetTouches.length != 1) {
                    return;
                }
                touch = ev.targetTouches[0];
                // Événement est déclenché si le pointage est déplacé sur l'élément
                ev_type = 'mousemove';
                break;
                // EV déclenché si le point tactile quitte la surface tactile
            case 'touchend':
                // Sassure que le doigt a été enlever de la cible
                if (ev.changedTouches.length != 1) {
                    return;
                }
                touch = ev.changedTouches[0];
                // Événement déclenché si le bouton de pointage est relâché de l'élément
                ev_type = 'mouseup';
                break;
            default:
                return;
        }
        mouse_ev = document.createEvent("MouseEvents");
        mouse_ev.initMouseEvent(
            // définis ses paramétres
            ev_type, // L'événement "type" Souris
            true,
            true,
            window, // Vue de l'événement
            0, // Compte de clic de souris
            touch.screenX, // Coordonnée X de l'écran
            touch.screenY, // Coordonnée Y de l'écran
            touch.clientX, // Coordonnée X du client
            touch.clientY, // Coordonnée Y du client
            0, // Bouton de la souris
            null // Cible
        );
        this.dispatchEvent(mouse_ev);
    },
     // Méthode qui récupére les coordonnées de l'Élément de pointage
    getMousePos : function(event) {
        // Renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage
        rect = this.canvas.getBoundingClientRect(); 
         return{
            // Ces positions horizontal et vertical
            x:event.clientX - rect.left,
            y:event.clientY - rect.top
        };
    },
     // Méthode qui détermine le déplacement de l'élément de pointage
    deplacementSouris : function(event) {
        sourisPosition = this.getMousePos(event); // Coordonnées de l'élément de pointage retourner par la méthode "getMousePos"
        positionX = sourisPosition.x;
        positionY = sourisPosition.y;
        this.dessin(positionX, positionY);
    },
     // Méthode qui permet de dessiner dans le canvas
    dessin : function(positionX, positionY) {
        // Définis le contexte de dessin 2d, qui va nous permettre de dessiner à l'intérieur
        this.context = this.canvas.getContext("2d"); 
        // Définis l'épaisseur du tracé
        this.context.lineWidth = 5;
         if(this.ecriture){
            this.context.lineTo(positionX, positionY); // Désigne le point d'arrivé du tracer
            this.context.stroke(); // Effectue le tracer
        }
    },
     // Méthode qui permet de désactiver l'écriture
    desactivationDessin : function() {
        this.ecriture = false; // Désactive l'écriture dans le canvas
    },
     // Méthode qui active et débute l'écriture dans le canvas
    activationDessin : function() {
        this.ecriture = true; // Active l'écriture sur le canvas
        this.context.beginPath(); // Commence un nouveau chemin de dessin
        this.context.moveTo(positionX, positionY); // Désigne le début du tracer
    },
     // Méthode qui permet d'effacer le canvas
    clearCanvas : function() {
        this.context.clearRect(0, 0, 800, 200); // Réinitialise le canvas
    }
      
}
 // Appel des méthodes sur écrans tactiles
Signature.canvas.addEventListener("touchstart", Signature.convertTouchEvent);
Signature.canvas.addEventListener("touchmove", Signature.convertTouchEvent);
Signature.canvas.addEventListener("touchend", Signature.convertTouchEvent);
 // Appel des méthodes sur PC
Signature.canvas.addEventListener("mousedown", Signature.activationDessin.bind(Signature));
Signature.canvas.addEventListener("mousemove", Signature.deplacementSouris.bind(Signature));
Signature.canvas.addEventListener("mouseup", Signature.desactivationDessin.bind(Signature));
 // Appel de la méthode d'effacement du canvas lors de l'appui sur le bouton "effacer"
document.getElementById("boutonEffacer").addEventListener("click", function() {
    Signature.clearCanvas();
});
