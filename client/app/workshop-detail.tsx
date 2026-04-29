import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/Screen';

const COLORS = {
  primary: '#7B6EF6',
  secondary: '#5CE0D8',
  background: '#0D1026',
  textPrimary: '#EEEAF6',
  textSecondary: '#8E8BA3',
};

export default function WorkshopDetailScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>工坊详情</Text>
        <Text style={styles.subtitle}>即将推出</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});
