import { Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { styles } from './style';
import { Loading } from '../Loading';
import { theme } from '@/theme';

type Props = TouchableOpacityProps & {
  title: string; // texto do botão
  variant?: 'primary' | 'secondary'; // cor do botão
  isLoading?: boolean;
  style?: ViewStyle; // estilo adicional
}

export function Button({ title, variant = 'primary', isLoading, style, ...rest }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return ({
      transform: [{ scale: withTiming(scale.value) }],
    })
  });

  const onPressIn = () => {
    scale.value = 0.95;
  }

  const onPressOut = () => {
    scale.value = 1;
  }

  const buttonStyle = variant == 'primary' ? styles.primaryButton : styles.secondaryButton;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, buttonStyle, style]}
        {...rest}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={isLoading ? true : false}
      >

        {isLoading ? (
            <Loading color={theme.colors.gray_100} />
        ) : (
          <Text style={[styles.text]}>{title}</Text>
        )}

      </TouchableOpacity>
    </Animated.View >
  );
}