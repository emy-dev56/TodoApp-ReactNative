import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useTheme from '../app/hooks/useTheme';

import { Doc, Id } from '@/convex/_generated/dataModel';
import { createHomeStyles } from '../assets/styles/home.styles';


type Todo = Doc<"todos">;

const TodoEdit = ({item, editingId, setEditingId, editText, setEditText} : {item: Todo, editingId: Id<"todos">, editText: string , setEditingId: React.Dispatch<React.SetStateAction<Id<"todos"> | null>>, setEditText: React.Dispatch<React.SetStateAction<string>>}) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const updateTodo = useMutation(api.todos.updateTodo);
  const handleSaveEdit = async (id: Id<"todos">) => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText });
        setEditingId(null);
        setEditText('');
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to save todo');
      }
    }
  }
  const handleCancelEdit = () => { 
    setEditingId(null);
    setEditText('');
  }
  return (
    <View style={homeStyles.editContainer}>
      <TextInput style={homeStyles.editInput} value={editText} onChangeText={setEditText} onSubmitEditing={() => handleSaveEdit(item._id)} placeholderTextColor={colors.textMuted} placeholder="What needs to be done?" />
      <View style={homeStyles.editButtons}>
        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={.8}>
          <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
            <Text style={homeStyles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSaveEdit(item._id)} activeOpacity={.8}>
          <LinearGradient colors={colors.gradients.primary} style={homeStyles.editButton}>
            <Text style={homeStyles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoEdit