import { createContext, useCallback, useState } from 'react';

import { AuthData, IAuthContextProps, IAuthContextProviderProps, IHandleLoginProps, IProblemasSelecionados } from '@/@types/AuthContext';
import { api } from '@/services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({} as IAuthContextProps);

const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [problemasSelecionados, setProblemasSelecionados] = useState<IProblemasSelecionados[]>([]);

    const handleLogin = useCallback(async ({ login, senha }: IHandleLoginProps) => {
        // função que retorna um token JWT e os dados do usuário e salva no armazenameno local
        const url = '/login';
        await api.post(url, {
            email: login,
            senha
        })
            .then(async (res) => {

                const matricula: string = res.data.users[0].description.split('#')[1];

                setAuthData({
                    isAuth: true,
                    usuario: res.data.users[0],
                    token: res.data.token,
                    matricula
                });

                await AsyncStorage.setItem('@AuthData', JSON.stringify({
                    isAuth: true,
                    usuario: res.data.users[0],
                    token: res.data.token,
                }));
            });
    }, []);

    const handleLogout = useCallback(async () => {
        // função que limpa o armazenamento local e limpa os dados do usuário
        setAuthData(undefined);
        await AsyncStorage.removeItem('@AuthData');
    }, []);

    return (
        <AuthContext.Provider value={{ authData, handleLogin, handleLogout, problemasSelecionados, setProblemasSelecionados }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };