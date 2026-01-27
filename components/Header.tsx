import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import useTheme from '../app/hooks/useTheme';
import { createHomeStyles } from '../assets/styles/home.styles';

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const totalTodos = todos?.length ?? 0;
  const completedTodos = todos?.filter((todo) => todo.completed).length ?? 0;
  const percentage = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name="flash-outline" color={colors.text} size={32} />
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Todos</Text>
          <Text style={homeStyles.subtitle}>
            {completedTodos} of {totalTodos} completed
          </Text>
        </View>
      </View>
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${percentage}%` }]}
            />
          </View>
          <Text style={homeStyles.progressText}>{Math.round(percentage)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
