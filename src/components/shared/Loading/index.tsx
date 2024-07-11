
import { ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { theme } from "@/theme";

interface ILoadingProps {
    color?: string;
    size?: 'large' | 'small';
}

export function Loading({ color, size='small' }: ILoadingProps) {
    return (
        <ActivityIndicator
            style={styles.container}
            color={color || theme.colors.primary}
            
            size={size}
        />
    )
}