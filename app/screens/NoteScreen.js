import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    console.log(title,desc);
    // const note = { id: Date.now(), title, desc, time: Date.now() };
    // const updatedNotes = [...NoteScreen, note];
    // setNotes(updatedNotes);
    // await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        <SearchBar containerStyle={{ marginVertical: 15 }} />
        {/* <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
          <Note onPress={()=>openNote(item)} item={item} />
          )}
        /> */}
        {!notes.length ? (
          <View
            style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
          >
            <Text style={styles.emptyHeader}>Add Notes</Text>
          </View>
        ) : null}
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          style={styles.addBtn}
        />
      </View>
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NoteScreen;
