import useTheme from '@/app/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
  const { colors, } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const deleteAllTodos = useMutation(api.todos.clearAllTodos);

  const handleDeleteAllTodos = async () => {
    Alert.alert('App Reset', 'This will delete all your todos permanently. Are you sure you want to continue?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const result = await deleteAllTodos();
            Alert.alert('Success', `Deleted ${result.deletedCount} todos`);
          } catch (error: any) {
            Alert.alert('Error', "Failed to reset app");
            console.log(error);
          }
        },
      },
    ]);
  }
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Danger Zone</Text>
      <TouchableOpacity style={settingsStyles.actionButton} onPress={handleDeleteAllTodos}>
        <View style={settingsStyles.actionLeft}>
          <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
            <Ionicons name="trash" color="#FFF" size={18}  />
          </LinearGradient>
          <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" color={colors.textMuted} size={18} />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default DangerZone