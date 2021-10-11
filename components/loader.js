const loadGMaps = (callback) => {
    const existingScript = document.getElementById('snarko');
    if (!existingScript) {
      const script = document.createElement('script');
    //   script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-51765955-1';
      script.src = 'https://raw.githubusercontent.com/iden3/snarkjs/master/build/snarkjs.min.js';// 'https://ipfs.io/ipfs/QmRrDy6rkF8Kn1t8zbyJPXTVPfe9yDSnPh2APa6GBqQMmx';
      script.id = 'snarko';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback(script);
      };
    }
    if (existingScript && callback) callback(script);
  };
  export default loadGMaps;