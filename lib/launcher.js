const script = document.createElement('script');

const nocache = Date.now();
script.src = `__BOOKMARKLET_URL__/bookmarklet.js?${nocache}`;
script.type = 'module';

// clean up
script.onload = () => setTimeout(() => script.remove(), 1000);

document.body.appendChild(script);
