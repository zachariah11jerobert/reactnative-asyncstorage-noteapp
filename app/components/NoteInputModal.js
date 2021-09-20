import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const NoteInputModal = ({ visible }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit=()=>{
      if(!title.trim() && !desc.trim()) return onClose();
      onsubmit(title,desc);
      setTitle('');
      setDesc('');
      onClose();
  }

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <Text style={[styles.input, styles.title]} />
          <Text style={[styles.input, styles.title]} />
          <View style={styles.btnContainer}>
            <RoundIconBtn size={15} antIconName="check" />
            <RoundIconBtn
              size={15}
              style={{ marginLeft: 15 }}
              antIconName="close"
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomColor: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: 100,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "red",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default NoteInputModal;
