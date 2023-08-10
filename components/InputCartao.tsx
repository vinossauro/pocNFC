import React, { useEffect, useRef } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import styles from './styles';

interface InputCartaoProps {
  input: string | null;
  setInput: (input: string | null) => void;
  handleCheckGif: () => void;
}

const InputCartao = ({ input,
  setInput,
  handleCheckGif,
}: InputCartaoProps) => {

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null;
    console.log("entrou");
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
  }, [input]);

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
