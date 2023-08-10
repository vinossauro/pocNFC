import { View } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import styles from './components/styles';
import Loader from './components/Loader';
import { AppProvider } from './services/AppContext';
import InputCartao from './components/InputCartao';
import Loading from './components/Loading';

const App = () => {
  return (
    <AppProvider>
      <View style={styles.container}>
        <Loader />
        <InputCartao />
        <Loading />
      </View>
    </AppProvider>
  );
};

export default App;
