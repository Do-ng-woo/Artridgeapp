// 📌 src/styles.js 또는 src/styles.ts 생성
import { StyleSheet } from 'react-native';

export const createStyleSheet = (styles) => StyleSheet.create(styles);

export const useStyles = (stylesheet) => {
  return { styles: stylesheet };
};
