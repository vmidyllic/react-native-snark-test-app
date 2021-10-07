/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { LogBox, TextInput } from 'react-native';
import * as s from 'react-native-snarkjs';
// var RNFS = require('react-native-fs');

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

let wasmFile = "https://{{url}}/circuit.wasm";
let zkeyFile = "https://{{url}}/circuit_final.zkey";
let verificationKey = "https://{{url}}/verification_key.json";


const App = () => {

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <TextInput  value={text}  onChangeText={setText} />
    
        <Button onPress={runProofs} title="Generate Proof"></Button>
      </ScrollView>

    </SafeAreaView>
    
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
