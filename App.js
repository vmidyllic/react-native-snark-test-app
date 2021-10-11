/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import { LogBox, TextInput } from 'react-native';
import * as s from 'react-native-snarkjs';
// var RNFS = require('react-native-fs');
import { WebView } from 'react-native-webview';

import { useBridge } from "react-native-react-bridge";
import webApp from "./components/web";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Field,
  Input,
  useColorScheme,
  View,
  Button,
  TextView,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';


const inputs = {"a":3, b:"4"}

let wasmFile = "https://5d3f-195-39-242-119.ngrok.io/circuit.wasm";
let zkeyFile = "https://5d3f-195-39-242-119.ngrok.io/circuit_final.zkey";
let verificationKey = "https://5d3f-195-39-242-119.ngrok.io/verification_key.json";


const App = () => {

  const myWebView = useRef();

  const [a, setA] = useState("3");
	const [b, setB] = useState("11");

  const [text, setText] = useState("ff");

  const changeA = (e) => {
		setA(e.target.value);
	};
  const changeText = (e) => {
    console.log(e)
		setText(e.target.value);
	};

	const changeB = (e) => {
		setB(e.target.value);
	};

  // console.log(webApp)

  const { ref, onMessage, emit } = useBridge((message) => {
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    console.log("I received message")
    console.log(message)
    if (message.type === "loader" && message.data === "finished") {
      setTimeout(()=>{
        emit({ type: "loader", data: "succeeded!" });
        console.log("I sent message")

      },4000)
    }
  });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const runProofs = async () => {
    console.log(">>>>>>>>>>>>>>>>>>> runProofs")

    s.groth16.fullProve(inputs, wasmFile, zkeyFile,console).then(({ proof, publicSignals }) =>{
      console.log(proof)
      console.log(publicSignals)
      
      fetch(verificationKey).then(function (res) {
         res.json().then((res2)=>{
          console.log("start verifikation",res2)
          setText(publicSignals.toString())

          s.groth16.verify(res2, publicSignals, proof,console).then((res3)=>{
            console.log(res3)
            setText(res3.toString())

          })
        })
      
      });
    
      
    });


  }
// function  onMessage( event ) {
//     console.log( "On Message", event.nativeEvent.data );
// }
//  function  sendPostMessage () {
//     console.log( "Sending post message" );
//     console.log("here ", myWebView.current)
//     myWebView.current.postMessage( "Post message from react native")
//     // myWebView.current.postMessage( "Post message from react native" );
// } 
// console.log(source)
 
return (
  <WebView
    // ref, source and onMessage must be passed to react-native-webview
    ref={ref}
    source={{ html: webApp }}
    style={{marginTop:200, height:400 , backgroundColor: 'green'}}
    onMessage={onMessage}
  />
);
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
