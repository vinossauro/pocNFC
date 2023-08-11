import React, { useEffect, useRef } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import styles from './styles';
import { useAppContext } from '../services/AppContext';


const InputCartao = () => {

  const { input, setInput, handleCheckGif} = useAppContext();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null;
    if (inputRef.current !== null && input === '') {
      timeOut = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
    return () => {
      if (timeOut !== null) {
        clearTimeout(timeOut);
      }
    };
  }, [input, inputRef.current]);

  return (
    <View>
      <Text>Cartão Aqui</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={setInput}
        value={input || ''}
        onSubmitEditing={handleCheckGif}
      />
      <Button title="Check Gif" onPress={handleCheckGif} />
    </View>
  );
};

export default InputCartao;
