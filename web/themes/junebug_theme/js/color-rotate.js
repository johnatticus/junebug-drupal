(function (Drupal, once) {
  Drupal.behaviors.junebugColorRotate = {
    attach(context) {
      once('junebugColorRotate', '.js-color-rotate', context).forEach((el) => {
        const colors = ['#ef3550', '#f48fb1', '#7e57c2', '#2196f3', '#26c6da', '#43a047', '#eeff41', '#f9a825', '#ff5722'];
        let i = 0;
        setInterval(() => {
          i = (i + 1) % colors.length;
          el.style.color = colors[i];
        }, 500);
      });
    }
  };
})(Drupal, once);
