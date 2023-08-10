import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, Image } from 'react-native';
import {  useAppContext } from '../services/AppContext';



const Loading = () => {

    const { number, loading, setLoading } = useAppContext();

    const [gif, setGif] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>('');

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
                }, 500);
            };
            func();
        }
        return () => {
            if (timeOut !== null) {
                clearTimeout(timeOut);
            }
        }
    }, [loading]);


    return (
        <>
            {gif !== null && (
                <Image
                    source={{ uri: gif }}
                    style={{ marginTop: 20, width: 200, height: 200 }}
                />
            )}
            <Text style={{ fontWeight: 'bold', fontSize: 36 }}>{response}</Text>
            <Text>Você leu o número: {number}</Text>
        </>
    );
};

export default Loading;