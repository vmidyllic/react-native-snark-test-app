const loadGMaps = (callback) => {
    const existingScript = document.getElementById('snark');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://ipfs.io/ipfs/QmRrDy6rkF8Kn1t8zbyJPXTVPfe9yDSnPh2APa6GBqQMmx';
      script.id = 'snark';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };
  export default loadGMaps;