import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon = ({
    focused, 
    icon, 
    title 
}: { 
    focused: boolean; 
    icon: ImageSourcePropType | undefined; 
    title: string; 
}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image
            source={icon}
            tintColor={focused ? '#0061ff' : '#666876'}
            resizeMode='contain'
            className='size-6'
        />
        <Text
            className={`text-xs w-full text-center mt-1 ${focused? 'text-primary-300 font-rubikMedium' : 'text-black-200 font-rubik'}`}
        >
            {title}
        </Text>
    </View>
)


const TabsLayout = () => {

  return (

    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061FF1A',
                borderTopWidth: 1,
                minHeight: 70,
            }
        }}
    >
        <Tabs.Screen name="index" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.home} 
                    title="Home" 
                />
            )

        }} />
        <Tabs.Screen name="explore" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.search} 
                    title="Explore" 
                />
            )

        }} />
        <Tabs.Screen name="profile" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.person} 
                    title="Profile" 
                />
            )

        }} />
    </Tabs>

  )
}

export default TabsLayout