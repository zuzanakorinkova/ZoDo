import { StyleSheet, View, FlatList, KeyboardAvoidingView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import category from "@/assets/data/category.json";
import { Category } from "@/components/Category";
import Button from "@/components/Button";
import { InputModal } from "@/components/InputModal";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { useForm } from "react-hook-form";
import { ICategoryFormData } from "@/types";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { BlurView } from "expo-blur";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { control, handleSubmit } = useForm<ICategoryFormData>();

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const createNewCategory = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          data={category}
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <ThemedText type="title">Welcome back</ThemedText>
            </View>
          }
          numColumns={2}
          renderItem={({ item }) => (
            <Category
              data={item}
              onPress={() =>
                router.push({
                  pathname: `/${item.id}`,
                  params: {
                    emoji: item.emoji,
                    name: item.name,
                  },
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
        <BlurView intensity={50} style={styles.buttonWrapper}>
          <Button
            onPress={onModalOpen}
            text="Add new category"
            backgroundColor="#092CD9"
            color="white"
          />
        </BlurView>
      </View>

      <InputModal onClose={onModalClose} isVisible={isModalVisible}>
        <KeyboardAvoidingView style={styles.mainContainer}>
          <ThemedText type="title">Add new category</ThemedText>
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <CustomInput
                name="emoji"
                placeholder="Write your emoji"
                control={control}
                rules={{
                  minLength: {
                    value: 1,
                    message: "Minimum 1 character",
                  },
                  maxLength: {
                    value: 2,
                    message: "Maxium 2 characters",
                  },
                }}
              />
              <CustomInput
                name="name"
                placeholder="Write your name"
                control={control}
                rules={{
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters",
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
              text="Add new category"
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
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  mainContainer: {
    padding: 15,
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 15,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
  formWrapper: {
    gap: 30,
  },
  inputWrapper: {
    paddingTop: 20,
    gap: 20,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});
