# react-native-snark-test-app

# React-snarkjs  project run: 

install node modules

TEMP: if IOS  in ffjavascript module / edit threadman.js file before    tm.concurrency = concurrency; (~line 122) add this piece of code
        ```
            // for safari browser
                    if (concurrency === 0){
                        //set default concurrency
                        concurrency = 2;
                    }
        ```
Run react-snarkjs file server on port 8000 (folder file-server inside snarkjs)

Use ngrok on http 8000. Replace file urls in App.tsx (only domain) (ngrok http 8000)

e.g.
	let wasmFile = "https://a801-89-22-47-19.ngrok.io/files/circuit.wasm";
	let zkeyFile = "https://a801-89-22-47-19.ngrok.io/files/circuit_final.zkey";
	let verificationKey = "https://a801-89-22-47-19.ngrok.io/files/verification_key.json"; 

Run react-snark js application on port 3000


# React-native-snark-test-app  project run: 

Use ngrok on http 3000 . Get url of local website (ngrok http 3000 --region eu)


Insert this url as web view url 

source={{ uri: 'https://461c-89-22-47-19.eu.ngrok.io' }}