

import { Redirect, useLocalSearchParams } from "expo-router";

/**
 * Componente responsável por redirecionar para a página de ambiente/sala de manutenção.
 */

const Index = () => {
    const {idSala} = useLocalSearchParams();

    console.log(idSala);

    return <Redirect href={`app/manutencao-zeladoria/ambiente?idSala=${idSala}`} />;
};
export default Index;