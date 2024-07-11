import { Redirect, useLocalSearchParams } from 'expo-router';

const Unmatched = () => {
    const { idSala } = useLocalSearchParams();

    console.log(idSala);

    return <Redirect href={`app/manutencao-zeladoria/ambiente?idSala=${idSala}`} />;
}

export default Unmatched;