import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';


const useAuth = () => {
      // hook que retorna o contexto de autenticação
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Envolva a aplicação em um AuthProvider');
    }

    return context;
}

export { useAuth };