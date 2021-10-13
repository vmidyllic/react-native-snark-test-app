// WebApp.js

import React, { useState,useEffect } from "react";
import {
  webViewRender,
  emit,
  useSubscribe,
} from "react-native-react-bridge/lib/web";
import loadGMaps from './loader';
//  import   * as s  from "";
//  const s = require("react-native-ffjavascript/build/ffjavascript");
//  const s = require("../node_modules/react-native-snarkjs/build/snarkjs");
//  const s = require("snarkjs");
import   * as s  from "snarkjs";
let wasmFile = "https://5d3f-195-39-242-119.ngrok.io/circuit.wasm";
let zkeyFile = "https://5d3f-195-39-242-119.ngrok.io/circuit_final.zkey";
let verificationKey = "https://5d3f-195-39-242-119.ngrok.io/verification_key.json";
const inputs = {"a":3, b:"4"}
const Root = () => {
  // console.log(s)
  // s.groth16.fullProve("","","")
  // emit({ type: "inputmsg", data: s.groth16});
//  console.log(1n)

const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    emit({ type: "loader", data: "started" });
    // emit({ type: "loader", data: s.groth16.fullProve() });
    console.log(s);
    // loadGMaps((script) => {
    //   emit({ type: "loader", data: "finished" });
    //   emit({ type: "loader script", data: script });
    //
    //   setLoaded(true);
    // });
  });

  const [data, setData] = useState("");
  // useSubscribe hook receives message from React Native
  useSubscribe((message) => {

    emit({ type: "console.log", data: "message from native" + JSON.stringify(message)});

    if (message.type === "loader") {
      // setData(message.data);
      emit({ type: "script", data: document});

    }
  });
  const console = {
    log: (e) => {
      emit({ type: "consoleLOG", data: e});
    },
    debug: (e) => {
      emit({ type: "consoledebug", data: e});
    }
  }
  return (
    <body>
    <div>
      <div>{data}</div>
      <div className="maps-component">
      {loaded ? 'loaded' : 'loading'}
    </div>
      <input type="text" size="40" onClick={() => {
          // emit sends message to React Native
          //   type: event name
          //   data: some data which will be serialized by JSON.stringify
          emit({ type: "inputmsg", data: "ft" });
        }}/>
      <button
        onClick={() => {
          // emit sends message to React Native
          //   type: event name
          //   data: some data which will be serialized by JSON.stringify
          emit({ type: "window.snarkjs", data: window.snarkjs});

          s.groth16.fullProve(inputs, wasmFile, zkeyFile, console).then(()=>{
            emit({ type: "fullProveOK", data: 'OK'});
          }).catch(()=>{
            emit({ type: "fullProveOK", data: 'NEOK'});
          })
          emit({ type: "ssss", data: s.groth16.fullProve().then()});
          emit({ type: "window.snarkjs.groth16", data: JSON.stringify(window.snarkjs.groth16) });
          emit({ type: "window.snarkjs.groth16.fullProve", data: window.snarkjs.groth16.fullProve });

        }}
      />
    </div>
    </body>
  );
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
