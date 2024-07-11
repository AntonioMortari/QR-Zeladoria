import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';

import { theme } from '@/theme';
import { styles } from './styles';

import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Props para o componente de layout.
 */
interface ILayoutProps {
    title: string; // Título do layout.
    subtitle?: string; // Subtítulo opcional do layout.
    children?: ReactNode; // Componentes filhos a serem renderizados dentro do layout.
    text?: string; // Texto opcional a ser exibido abaixo do título e do subtítulo.
    buttonBack?: boolean; // Indica se deve exibir um botão de voltar no cabeçalho do layout.
}

const Layout = ({
    children,
    title,
    subtitle,
    text,
    buttonBack = false
}: ILayoutProps) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.containerImage}>
                    <Image
                        source={require('@/images/logo.png')}
                        width={150}
                        height={150}
                    />
                </View>

                {buttonBack && (
                    <View style={{marginVertical: 10}}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialCommunityIcons name="arrow-left" size={30} color={theme.colors.gray_200} />
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.text}>{text}</Text>

            </View>

            <View>
                {children}
            </View>
        </ScrollView>
    );
}

export { Layout };