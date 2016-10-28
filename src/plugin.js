const fotoweb = {
  open: (options, callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback argument is required');
    }

    const popup = window.open(
      `${window.fotoweb.path}/browser.html`,
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

// Set URL path to fotoweb plugin
try {
  const scripts = document.getElementsByTagName('script');
  fotoweb.path = scripts[scripts.length - 1].src.replace('/plugin.js', '');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Could not find path to FotoWeb plugin – is it loaded in a script tag?');
}

window.fotoweb = fotoweb;
