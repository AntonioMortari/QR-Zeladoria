import { useState } from 'react';
import { Image, Linking, View } from 'react-native';

import { Input } from '@/components/shared/Input';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/shared/Button';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme';
import { styles } from './styles';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather, Foundation } from '@expo/vector-icons';
import { router } from 'expo-router';

const loginSchema = z.object({
    login: z.string({ message: 'Campo obrigatório' }).min(1, 'Campo Obrigatório'),
    senha: z.string({ message: 'Campo obrigatório' }).min(1, 'Campo Obrigatório')
});

type FormDataType = z.infer<typeof loginSchema>

/**
 * Componente responsável por exibir a tela de login
 */

interface ILoginComponentProps {
    idSala: string;
}

const LoginComponent = ({ idSala }: ILoginComponentProps) => {
    const { handleLogin } = useAuth();
    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataType>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: FormDataType) => {
        const { login, senha } = data;

        setButtonIsLoading(true);

        try {
            await handleLogin({ login, senha });
            router.replace({
                pathname: 'app/manutencao-zeladoria/revisao',
                params: { idSala }
            });
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Erro ao fazer login');
        } finally {
            setButtonIsLoading(false);
        }
    }

    const handleClearErrorMessage = () => {
        setErrorMessage('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('@/images/logo2.png')}
                    style={{ width: 180, height: 180, borderRadius: 8 }}
                />
            </View>

            <View style={styles.form}>

                <View style={{ marginBottom: 30 }}>

                <Controller
                        control={control}
                        name='login'
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    label='Login'
                                    placeholder='Exemplo: joao.silva'
                                    onChangeText={onChange}
                                    onChange={handleClearErrorMessage}
                                    value={value}
                                    icon={<Feather name="user" size={20} color={theme.colors.black} />}
                                />

                                {errors.login && <ErrorMessage message={errors.login.message} />}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name='senha'
                        render={({ field: { onChange, value } }) => (
                            <View style={{ marginTop: 20, width: '100%' }}>
                                <Input
                                    placeholder='Digite sua Senha'
                                    label='Senha'
                                    type='password'
                                    onChangeText={onChange}
                                    onChange={handleClearErrorMessage}
                                    value={value}
                                    icon={<Foundation name="key" size={20} color={theme.colors.black} />}
                                />

                                {errors.senha && <ErrorMessage message={errors.senha?.message} />}
                            </View>
                        )}
                    />

                    {errorMessage && <ErrorMessage message={errorMessage} style={{ marginTop: 20, textAlign: 'center', fontSize: theme.fonts.size.body.sm }} />}

                </View>

                <View style={styles.containerButtons}>

                    <Button
                        title='Entrar'
                        onPress={handleSubmit(onSubmit)}
                        isLoading={buttonIsLoading}
                    />

                    <Button
                        title='Esqueceu a Senha?'
                        variant='secondary'
                        onPress={() => Linking.openURL('https://www.feagri.unicamp.br/intranet/esqueciminhasenha.php')}
                    />
                </View>
            </View>
        </View>
    );
}

export { LoginComponent };