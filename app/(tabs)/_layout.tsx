import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'yellow',
      tabBarInactiveTintColor: '#DDD',
      tabBarStyle:{
        borderTopWidth: 1,
        borderTopColor: 'red',
        backgroundColor: 'black'
      }
     }}>
      <Tabs.Screen name="index" options={{ 
        title: 'Todos',
        tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" color={color} size={size} />,
       }}  />
      <Tabs.Screen name="settings" options={{ 
        title: 'Settings',
        tabBarIcon: ({ color, size }) => <Ionicons name="cog-outline" color={color} size={size} />,
       }}  />
    </Tabs>
  )
}

export default TabsLayout