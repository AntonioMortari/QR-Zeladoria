
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { IAmbienteData } from '@/@types/ambienteSala';
import { api } from '@/services/api';
import { RevisaoComponent } from '@/components/screensComponents/RevisaoComponent';
import { useLocalSearchParams } from 'expo-router';

/**
 * Componente responsável por renderizar a tela de revisão de problemas selecionados de um ambiente.
 */

const Revisao = () => {
    const { problemasSelecionados } = useAuth();
    const [ambienteData, setAmbienteData] = useState<IAmbienteData>({} as IAmbienteData);
    const { idSala } = useLocalSearchParams();


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (problemasSelecionados.length === 0) {
            // Redireciona para a tela inicial se nenhum problema foi selecionado.
            window.location.href = `ambiente?idSala=${idSala}`
        }
    }, []);

    useEffect(() => {
        /**
         * Obtém os dados do ambiente para exibição na tela de revisão.
         */
        const getAmbienteData = async () => {
            setIsLoading(true);

            const url = `/zeladoria/manutencao/ambiente/show/${idSala}`;
            await api.get(url)
                .then(response => {
                    setAmbienteData(response.data);

                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }

        getAmbienteData();
    }, []);


    return (
        <RevisaoComponent
            isLoading={isLoading}
            ambienteData={ambienteData}
        />
    );
}


export default Revisao;