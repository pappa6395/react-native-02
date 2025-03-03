import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View 
      className='items-center my-5 pb-80 h-80'
    >
        <Image 
            source={images.noResult}
            className='w-11/12 h-80'
            resizeMode='contain'
        />
        <Text className='text-2xl 
        font-rubikBold text-black-300 mt-5
        '>
            NoResults
        </Text>
        <Text className='text-base font-rubik text-black-100 mt-2'>
            Try searching for something else or adjusting your filters.
        </Text>
    </View>
  )
}

export default NoResults