import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, TouchableOpacity } from 'react-native';
import useTheme from '../app/hooks/useTheme';
import { createHomeStyles } from '../assets/styles/home.styles';
import { api } from '../convex/_generated/api';


const TodoCheckBox = ({item} : {item: Doc<"todos">}) => {

  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const handleToggleTodo = async (id: Id<"todos">) => {
      try {
        await toggleTodo({ id });
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to toggle todo');
      }
    }

  return (
    <TouchableOpacity style={homeStyles.checkbox} onPress={() => handleToggleTodo(item._id)} activeOpacity={.8}>
      <LinearGradient colors={item.completed ? colors.gradients.success : colors.gradients.muted} style={[homeStyles.checkboxInner, { borderColor: item.completed ? "transparent" : colors.border }]}>
        {item.completed && <Ionicons name="checkmark" size={18} color={colors.textMuted} />}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default TodoCheckBox