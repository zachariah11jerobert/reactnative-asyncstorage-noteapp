import React from "react";
import { StyleSheet, Text, ScrollView, Alert, AsyncStorage } from "react-native";
import colors from "../misc/colors";

const NoteDetail = (props) => {
  const { note } = props.route.params;
  const headerHeight = useHeaderHeight();

    const deleteNote = async() =>{
        const result = await AsyncStorage.getItem('notes');
        let notes =[];
        if(result !== null) notes=JSON.parse(result);

        notes.filter(n => n.id !== note.id);
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
      ]
    );
  };

  const formatData = (time) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: headerHeight }]}>
      <Text>{`Created At ${formatDate(note.time)}`}</Text>
      <Text>{note.title}</Text>
      <Text>{note.desc}</Text>

      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR }}
        />
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
