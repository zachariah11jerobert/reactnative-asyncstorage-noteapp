import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";

export default function App() {
  const [user,setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    console.log(result);
  };

  useEffect(() => {
    findUser();
  }, []);
  return <Intro />

  // const renderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  // if (!user.name) return <Intro onFinish={findUser} />;

  // return (
  //   <>
  //     <Intro />
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
  //         <Stack.Screen componnet={NoteDetail} name="NoteDetail" />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </>
  // );

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
