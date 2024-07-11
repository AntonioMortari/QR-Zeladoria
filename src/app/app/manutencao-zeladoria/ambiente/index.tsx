import { useEffect, useState } from 'react';

import { api } from '@/services/api';
import { IAmbienteData, IDetalhesItemData, IManutencaoItem } from '@/@types/ambienteSala';
import { AmbienteSalaComponent } from '@/components/screensComponents/AmbienteSalaComponent';
import { useLocalSearchParams } from 'expo-router';

const Ambiente = () => {

    const [ambienteData, setAmbienteData] = useState<IAmbienteData>({} as IAmbienteData);
    const [detalhesItensData, setDetalhesItensData] = useState<IDetalhesItemData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { idSala } = useLocalSearchParams();

    useEffect(() => {
        const getDetalhesByItemId = async (itemId: string) => {
            // busca os detalhes do item pelo seu id
            const url = `/zeladoria/manutencao/item/show/${itemId}`

            await api.get(url)
                .then(response => {
                    setDetalhesItensData(prevState => [...prevState, response.data]);
                })
                .catch(err => {
                    console.log(err);
                });

        }

        const getAmbienteData = async () => {
            // busca os dados do ambiente pelo seu id
            if (ambienteData._id) return;
            setIsLoading(true);

            const url = `/zeladoria/manutencao/ambiente/show/${idSala}`;
            await api.get(url)
                .then(response => {
                    setAmbienteData(response.data);
                    console.log(response.data);

                    response.data.manutencaoItem.map(async (item: IManutencaoItem) => {
                        // busca os detalhes de cada item do ambiente
                        await getDetalhesByItemId(item._id);
                    });

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
        <AmbienteSalaComponent
            ambienteData={ambienteData}
            detalhesItensData={detalhesItensData}
            isLoading={isLoading}
        />
    );
}



export default Ambiente;