import { ReactNode, useState } from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import { theme } from '@/theme';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface IInputProps extends TextInputProps {
    placeholder: string;
    style?: ViewStyle;
    label?: string;
    type?: 'text' | 'password';
    icon?: ReactNode;
}

const Input = ({ placeholder, style, label,type = 'text',icon, ...rest }: IInputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(type === 'password' ? true : false);

    const onFocus = () => {
        setIsFocused(true);
    }

    const onBlur = () => {
        setIsFocused(false);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>{label}</Text>
            <View style={[styles.containerInput, isFocused && styles.focusInput]}>

            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                {icon}
                <TextInput
                    placeholder={placeholder}
                    style={[styles.input, style,]}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    secureTextEntry={showPassword}
                    placeholderTextColor={theme.colors.gray_200}
                    {...rest}
                />
            </View>

            {type === 'password' && (
                <View style={styles.containerIconPassoword}>
                    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme.colors.black} onPress={handleShowPassword} />
                </View>
            )}
            </View>
        </View>
    );
}



export { Input };