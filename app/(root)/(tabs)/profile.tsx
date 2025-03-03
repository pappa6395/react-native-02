import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingItemProps {
  icon: ImageSourcePropType | undefined;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingItems = ({ icon, title, onPress, textStyle, showArrow=true }: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex-row items-center justify-between py-3'
    >
      <View className='flex-row items-center gap-3'>
        <Image
          source={icon}
          className='size-6'
        />
        <Text className={`text-base font-rubikMedium text-black-300 ${textStyle}`}>
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image
          source={icons.rightArrow}
          className='size-5' 
        />
      )}
    </TouchableOpacity>
  )
}

const profile = () => {

  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'You have been logged out successfully')
      refetch();
    } else {
      Alert.alert('Error', 'An error occurred while logging out')
    }
  }
    


  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7' 
      >
        <View className='flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubikBold'>
            Profile
          </Text>
          <Image
            source={icons.bell}
            className='size-5' 
          />
        </View>
        
          <View className='flex-col items-center justify-center relative mt-5'>
            <Image
              source={{ uri : user?.avatar}}
              className='size-44 relative rounded-full' 
              resizeMode='contain'
            />
            <TouchableOpacity
              className='absolute bottom-10 start-60'
            >
              <View>
                <Image
                  source={icons.edit}
                  className='w-9 h-9' 
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity>
            <Text className='text-xl font-rubikBold mt-2 pl-2'>
              {user?.name}
            </Text>
          </View>
          <View className='flex-col mt-10'>
            <SettingItems
              icon={icons.calendar}
              title="My Bookings" 
            />
            <SettingItems
              icon={icons.wallet}
              title="Payments" 
            />
          </View>
          <View className='flex-col mt-5 border-t pt-5 border-primary-200'>
            {settings.slice(2).map((item, index) => (
              <SettingItems key={index} {...item} />
            ))}
          </View>
          <View className='flex-col mt-5 border-t pt-5 border-primary-200'>
            <SettingItems 
              icon={icons.logout}
              title="Logout"
              textStyle={"text-danger"}
              showArrow={false}
              onPress={handleLogout}
            />
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile