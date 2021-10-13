/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useBridge } from "react-native-react-bridge";

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


  const onMymessage = (e) => {
    const { nativeEvent } = e;
    const { data } = nativeEvent;

    console.log("message recevied", e)
    console.log(JSON.parse(data));
    emit({ type: "towebview", data: "this can be input data for proof!" });
  }
return (
  <WebView
    // ref, source and onMessage must be passed to react-native-webview
    ref={ref}
    source={{ uri: 'https://461c-89-22-47-19.eu.ngrok.io' }}
    style={{marginTop:0, height:'100%' , backgroundColor: 'green'}}
    onMessage={onMymessage}
  />
);
};

export default App;
