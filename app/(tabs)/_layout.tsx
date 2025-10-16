import React from "react";

import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack
      screenOptions={{
        title: "ZoDo",
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
