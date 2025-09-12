import React from "react";
import { KeyboardAvoidingView, Platform, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../context/ThemeContext";

type Props = ViewProps & { 
  center?: boolean;
  padding?: boolean;
  keyboardAvoiding?: boolean;
};

export default function Screen({ 
  children, 
  center, 
  padding = true,
  keyboardAvoiding = true,
  style, 
  ...rest 
}: Props) {
  const theme = useAppTheme();
  
  const content = (
    <SafeAreaView 
      style={[
        { 
          flex: 1, 
          backgroundColor: theme.colors.background,
          paddingHorizontal: padding ? 16 : 0,
          justifyContent: center ? "center" : undefined,
        }, 
        style
      ]} 
      {...rest}
    >
      {children}
    </SafeAreaView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}


