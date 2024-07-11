import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: getStatusBarHeight() + 10
    },
    containerLogo: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        flex: 1,
        marginBottom: 30
    },
    containerButtons: {
        gap: 10
    }
});

export { styles };