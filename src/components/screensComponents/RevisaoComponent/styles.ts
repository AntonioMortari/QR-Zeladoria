import { theme } from '@/theme';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    item: {
        fontSize: theme.fonts.size.heading.sm,
        fontFamily: theme.fonts.family.semibold,
        color: theme.colors.black,
        marginBottom:5
    },
    problema: {
        fontSize: theme.fonts.size.body.md,
        fontFamily: theme.fonts.family.regular,
        color: theme.colors.black
    },
    containerItem:{
        marginVertical: 20
    },
    successMessage:{
        color: theme.colors.secondary,
        fontSize: theme.fonts.size.body.md,
        fontFamily: theme.fonts.family.regular,
        marginTop: 2,
        textAlign: 'center'
    },
});

export { styles };