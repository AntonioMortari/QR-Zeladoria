import { theme } from '@/theme';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type CustomStyle = ViewStyle & TextStyle & {
    outlineStyle?: string;
};

const styles = StyleSheet.create({
    container: {
        gap: 5
    },
    containerInput:{
        width: '100%',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: theme.borderRadius.sm,
        borderWidth: 0.9,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        outlineStyle: 'none',
        marginLeft: 8,
        width: '100%',
    } as CustomStyle,
    focusInput: {
        borderColor: theme.colors.primary
    },
    textInput: {
        fontSize: theme.fonts.size.body.md,
        fontFamily: theme.fonts.family.regular
    },
    containerIconPassoword:{
        cursor: 'pointer'
    }
});

export { styles };