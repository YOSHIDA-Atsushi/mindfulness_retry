import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  backButton: { flex: 1, alignItems: 'flex-start', marginLeft: 10 },
});

export default function BackButton(props) {
  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        <IconButton icon={'arrow-left'} size={35} onPress={props.onGoBack} />
      </View>
    </View>
  );
}
