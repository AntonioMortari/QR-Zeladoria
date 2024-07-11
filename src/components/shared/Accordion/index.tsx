import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface IAccordionProps {
    title: string;
    content: ReactNode
}

/**
 * Componente de Accordion
 * @param title Título do Accordion
 * @param content Conteúdo do Accordion
 * 
 */

const Accordion = ({ title, content }: IAccordionProps) => {
    const [expanded, setExpanded] = useState(false);
    const contentHeight = useSharedValue(0);

    const toggleAccordion = () => {
        setExpanded(!expanded);
        contentHeight.value = expanded ? 0 : getContentHeight();
    };

    const getContentHeight = () => {
        return 500; // Altura padrão do componente de checkbox
    };

    const rotateZ = useSharedValue(expanded ? '180deg' : '0deg');

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(contentHeight.value, { duration: 300 }),
            overflow: 'hidden',
        };
    });

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: rotateZ.value }],
        };
    });

    return (
        <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={toggleAccordion}>

                <View style={styles.containerTitle}>

                    <Text style={styles.title}>{title}</Text>

                    <Animated.View style={animatedIconStyle}>
                        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} />
                    </Animated.View>

                </View>
            </TouchableOpacity>
            <Animated.ScrollView style={[styles.containerContent, animatedStyle]}>

                {content}

            </Animated.ScrollView>
        </View>
    );
};

export default Accordion;
