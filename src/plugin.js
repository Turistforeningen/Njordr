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

    function onFotowebSelected(e) {
      window.removeEventListener('fotoweb.selected', onFotowebSelected);
      callback(e.detail);
      popup.close();
    }

    function onFotowebCancelled(e) {
      window.removeEventListener('fotoweb.cancelled', onFotowebCancelled);
      popup.close();
    }

    window.addEventListener('fotoweb.selected', onFotowebSelected, false);
    window.addEventListener('fotoweb.cancelled', onFotowebCancelled, false);
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
