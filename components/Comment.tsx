import { View, Text, Image } from 'react-native'
import React from 'react'
import { Models } from 'react-native-appwrite'
import icons from '@/constants/icons';
import { TimeAgo } from '@/utils/timeAgo';

type CommentProps = {
    item: Models.Document | null;
}

const Comment = ({item}: CommentProps) => {

  return (
    <View 
        className='py-4 gap-2 px-2'
    >
      <View className='flex-row items-center gap-2'>
        <Image
            source={{ uri : item?.avatar }}
            className='size-14 rounded-full' 
        />
        <Text className='text-sm font-rubikMedium text-black-100'>
          {item?.name}
        </Text>
      </View>
      <Text className='text-sm font-rubikMedium text-black-200'>
        {item?.review}
      </Text>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row'>
            <Image
                source={icons.heart}
                className='size-4'
                tintColor={'#F44336'}
            />
            <Text className='text-sm font-rubik text-black-300 ml-1'>
                {item?.rating}
            </Text>
        </View>
        {item?.$createdAt && (
            <Text 
                className='text-xs font-rubik text-black-100'
            >
                {TimeAgo(item?.$createdAt)}
            </Text>
        )}
      </View>
    </View>
  )
}

export default Comment