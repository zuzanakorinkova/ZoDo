import { Pressable, StyleSheet, Text, View } from "react-native";
import { forwardRef } from "react";

type ButtonProps = {
  text: string;
  backgroundColor?: string;
  color: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, backgroundColor, color, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor ? backgroundColor : "transparent",
          },
        ]}
      >
        <Text style={[styles.text, { color }]}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
