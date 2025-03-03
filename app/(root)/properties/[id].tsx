import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import images from '@/constants/images'
import icons from '@/constants/icons'

const Property = () => {

    const { id } = useLocalSearchParams<{id: string}>();

    const windowHeight = Dimensions.get("window").height;

    const { data: selectedProperty } = useAppwrite({
      fn: getPropertyById,
      params: { id },
      skip: true,
    })


  return (
    <View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 bg-white'
      >
        <View className='w-full relative' style={{ height : windowHeight / 2 }}>
          <Image 
            source={images.japan}
            className='w-full h-full'
            resizeMode='cover'
          />
          <Image 
          source={images.whiteGradient}
          className='absolute top-0 w-full h-full z-40'
          />
          <View 
            className='z-50 absolute inset-x-4'
            style={{ top: Platform.OS === 'ios' ? 70 : 20}}
          >
            <View className="flex-row items-center justify-between mt-3 absolute">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="rounded-full size-16 items-center justify-center"
            >
              <Image 
              source={icons.backArrow}
              className="size-8"
              />
            </TouchableOpacity>
            </View>
            <View className='flex-row items-center gap-2 absolute mt-5 right-4'>
                <TouchableOpacity 
                  className="flex-row rounded-full size-11 items-center justify-center"
                >
                  <Image 
                  source={icons.heart}
                  className="size-8"
                  tintColor={"#000"}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-row rounded-full size-11 items-center justify-center"
                >
                  <Image 
                  source={icons.send}
                  className="size-8"
                  />
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className='mt-7 px-5 gap-2'>
          <Text className='text-2xl font-rubikBold text-black-300'>
            Luxury Pool Villa House 
          </Text>
          <View className='flex-row items-center gap-6'>
            <Text className='bg-primary-100 font-rubikBold 
            text-primary-300 px-2 py-1.5 rounded-full'
            >
              Villa
            </Text>
            <View className='flex-row items-center justify-center gap-1'>
              <Image 
                source={icons.star}
                className='size-6'
              />
              <Text className='text-sm font-rubikBold text-primary-300 pt-1'>
                4.5
              </Text>
              <Text className='text-sm font-rubik text-black-300 pt-1 ml-1'>
                (35 Reviews)
              </Text>
            </View>
          </View>
          <View className='flex-row items-center justify-between 
          gap-6 px-2'>
            <View className='flex-row items-center justify-center gap-1'>
              <View className='bg-primary-100 px-2 py-1.5 
              rounded-full size-11 items-center justify-center'>
                <Image 
                  source={icons.bed}
                  className='size-6'
                />
              </View>
              <Text className='text-sm font-rubikBold text-black-300 pt-1 pl-1'>
                5 Beds
              </Text>
            </View>
            <View className='flex-row items-center justify-center gap-1'>
              <View className='bg-primary-100 px-2 py-1.5 
              rounded-full size-11 items-center justify-center'>
                <Image 
                  source={icons.bath}
                  className='size-6'
                />
              </View>
              <Text className='text-sm font-rubikBold text-black-300 pt-1 pl-1'>
                4 Baths
              </Text>
            </View>
            <View className='flex-row items-center justify-center gap-1'>
              <View className='bg-primary-100 px-2 py-1.5 
              rounded-full size-11 items-center justify-center'>
                <Image 
                  source={icons.area}
                  className='size-6'
                />
              </View>
              <Text className='text-sm font-rubikBold text-black-300 pt-1 pl-1'>
                400 sqm
              </Text>
            </View>
          </View>
        </View>
        <View className='border-b border-primary-200 mt-10 mx-5' />
      </ScrollView>
    </View>
  )
}

export default Property