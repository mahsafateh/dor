import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../context/ThemeContext";

type Props = ViewProps & { center?: boolean };

export default function Screen({ children, center, style, ...rest }: Props) {
  const theme = useAppTheme();
  
  return (
    <SafeAreaView 
      style={[
        { 
          flex: 1, 
          backgroundColor: theme.colors.background 
        }, 
        style
      ]} 
      {...rest}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <SafeAreaView style={{ 
            flex: 1, 
            paddingHorizontal: 16, 
            justifyContent: center ? "center" : undefined,
            backgroundColor: theme.colors.background 
          }}>
            {children}
          </SafeAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


