// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

//  import React, { useState } from 'react';
//  import { LogBox } from 'react-native';
// //  import * as s from 'snarkjs';
 
 
//  import {
//    SafeAreaView,
//    ScrollView,
//    StatusBar,
//    StyleSheet,
//    Text,
//    Field,
//    Input,
//    useColorScheme,
//    View,
//    Button,
//  } from 'react-native';
 
//  import {
//    Colors,
//    Header,
//  } from 'react-native/Libraries/NewAppScreen';
 
// import {
//   webViewRender,
//   emit,
// } from "react-native-react-bridge/lib/web";

 
//  const inputs = {"a":3, b:"4"}
 
//  let wasmFile = "https://d21d-195-39-242-119.ngrok.io/circuit.wasm";
//  let zkeyFile = "https://d21d-195-39-242-119.ngrok.io/circuit_final.zkey";
//  let verificationKey = "https://d21d-195-39-242-119.ngrok.io/verification_key.json";
 
 
//  const Root = () => {
 
//    const [a, setA] = useState("3");
//      const [b, setB] = useState("11");
 
  
   
  
 
//    const changeA = (e) => {
//          setA(e.target.value);
//      };
 
//      const changeB = (e) => {
//          setB(e.target.value);
//      };
 
//    let proofInput = { a, b };
 
//    const isDarkMode = useColorScheme() === 'dark';
  
//    const backgroundStyle = {
//      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//    };
 
//    const runProofs = async () => {
//      console.log(">>>>>>>>>>>>>>>>>>> runProofs")
//      emit({ type: "proof", data: "runProofs" });

//      s.groth16.fullProve(inputs, wasmFile, zkeyFile,console).then(({ proof, publicSignals }) =>{
//        console.log(proof)
//        console.log(publicSignals)
//        emit({ type: "proof", data: publicSignals});

//        fetch(verificationKey).then(function (res) {
//           res.json().then((res2)=>{
//            console.log("start verifikation",res2)
//            s.groth16.verify(res2, publicSignals, proof,console).then((res3)=>{
//              console.log(res3)
//            })
//          })
       
//        });
     
       
//      });
 
//      // const fileName = `${RNFS.MainBundlePath}/circuit.wasm`
//      // RNFS.readFile(fileName, { encoding: 'ascii' }).then(fdWasm =>{
//      //   WitnessCalculatorBuilder(fdWasm).then(wc =>{
//      //     console.log(wc)
//      //   }).catch(e => 
//      //     console.log(e));
//      // }).catch(e => {
//      //   console.log(e)
//      // })
     
//      // const w = await wc.calculateBinWitness(input);
//      // console.log(ws)
//      // console.log(w)
     
//      // const fdWtns = await binFileUtils.createBinFile(wtnsFileName, "wtns", 2, 2);
 
//      // await wtnsUtils.writeBin(fdWtns, w, wc.prime);
//      // await fdWtns.close();
 
//    }
 
//    return (
//      <SafeAreaView style={backgroundStyle}>
//        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//        <ScrollView
//          contentInsetAdjustmentBehavior="automatic"
//          style={backgroundStyle}>
//          <Header />
//          <Text>
//                      The underlying circuit is from the snarkjs readme
//                  </Text>
//          <Button onPress={runProofs} title="Generate Proof"></Button>
//        </ScrollView>
//      </SafeAreaView>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });
 
//  export default webViewRender(<Root />);