
import { LoginComponent } from '@/components/screensComponents/LoginComponent';
import { useLocalSearchParams } from 'expo-router';

/**
 * Componente responsável por renderizar a tela de login.
 */

const Login = () => {
    const { idSala } = useLocalSearchParams();

    if(!idSala) return;

    return (
        <LoginComponent
            idSala={idSala.toString()}
        />
    )
}

export default Login;