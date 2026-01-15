import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Text, TouchableOpacity, View } from "react-native";
import useTheme from "../hooks/useTheme";

export default function Index() {
  const { toggleTheme} = useTheme();
  const addTodo = useMutation(api.todos.addTodo);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>Toggle Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "Hello World" })}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}
