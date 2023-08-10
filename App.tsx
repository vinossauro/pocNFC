import React, { useEffect, useState, useRef, Fragment } from 'react';
import { View } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import styles from './components/styles';
import InputCartao from './components/InputCartao';
import Loading from './components/Loading';
import Loader from './components/Loader';


const App = () => {
  const [number, setNumber] = useState<string | null>('');
  const [input, setInput] = useState<string | null>('');
  const [loading, setLoading] = useState(false);


  const handleCheckGif = async () => {
    if (!loading) { // isso não deixa o usuário fazer outra requisição enquanto essa não termina
      setLoading(true);
      setNumber(input);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      {<Loader loading={loading} />}
        <InputCartao input={input} setInput={setInput} handleCheckGif={handleCheckGif}/>
        <Loading loading={loading} setLoading={setLoading} number={number} />
    </View>
    );
  };

export default App;
