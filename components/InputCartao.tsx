import React, { useEffect, useRef } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import styles from './styles';

interface Props {
  input: string | null;
  setInput: (input: string | null) => void;
  handleCheckGif: () => void;
}

const InputCartao = ({ input,
  setInput,
  handleCheckGif,
}: Props) => {

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