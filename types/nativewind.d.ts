import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
}

declare module 'react-native-paper' {
  interface TextProps {
    className?: string;
  }
  interface ButtonProps {
    className?: string;
  }
}


