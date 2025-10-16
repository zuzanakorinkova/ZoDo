import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type CategoryListItemProps = {
  data: { id: string; emoji: string; name: string };
  onPress: () => void;
};

export function Category({ data, onPress }: CategoryListItemProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.categoryContainer}>
        <ThemedText style={styles.categoryText} type="title">
          {data.emoji}
        </ThemedText>
        <ThemedText style={styles.categoryText}>{data.name}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  categoryText: {
    padding: 5,
    textAlign: "center",
  },
});
