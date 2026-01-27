import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../app/hooks/useTheme';
import { createHomeStyles } from '../assets/styles/home.styles';
import { api } from '../convex/_generated/api';


const TodoView = ({item, handleEditTodo} : {item: Doc<"todos">, handleEditTodo: React.Dispatch<React.SetStateAction<Doc<"todos"> | null>>}) => {

  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTodo({ id }) },
      ]);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to delete todo');
    }
  }

  return (
    <View>
      <View style={homeStyles.todoTextContainer}>
        <Text style={[homeStyles.todoText, item.completed && { textDecorationLine: "line-through", color: colors.textMuted, opacity: .6 }]}>{item.text}</Text>
      </View>
      <View style={homeStyles.todoActions}>
        <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={.8}>
          <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
            <Ionicons name="pencil" size={14} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={.8}>
          <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
            <Ionicons name="trash" size={14} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoView