import { theme } from '@/theme';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: getStatusBarHeight() + 20
    },
    header:{
        marginBottom: 20
    },
    title: {
        fontFamily: theme.fonts.family.semibold,
        fontSize: theme.fonts.size.heading.lg,
        color: theme.colors.black,
        textTransform: 'capitalize'
    },
    subtitle: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.size.heading.xs,
        textTransform: 'capitalize',
        color: theme.colors.gray_200
    },
    text: {
        fontSize: theme.fonts.size.body.md,
        marginTop: 5,
        color: theme.colors.black
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
});

export { styles };