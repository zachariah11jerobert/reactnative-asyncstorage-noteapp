import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight } from "@react-navigation/stack";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";


const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  const { note } = props.route.params;
  const headerHeight = useHeaderHeight();

    const deleteNote = async() =>{
        const result = await AsyncStorage.getItem('notes');
        let notes =[];
        if(result !== null) notes=JSON.parse(result);

        const newNotes = notes.filter(n => n.id !== note.id);
        await AsyncStorage.setItem('notes',JSON.stringify(newNotes));
        props.navigation.goBack();
    }

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your nore permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>

      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          antIconName="edit"
          onPress={() => console.log("editing note")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
