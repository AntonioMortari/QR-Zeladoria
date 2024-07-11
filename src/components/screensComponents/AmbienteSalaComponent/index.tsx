import { useState } from 'react';
import { Text, View } from 'react-native';

import { IProblemasSelecionados } from '@/@types/AuthContext';
import { IAmbienteSalaComponentProps } from '@/@types/ambienteSala';
import { Loading } from '@/components/shared/Loading';
import Accordion from '@/components/shared/Accordion';
import { Button } from '@/components/shared/Button';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { theme } from '@/theme';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/layout';
import { styles } from './styles';

import CheckBox from "react-native-bouncy-checkbox";
import { router } from 'expo-router';


/**
    Componente para exibir os itens e problemas de um ambiente
    @param isLoading Inidica se os dados estão sendo carregados
    @param ambienteData Dados do ambiente
    @param detalhesItensData Dados dos detalhes dos itens do ambiente
 */

const AmbienteSalaComponent = ({
    isLoading,
    ambienteData,
    detalhesItensData
}: IAmbienteSalaComponentProps) => {
    const { problemasSelecionados, authData, setProblemasSelecionados } = useAuth();

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [newProblemasSelecionados, setNewProblemasSelecionados] = useState<IProblemasSelecionados[]>(problemasSelecionados);

    const navigateToLogin = () => {

        setProblemasSelecionados(
            newProblemasSelecionados.filter(item => item.problemas.length > 0)
        ); //para evitar que sejam enviados itens sem problemas selecionados

        if (newProblemasSelecionados.filter(item => item.problemas.length > 0).length === 0) {
            // se não houver nenhum problema selecionado
            return setErrorMessage('Selecione pelo menos um problema de um item para continuar!');
        }

        setErrorMessage('');
        if (authData?.isAuth) {
            // se o usuário já estiver autenticado, redireciona para a tela de revisão
            return router.navigate({
                pathname: 'app/manutencao-zeladoria/revisao',
                params: { idSala: ambienteData._id }
            });
        }

        // se o o usuário não estiver autenticado, redireciona para a tela de login
        router.navigate({
            pathname: 'app/manutencao-zeladoria/login',
            params: { idSala: ambienteData._id }
        });
    }

    const handleToggleProblemasSelecionados = (itemId: string, itemNome: string, problemaId: string, problemaNome: string) => {
        setErrorMessage('');
        const indexItem = newProblemasSelecionados.findIndex(item => item.itemId === itemId);

        if (indexItem === -1) {
            // Se o item não existe, adiciona um novo objeto com o itemId e problemaId
            setNewProblemasSelecionados(prevState => [...prevState, { itemId, itemNome, problemas: [{ id: problemaId, nome: problemaNome }] }]);
            return;
        }

        const objItem = newProblemasSelecionados[indexItem];

        if (objItem.problemas.some(problema => problema.id == problemaId)) {
            // Se o problemaId já existe no array de problemas, remove-o
            objItem.problemas = objItem.problemas.filter(problema => problema.id !== problemaId);
        } else {
            // Caso contrário, adiciona o problema ao array de problemas do item
            objItem.problemas.push({ id: problemaId, nome: problemaNome });
        }

        // Atualiza o estado com os novos dados
        setNewProblemasSelecionados(prevState => {
            const novosDados = [...prevState];
            novosDados[indexItem] = { ...novosDados[indexItem], problemas: objItem.problemas };
            return novosDados;
        });
    }

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Loading size='large' />
                </View>
            ) : (
                <>
                    {ambienteData._id ? (
                        <>
                            <Layout
                                title={ambienteData.manutencaoLocal.descricao_local}
                                subtitle={ambienteData.manutencaoPredios.descricao_predios}
                                text='Selecione os itens que estão apresentando problemas na sala.'
                            >


                                <View style={styles.containerItens}>
                                    {ambienteData.manutencaoItem.map((item, index) => (
                                        // renderiza um item (Accordion)
                                        <Accordion
                                            title={item.descricao_item}
                                            key={item._id}
                                            content={(

                                                <>

                                                    {detalhesItensData.map(detalhesItem => {
                                                        if (detalhesItem._id === item._id) {
                                                            return (
                                                                // renderiza os problemas de cada item
                                                                <View style={styles.containerProblemas} key={index + 10}>
                                                                    {detalhesItem.manutencaoProblemas.map(problema => {
                                                                        return (
                                                                            <CheckBox
                                                                                fillColor={theme.colors.secondary}
                                                                                text={problema.descricao_problemas}
                                                                                key={problema._id}
                                                                                size={22}
                                                                                onPress={() => handleToggleProblemasSelecionados(item._id, item.descricao_item, problema._id, problema.descricao_problemas)}
                                                                                textStyle={{ textDecorationLine: 'none', color: theme.colors.black, textTransform: 'capitalize' }}
                                                                            />
                                                                        );
                                                                    })}
                                                                </View>

                                                            )
                                                        }
                                                    })}

                                                </>
                                            )}
                                        />
                                    ))}

                                    {errorMessage && (
                                        <ErrorMessage message={errorMessage} style={{ textAlign: 'center', marginVertical: 15, fontSize: theme.fonts.size.body.md }} />
                                    )}

                                    <Button
                                        title='Enviar'
                                        onPress={navigateToLogin}
                                        style={{ marginTop: 10 }}
                                    />

                                </View>
                            </Layout>
                        </>
                    ) : (
                        <View style={styles.notFoundContainer}>
                            <Text style={styles.notFoundMessage}>Sala não encontrada!</Text>
                        </View>
                    )}


                </>
            )}
        </>
    );
}

export { AmbienteSalaComponent };