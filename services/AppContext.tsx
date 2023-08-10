import React, { FC, ReactNode, createContext, useContext, useState } from 'react';


interface Props {
    children: ReactNode; 
}

interface AppContextType {
    handleCheckGif: () => void;
    input: string | null;
    setInput: (input: string | null) => void;
    number: string | null; 
    setNumber: (number: string | null) => void;
    loading: boolean;
    setLoading: (loading:boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}


export const AppProvider: FC<Props> = ({ children }) => {
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
    



    const contextValues: AppContextType = {
        input,
        setInput,
        number,
        setNumber,
        loading,
        setLoading,
        handleCheckGif,
    };


    return (
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    );
  };





