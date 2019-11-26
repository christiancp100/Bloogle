var color = "#ff1078";

$(document).on('ready', function() {

  $('.field').on('focus', function() {
    $('body').addClass('is-focus');
    $('.logo-container').removeClass('logo-container__back-1');
    $('.logo-container').addClass('logo-container__back-2');
    color = "#ffffff";
    particlesJSON.particles.color.value = color;
    particlesJSON.particles.shape.stroke.color = color;
    particlesJSON.particles.line_linked.color = color;
    particlesJS("particles-js", particlesJSON);
  });

  $('.field').on('blur', function() {
    $('body').removeClass('is-focus is-type');
    color = "#ff1078";
    particlesJSON.particles.color.value = color;
    particlesJSON.particles.shape.stroke.color = color;
    particlesJSON.particles.line_linked.color = color;
    particlesJS("particles-js", particlesJSON);
    $('.logo-container').removeClass('logo-container__back-2');
    $('.logo-container').addClass('logo-container__back-1');
  });

  $('.field').on('keydown', function(event) {
    $('body').addClass('is-type');
    if((event.which === 8) && $(this).val() === '') {
      $('body').removeClass('is-type');
    }
  });

});

const particlesJSON = {
  "particles": {
    "number": {
      "value": 40,
      "density": {
        "enable": true,
        "value_area": 300
      }
    },
    "color": {
      "value": color
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 2,
        "color": color
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true
    },
    "size": {
      "value": 10,
      "random": true
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": color,
      "opacity": 0.3,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 5,
      "direction": "top",
      "random": true,
      "straight": true,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": [
          "grab",
        ]
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 0.9
        }
      },
      "bubble": {
        "distance": 600,
        "size": 8,
        "duration": 1,
        "opacity": 0.8,
        "speed": 2
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 20
      },
      "remove": {
        "particles_nb": 10
      }
    }
  },
  "retina_detect": true
};


particlesJS("particles-js", particlesJSON);
