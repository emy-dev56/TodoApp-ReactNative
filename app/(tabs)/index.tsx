import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/TodoInput';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createHomeStyles } from '../../assets/styles/home.styles';
import { api } from '../../convex/_generated/api';
import useTheme from '../hooks/useTheme';


export default function Index() {
  type Todo = Doc<"todos">;
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);

  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);

  const isLoading = todos === undefined;

  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);



  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to toggle todo');
    }
  }

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

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  }
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

  const renderTodos = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface} style={homeStyles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
          <TouchableOpacity style={homeStyles.checkbox} onPress={() => handleToggleTodo(item._id)} activeOpacity={.8}>
            <LinearGradient colors={item.completed ? colors.gradients.success : colors.gradients.muted} style={[homeStyles.checkboxInner, { borderColor: item.completed ? "transparent" : colors.border }]}>
              {item.completed && <Ionicons name="checkmark" size={18} color={colors.textMuted} />}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
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
          ) : (
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
        </LinearGradient>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodos}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyList />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
