import { theme } from '@/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10, height: 40,
        backgroundColor: theme.colors.gray_50,
        borderRadius: theme.borderRadius.sm,
        marginBottom: 5
    },
    title:{
        fontFamily: theme.fonts.family.bold
    },
    containerContent: {
        gap: 10,
        paddingHorizontal: 5
    }
});

export { styles };