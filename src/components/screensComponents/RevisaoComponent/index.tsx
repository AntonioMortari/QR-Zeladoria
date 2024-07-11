import { useState } from 'react';
import { IAmbienteData } from '@/@types/ambienteSala';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/shared/Loading';
import { Layout } from '@/layout';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/shared/Button';
import { api } from '@/services/api';
import { ErrorMessage } from '@/components/shared/ErrorMessage';

interface IRevisaoComponentProps {
    isLoading: boolean;
    ambienteData: IAmbienteData;
}

/**
 * Componente responsável por exibir a tela de revisão dos problemas selecionados
 * @param isLoading Indica se os dados estão sendo carregados
 * @param ambienteData Dados do ambiente
 * 
 */

const RevisaoComponent = ({
    ambienteData,
    isLoading
}: IRevisaoComponentProps) => {
    const { authData, problemasSelecionados, handleLogout } = useAuth();

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const enviarProblemas = async () => {
        setButtonIsLoading(true);

        const data = {
            matricula: authData?.matricula,
            nome: authData?.usuario.displayName,
            email: authData?.usuario.mail,
            ambienteId: ambienteData._id,
            problemasSelecionados: problemasSelecionados,
            sala: ambienteData.manutencaoLocal.descricao_local,
            predio: ambienteData.manutencaoPredios.descricao_predios,
            piso: ambienteData.manutencaoPisos.descricao_pisos
        }

        console.log(data);

        const url = '/zeladoria/manutencao/ambiente/os/new';

        const config = {
                headers: {
                    'Authorization': `Bearer ${authData?.token}`
                }
            }

        await api.post(url, data, config)
            .then(response => {
                setErrorMessage('');
                setSuccessMessage('Problemas relatados com sucesso!');
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('Algo deu errado, selecione os problemas e tente novamente!');
            })
            .finally(() => {
                handleLogout();
                setButtonIsLoading(false);
            })

    }

    return (
        <>
            {isLoading ? (
                <Loading
                    size='large'
                />
            ) : (
                <Layout
                    title='Revisão'
                    text='Revise os problemas selecionados e confirme.'
                    subtitle={`${ambienteData.manutencaoLocal.descricao_local}${'\n'}${ambienteData.manutencaoPredios.descricao_predios}`}
                    buttonBack
                >

                    {problemasSelecionados.map((item, index) => {
                        return (
                            <View style={styles.containerItem} key={index}>
                                <Text style={styles.item} key={item.itemId}>{item.itemNome}</Text>
                                {item.problemas.map(problema => {
                                    return (
                                        <Text key={problema.id} style={styles.problema}>- {problema.nome}</Text>
                                    )
                                })}
                            </View>
                        );
                    })}



                    {successMessage || errorMessage ? (
                        <>
                            {successMessage && (
                                <Text style={styles.successMessage}>Problemas relatados com sucesso!</Text>
                            )}

                            {errorMessage && (
                                <ErrorMessage style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }} message={errorMessage} />
                            )}
                        </>
                    ) : (
                        <Button
                            title='Confirmar'
                            variant='secondary'
                            style={{ marginVertical: 20 }}
                            isLoading={buttonIsLoading}
                            onPress={() => enviarProblemas()}
                        />
                    )}




                </Layout >
            )}
        </>
    );
}

export { RevisaoComponent };