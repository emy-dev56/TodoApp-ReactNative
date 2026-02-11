import useTheme from '@/app/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Switch, Text, View } from 'react-native';

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
            <Ionicons name="moon" color="#FFF" size={18}  />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleTheme} thumbColor={"#FFF"} trackColor={{ false: colors.border, true: colors.primary }} ios_backgroundColor={colors.border} />
      </View>
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" color="#FFF" size={18}  />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch value={isNotificationEnabled} onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)} thumbColor={"#FFF"} trackColor={{ false: colors.border, true: colors.warning }} ios_backgroundColor={colors.border} />
      </View>
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" color="#FFF" size={18}  />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch value={isAutoSync} onValueChange={() => setIsAutoSync(!isAutoSync)} thumbColor={"#FFF"} trackColor={{ false: colors.border, true: colors.success }} ios_backgroundColor={colors.border} />
      </View>
    </LinearGradient>
  )
}

export default Preferences