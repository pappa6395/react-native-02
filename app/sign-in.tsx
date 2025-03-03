import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Link, Redirect } from 'expo-router'

const SignIn = () => {

    const { refetch, loading, isLoggedIn } = useGlobalContext()

    if (!loading && isLoggedIn) return <Redirect href='/' />;

    const handleLogin = async () => {
        
        const result = await login();
        if (result) {
            refetch();
            console.log('Logged in successfully');
        } else {
            Alert.alert('Error', 'Failed to login');
            
        }

    }

  return (
    <SafeAreaView className='bg-white flex-1'>
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
        }}>
            <Image 
                source={images.onboarding}
                className='w-full h-4/6'
                resizeMode='contain'
            />
             <View className='px-10'>
                <Text className='text-base text-center 
                uppercase font-rubik text-black-200'
                >
                    Welcome to estate
                </Text>
                <Text className='text-3xl text-center mt-2 
                font-rubikBold text-black-300'
                >
                    Let&apos;s Get you Closer to {"\n"}
                    <Text className='text-primary-300'>Your Ideal Home</Text>
                </Text>
                <Text className='text-lg font-rubik 
                text-black-200 text-center mt-12'
                >
                    Login to Estate with Google
                </Text>
            </View>
            <TouchableOpacity 
                onPress={handleLogin}
                className='w-full h-12 rounded-full bg-white text-white 
                text-center font-rubik shadow-md shadow-zinc-300 
                font-semibold py-4 mt-5'
            >
                <View className='flex flex-row items-center justify-center'>
                    <Image 
                        source={icons.google}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                    <Text className='font-rubikMedium text-slate-700 ml-2'>
                        Sign in with Google
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn