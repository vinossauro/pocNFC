import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  //const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>('');
  const [input, setInput ] = useState<string | null>('');
  const [gif, setGif] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>('');
  const inputRef = useRef<TextInput>(null);
  const [leitura, setLeitura] = useState(false);

  useEffect(() => {
    // console.log("carregou");
    // console.log('current', inputRef.current);
    // console.log('input', input);
    let timeOut : NodeJS.Timer|null = null;
    if (inputRef.current !== null && input===''){
      timeOut = setTimeout(() => {
        //console.log('entrou');
        inputRef.current?.focus();
      }, 0) 
    }
    return () => {
      if(timeOut !== null){
        clearTimeout(timeOut);
      }
    }
  }, [inputRef, input])


  




  const handleCheckGif = async () => {

    setNumber(input);
    setInput('');
    
    if (input === '1553785378') {
      try {
        
        const response = await axios.get('https://yesno.wtf/api');
        const img = response.data.image;
        const answer = response.data.answer;

        setGif(img);
        setResponse(answer);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    } else {
      setResponse("Senha inválida");
      setGif('https://www.quickanddirtytips.com/wp-content/uploads/2022/04/wrong-or-wrongly%20(3).jpg');
    }

    
  };

  // useEffect(() => {
  //   const cleanUp = NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag) => {
  //     try {
  //       // Unregister the tag event to avoid repeated triggers
  //       await NfcManager.unregisterTagEvent();

  //       // Make an API call
  //       const response = await axios.get('https://yesno.wtf/api');
  //       const answer = response.data.answer;
        
  //       // Update state to display API response on the screen
  //       setApiResponse(answer);
  //     } catch (error) {
  //       console.error('Error during API call:', error);
  //     }
  //   });
  // }, []);


  return (
    <View style={styles.conteiner}>
      <Text>Cartão Aqui</Text>
      <TextInput
      ref={inputRef}
      style={styles.input}
      onChangeText={setInput}
      value={input || ''}
      onSubmitEditing={handleCheckGif}
      />
      <Button title="Check Gif" onPress={handleCheckGif} />
      {gif && (
        <>
          <Image
            source={{ uri: gif }} 
            style={{ marginTop: 20, width: 200, height: 200 }} 
          />
          <Text>{response}</Text>
          <Text>Você leu o número: {number}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


export default App;
