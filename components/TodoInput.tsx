import useTheme from '@/app/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TodoInput = () => {
  const [text, setText] = React.useState('');
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (text.trim()) {
      try {
        await addTodo({ text: text.trim() });
        setText('');
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to add todo');
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput style={homeStyles.input} value={text} onChangeText={setText} onSubmitEditing={handleAddTodo} placeholderTextColor={colors.textMuted} placeholder="What needs to be done?"/>
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={.8}
          disabled={!text.trim()}
          
        >
          <LinearGradient colors={text.trim() ? colors.gradients.primary : colors.gradients.muted} style={[homeStyles.addButton, !text.trim() && homeStyles.addButtonDisabled]}>
            <Ionicons name="add-outline" size={24} color={colors.textMuted} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
