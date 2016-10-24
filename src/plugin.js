const fotoweb = {
  open: (options, callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback argument is required');
    }

    const popup = window.open(
      window.fotoweb.path.replace('plugin.js', 'browser.html'),
      JSON.stringify(options),
      'width=940,height=660,resizable=yes,dialog=yes,modal=yes,scrollbars=yes,top=100,left=200'
    );

    window.addEventListener('fotoweb.selected', (e) => {
      callback(e.detail);
      popup.close();
    }, false);

    window.addEventListener('fotoweb.cancelled', (e) => {
      popup.close();
    }, false);
  },
};

const scripts = document.getElementsByTagName('script');
fotoweb.path = scripts[scripts.length - 1].src;

window.fotoweb = fotoweb;
