import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export const AppBar: React.FC<Props> = ({ title, subtitle, right }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingTop: 18,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrap: {
    flexDirection: 'column',
  },
  title: {
    ...Typography.title,
  },
  subtitle: {
    ...Typography.subtitle,
    marginTop: 2,
  },
  right: {
    marginLeft: Spacing.md,
  },
});
