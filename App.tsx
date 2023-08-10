import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [number, setNumber] = useState<string | null>('');
  const [input, setInput] = useState<string | null>('');
  const [gif, setGif] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let timeOut: NodeJS.Timer | null = null;
    if (inputRef.current !== null && input === '') {
      timeOut = setTimeout(() => {
        inputRef.current?.focus();
      }, 50)
    }
    return () => {
      if (timeOut !== null) {
        clearTimeout(timeOut);
      }
    }
  }, [inputRef.current, input])

  useEffect(() => {
    let timeOut: NodeJS.Timer | null = null;
    if (loading) {
      const func = async () => {
        if (number === '1553785378') {
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
        // forçando um delay para não deixar passar seguidamente; também é uma simulação para ver como seria bloquear um carregamento
        timeOut = setTimeout(() => {
          setLoading(false);
        }, 2000);
      };
      func();
    }
    return () => {
      if (timeOut !== null) {
        clearTimeout(timeOut);
      }
    }
  }, [loading]);

  const handleCheckGif = async () => {
    if (!loading) { // isso não deixa o usuário fazer outra requisição enquanto essa não termina
      setLoading(true);
      setNumber(input);
      setInput('');
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
      {
        loading &&
          <View style={{ display: 'flex', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%', zIndex: 1000, backgroundColor: "rgba(0.5,0.5,0.5,0.25)" }}>
            <Text style={{ alignSelf: 'center', padding: 20, backgroundColor: 'rgba(1,1,1,0.25)' }}>Loading...</Text>
          </View> 
      }
      <>
        <Text>Cartão Aqui</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={setInput}
          value={input || ''}
          onSubmitEditing={handleCheckGif}
        />
        <Button title="Check Gif" onPress={handleCheckGif} />
        {gif && !loading && (
          <>
            <Image
              source={{ uri: gif }}
              style={{ marginTop: 20, width: 200, height: 200 }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 36 }}>{response}</Text>
            <Text>Você leu o número: {number}</Text>
          </>
        )}
      </>
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
