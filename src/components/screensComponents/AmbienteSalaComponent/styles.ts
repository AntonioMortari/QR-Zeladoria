import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    containerItens: {
        marginVertical: 15,
    },
    containerProblemas: {
        gap: 10
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    notFoundContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFoundMessage:{
        fontSize: theme.fonts.size.heading.lg,
        fontFamily: theme.fonts.family.semibold,
    }
});

export { styles };