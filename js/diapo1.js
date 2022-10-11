    var Slider = {
    // Définis le diaporama
    currentIndex: 0,
    // Initialise les fonctions
    init: function () {
        Slider.autoSlide();
        Slider.playAutoClick();
        Slider.nextSlideOnClick();
        Slider.prevSlideOnClick();
        Slider.changeSlideOnKeypress();
    },

    // Affiche le diaporama
    activeSlide: function () {
        var slides = $('.item');
        // Réduit l'ensemble des éléments à l'index spécifié
        var slide = slides.eq(Slider.currentIndex);
        // Cache les éléments, sinon il s'affiche les un en dessous des autres
        slides.hide();
        slide.css('display', 'flex');
    },

    // Définis la position de l'image suivante
    indexPlus: function () {
        var slides = $('.item');
        // Parcours les éléments .item 
        var slidesNumber = slides.length;
        // Ajoute une valeur +1
        Slider.currentIndex += 1;
        // SI slidesNumber - 1 , Reviens à 0 donc à la première image
        if (Slider.currentIndex > slidesNumber - 1) {
            Slider.currentIndex = 0;
        }
    },

    // Définis la position de l'image précédente
    indexMinus: function () {
        var slides = $('.item');
        // Parcours les éléments .item
        var slidesNumber = slides.length;
        // Diminue de -1
        Slider.currentIndex -= 1;
        // SI currentIndex plus petit que 0 ALORS reviens à -1 à la dernière image
        if (Slider.currentIndex < 0) {
            Slider.currentIndex = slidesNumber - 1;
        }
    },

    // Fonction automatique du diaporama, de son arrêt et sa reprise
    autoSlide: function () {
        var play = $('#play');
        // Créer un événement 
        play.click(function () {
            // Appel la fonction de manière répétée
            var timer = setInterval(function () {
                // Appel la fonction indexPlus qui incrémente
                Slider.indexPlus();
                // Appel la fonction qui affiche le diapo 
                Slider.activeSlide();
            // D'une intervalle de 5 secondes
            }, 5000);
            var stop = $('#stop');
            // Créer un événement
            stop.click(function () {
                // Annule l'interval
                clearInterval(timer);
            });
        });

    },

    // curseur automatique play
    playAutoClick: function () {
        var play = $('#play');
        // Active le slide automatiquement au chargement de la page
        play.trigger('click');
    },

    // Passer à l'image suivante
    nextSlideOnClick: function () {
        var next = $('.next');
        // Créer un événement sur le bouton next
        next.click(function () {
            // Appel fonction
            Slider.indexPlus();
            Slider.activeSlide();
        });
    },

    // Passer à l'image précédente
    prevSlideOnClick: function () {
        var prev = $('.prev');
        // Créer un événement sur le bouton prev
        prev.click(function () {
            // Appel fonction 
            Slider.indexMinus();
            Slider.activeSlide();
        });
    },



    // Controle de l'image précédente et suivante avec clavier
    changeSlideOnKeypress: function () {
        $('body').keydown(function (e) {
            // Saisie la touche du clavier droite
            if (e.which === 39) {
                // Appel fonction
                Slider.indexPlus();
                Slider.activeSlide();
            // Saisie la touche du clavier gauche
            } else if (e.which === 37) {
                // Appel fonction
                Slider.indexMinus();
                Slider.activeSlide();
            }
        })
    },
}


$(function () {
    Slider.init();
});



