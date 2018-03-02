const FotoWeb = class FotoWeb {
  confirmSelected(selected) {
    this.callback(selected);
    this.popup.close();
  }

  cancel() {
    this.popup.close();
  }

  open(options, callback, errorHandler) {
    this.callback = callback;
    this.errorHandler = errorHandler || function(err) {  //eslint-disable-line
      console.warn('No error handler defined for FotoWeb'); // eslint-disable-line
      console.error('An error occured', err);
    };

    this.popup = window.open(
      `${window.fotoweb.path}/browser.html`,
      JSON.stringify(options),
      'width=940,height=660,resizable=yes,dialog=yes,modal=yes,scrollbars=yes,top=100,left=200'
    );
  }
};

const fotoweb = new FotoWeb();

// Set URL path to fotoweb plugin
try {
  const scripts = document.getElementsByTagName('script');
  fotoweb.path = scripts[scripts.length - 1].src.replace('/plugin.js', '');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Could not find path to FotoWeb plugin – is it loaded in a script tag?');
}

window.fotoweb = fotoweb;
