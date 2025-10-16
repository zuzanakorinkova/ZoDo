import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useColorScheme,
} from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ICustomInput<ContentType extends FieldValues> {
  control?: Control<ContentType>;
  name?: Path<ContentType>;
  rules?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CustomInput = <ContentType extends FieldValues>({
  control,
  name,
  secureTextEntry = false,
  placeholder,
  rules = {},
  keyboardType,
}: ICustomInput<ContentType>) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Controller
      control={control as Control<FieldValues>}
      name={name as Path<FieldValues>}
      rules={rules}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={"#5F616A"}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                style={[
                  styles.input,
                  {
                    color: useThemeColor(theme, "text"),
                  },
                ]}
              />

              {error && (
                <Text style={{ color: "#E40E40" }}>
                  {error.message || "The input is invalid"}
                </Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 14,
    borderColor: "#5F616A",
  },
  label: {
    fontSize: 12,
    color: "#5F616A",
  },
});

export default CustomInput;
