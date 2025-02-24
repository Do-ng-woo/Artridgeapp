module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining', // 선택적 체이닝 (`?.`)
    '@babel/plugin-transform-nullish-coalescing-operator', // 널 병합 (`??`)
    'react-native-reanimated/plugin', // 기존 플러그인 유지
  ],
};