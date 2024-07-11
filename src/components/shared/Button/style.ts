import { StyleSheet } from 'react-native';

import { theme } from '@/theme';

export const styles = StyleSheet.create({
  button: {
    height: 40,
    minWidth: 120,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.sm,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.medium,
  },
  primaryButton:{
    backgroundColor: theme.colors.primary
  },
  secondaryButton:{
    backgroundColor: theme.colors.secondary
  }
});