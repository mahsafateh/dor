import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps & { center?: boolean };

export default function Screen({ children, center, style, ...rest }: Props) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]} {...rest}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, justifyContent: center ? "center" : undefined }}>
            {children}
          </SafeAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


