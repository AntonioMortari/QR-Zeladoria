import { Text, TextStyle } from 'react-native';
import { styles } from './styles';

interface IErrorFormErrorMessageProps {
    message?: string; // mensagem a ser exibida
    style?: TextStyle; // estilo adicional
}

const ErrorMessage = ({ message, style }: IErrorFormErrorMessageProps) => {
    return (
        <Text style={[styles.errorMessage, style]}>{message  || 'Campo Obrigatório'}</Text>
    );
}

export { ErrorMessage };