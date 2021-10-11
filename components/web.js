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
//  const s = require("snarkjs");

const Root = () => {
  // console.log(s)
  // s.groth16.fullProve("","","")
  // emit({ type: "inputmsg", data: s.groth16});
//  console.log(1n)

const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    emit({ type: "loader", data: "started" });

    loadGMaps((script) => {
      emit({ type: "loader", data: "finished" });
      emit({ type: "loader script", data: script });

      setLoaded(true);
    });
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