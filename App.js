import React, { useEffect, useState } from "react";
import { StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Intro from "./app/screens/Intro";
import NoteScreen from "./app/screens/NoteScreen";

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  if (!user.name) return <Intro onFinish={findUser} />;
  return <NoteScreen user={user} />;

  // const renderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

 

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
