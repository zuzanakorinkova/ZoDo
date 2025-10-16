import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  useColorScheme,
  KeyboardAvoidingView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import category from "@/assets/data/category.json";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { ITodoFormData } from "@/types";
import { InputModal } from "@/components/InputModal";
import CustomInput from "@/components/CustomInput";

export default function CategoryDetails() {
  const { id, name, emoji } = useLocalSearchParams();
  const theme = useColorScheme() ?? "light";
  const textColor = useThemeColor(theme, "text");

  const [categoryTodos, setCategoryTodos] = useState<
    { title: string; isFinished: boolean }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { control, handleSubmit } = useForm<ITodoFormData>();

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const createNewCategory = () => {};

  useEffect(() => {
    category.map((category) => {
      if (id === category.id) {
        setCategoryTodos(category.todos);
      }
    });
  }, []);

  const onTodoPressed = (index: number) => {
    setCategoryTodos((currentTodos) => {
      const updatedTodos = [...currentTodos];
      updatedTodos[index].isFinished = !updatedTodos[index].isFinished;
      return updatedTodos;
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">{emoji}</ThemedText>
          <ThemedText type="title">{name}</ThemedText>
        </View>
        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <View>
        <FlatList
          data={categoryTodos}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.todoContainer}
              onPress={() => onTodoPressed(index)}
            >
              <MaterialCommunityIcons
                name={
                  item.isFinished
                    ? "checkbox-multiple-blank-circle"
                    : "checkbox-multiple-blank-circle-outline"
                }
                size={24}
                color={`${textColor}`}
              />

              <ThemedText
                style={{
                  textDecorationLine: item.isFinished ? "line-through" : "none",
                }}
                type="defaultSemiBold"
              >
                {item.title}
              </ThemedText>
            </Pressable>
          )}
        />
      </View>
      <BlurView intensity={50} style={styles.buttonWrapper}>
        <Button
          onPress={onModalOpen}
          text="Add new item"
          backgroundColor="#092CD9"
          color="white"
        />
      </BlurView>

      <InputModal onClose={onModalClose} isVisible={isModalVisible}>
        <KeyboardAvoidingView style={styles.mainContainer}>
          <ThemedText type="title">Add new item</ThemedText>
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <CustomInput
                name="todo"
                placeholder="Write name of the todo"
                control={control}
                rules={{
                  minLength: {
                    value: 1,
                    message: "Minimum 1 character",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maxium 100 characters",
                  },
                }}
              />
            </View>
            <Button
              onPress={handleSubmit(createNewCategory)}
              text="Create item"
              backgroundColor="#092CD9"
              color="white"
            />
          </View>
        </KeyboardAvoidingView>
      </InputModal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  todoContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 30,
    left: 0,
    right: 0,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 200,
    gap: 20,
  },
  formWrapper: {
    gap: 40,
  },
  inputWrapper: {
    paddingTop: 20,
    gap: 5,
  },
});
