import { Modal, View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type NewCategoryProps = {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export function InputModal({ isVisible, children, onClose }: NewCategoryProps) {
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <ThemedView style={styles.modalContent}>
        <View style={styles.titleContent}>
          <Pressable style={styles.closeModal} onPress={onClose}>
            <ThemedText style={styles.title}>Close</ThemedText>
          </Pressable>
        </View>
        {children}
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "80%",
    position: "absolute",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 0,
    padding: 15,
  },
  titleContent: {
    height: "10%",
    textAlign: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    textAlign: "center",
  },
  closeModal: {
    width: "100%",
  },
});
