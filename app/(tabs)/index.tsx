import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoCheckBox from '@/components/TodoCheckBox';
import TodoEdit from '@/components/TodoEdit';
import TodoInput from '@/components/TodoInput';
import TodoView from '@/components/TodoView';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
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
   

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  }

  const renderTodos = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface} style={homeStyles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
          <TodoCheckBox item={item}/>
          {isEditing ? (
            <TodoEdit item={item} editingId={editingId} editText={editText} setEditingId={setEditingId} setEditText={setEditText} />
          ) : (
            <TodoView item={item} handleEditTodo={() => handleEditTodo(item)} />
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
