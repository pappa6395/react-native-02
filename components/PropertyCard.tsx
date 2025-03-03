import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

type Props = {
    onPress?: () => void;
    item: Models.Document;
}

export const PropertyFeaturedCard = ({ 
    onPress, 
    item 
}: Props) => {

    const { name,
        type,
        description,
        address,
        price,
        area,
        bedrooms,
        bathrooms,
        rating,
        facilities,
        image,
        geolocation, } = item

    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex-col items-start w-60 h-80 relative'
        >
            <Image
                source={{ uri : image }}
                className='size-full rounded-2xl' 
            />
            <Image 
                source ={images.cardGradient}
                className='size-full rounded-2xl absolute bottom-0'
            />
            <View className='flex-row items-center bg-white/90 
            px-3 py-1.5 rounded-full absolute top-5 right-5'>
                <Image
                    source={icons.star}
                    className='size-3.5' 
                />
                <Text className='text-xs font-rubikBold text-primary-300 ml-1'>
                    {rating}
                </Text>
            </View>
            <View className='flex-col items-start absolute bottom-5 inset-x-5'>
                <View>
                    <Text className='text-xl font-rubikExtraBold 
                    text-white' numberOfLines={1}
                    >
                        {name}
                    </Text>
                    <Text className='text-base font-rubik text-white'>
                    {address}
                    </Text>
                    <View className='flex-row w-full justify-between items-center'>
                        <Text className='text-xl font-rubikExtraBold text-white'>
                            ${price.toLocaleString()}
                        </Text>
                        <Image 
                            source={icons.heart}
                            className='size-5'
                        />
                    </View>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

export const PropCard = ({ onPress, item }: Props) => {

    const { name,
        type,
        description,
        address,
        price,
        area,
        bedrooms,
        bathrooms,
        rating,
        facilities,
        image,
        geolocation, } = item

  return (
    <TouchableOpacity 
        onPress={onPress}
        className='flex-1 w-full mt-4 px-3 py-4 rounded-lg 
        bg-white shadow-lg shadow-black-100/70 relative' 
    >
        <View className='flex-row items-center bg-white/90 
            px-3 py-1.5 rounded-full absolute top-5 right-5 z-50'>
                <Image
                    source={icons.star}
                    className='size-2.5' 
                />
                <Text className='text-xs font-rubikBold text-primary-300 ml-1'>
                    {rating}
                </Text>
        </View>
        <Image
            source={{ uri : image }}
            className='w-full h-40 rounded-lg' 
        />
        <View className='flex-col mt-2'>
            <Text className='text-base font-rubikBold text-black-300'>
                {name}
            </Text>
            <Text className='text-xx font-rubik text-black-200'>
                {address}
            </Text>
            <View className='flex-row w-full justify-between items-center mt-2'>
                <Text className='text-xl font-rubikExtraBold text-primary-300'>
                    ${price.toLocaleString()}
                </Text>
                <Image 
                    source={icons.heart}
                    className='size-5 mr-2'
                    tintColor="#191D31"
                />
            </View>
        </View>
    </TouchableOpacity>
  )
}

