import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import axios from 'axios';

const App = () => {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    NfcManager.start();

    return () => {
      NfcManager.stop();
    };
  }, []);

  useEffect(() => {
    const cleanUp = NfcManager.setEventListener(NfcTech.Ndef, async (tag: Ndef) => {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const response = await axios.get('https://yesno.wtf/api');
        const answer = response.data.answer;
        setResult(answer);
      } catch (error) {
        console.error('Error fetching answer:', error);
      } finally {
        NfcManager.cancelTechnologyRequest();
      }
    });

    return () => {
      cleanUp.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tap an NFC Tag</Text>
      {result && <Text>API Response: {result}</Text>}
    </View>
  );
};

export default App;


