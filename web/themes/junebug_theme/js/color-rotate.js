(function (Drupal, once) {
  'use strict';

  const colors = [
    '#b00020',
    '#880e4f',
    '#4a148c',
    '#0d47a1',
    '#006064',
    '#1b5e20',
    '#5d4037',
    '#6d3800',
  ];
  const rotations = new WeakMap();

  function startRotation(element, rotation) {
    if (rotation.intervalId !== null || rotation.motionQuery.matches) {
      return;
    }

    rotation.intervalId = window.setInterval(() => {
      rotation.colorIndex = (rotation.colorIndex + 1) % colors.length;
      element.style.color = colors[rotation.colorIndex];
    }, 1200);
  }

  function stopRotation(element, rotation) {
    if (rotation.intervalId !== null) {
      window.clearInterval(rotation.intervalId);
      rotation.intervalId = null;
    }

    element.style.removeProperty('color');
  }

  Drupal.behaviors.junebugColorRotate = {
    attach(context) {
      once('junebugColorRotate', '.js-color-rotate', context).forEach((element) => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const rotation = {
          colorIndex: 0,
          intervalId: null,
          motionQuery,
          motionHandler: null,
        };

        rotation.motionHandler = (event) => {
          if (event.matches) {
            stopRotation(element, rotation);
          } else {
            startRotation(element, rotation);
          }
        };

        motionQuery.addEventListener('change', rotation.motionHandler);
        rotations.set(element, rotation);
        startRotation(element, rotation);
      });
    },

    detach(context) {
      once.remove('junebugColorRotate', '.js-color-rotate', context).forEach((element) => {
        const rotation = rotations.get(element);

        if (!rotation) {
          return;
        }

        stopRotation(element, rotation);
        rotation.motionQuery.removeEventListener('change', rotation.motionHandler);
        rotations.delete(element);
      });
    },
  };
})(Drupal, once);
