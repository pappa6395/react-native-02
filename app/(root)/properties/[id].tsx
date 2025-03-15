import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getCurrentUser, getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { facilities } from '@/constants/data'
import Comment from '@/components/Comment'
import { Models } from 'react-native-appwrite'

export type PropertyProps = {
  id: string;
  name: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  image: string;
  geolocation: string;
  type: string;
  description: string;
}

export type ReviewsProps = {
  id: string;
  name: string;
  rating: number;
  avatar: string;

}


const Property = () => {

    const { id } = useLocalSearchParams<{id: string}>();

    const windowHeight = Dimensions.get("window").height;

    const { data: selectedProperty } = useAppwrite({
      fn: getPropertyById,
      params: { id },
    })
    
   

  return (
    <View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 bg-white'
      >
        <View className='w-full relative' style={{ height : windowHeight / 2 }}>
          <Image 
            source={{ uri : selectedProperty?.image }}
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
              tintColor={"gray"}
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
                  tintColor={"gray"}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-row rounded-full size-11 items-center justify-center"
                >
                  <Image 
                  source={icons.send}
                  className="size-8"
                  tintColor={"gray"}
                  />
                </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className='mt-7 px-5 gap-2'>
          <Text className='text-2xl font-rubikBold text-black-300'>
            {selectedProperty?.name}
          </Text>
          <View className='flex-row items-center gap-6'>
            <Text className='bg-primary-100 font-rubikBold 
            text-primary-300 px-2 py-1.5 rounded-full'
            >
              {selectedProperty?.type}
            </Text>
            <View className='flex-row items-center justify-center gap-1'>
              <Image 
                source={icons.star}
                className='size-6'
              />
              <Text className='text-sm font-rubikBold text-primary-300 pt-1'>
                {selectedProperty?.rating}
              </Text>
              <Text className='text-sm font-rubik text-black-300 pt-1 ml-1'>
                ({selectedProperty?.reviews.length} Reviews)
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
                {selectedProperty?.bedrooms} Beds
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
                {selectedProperty?.bathrooms} Baths
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
                {selectedProperty?.area} sqft
              </Text>
            </View>
          </View>
        </View>

        <View className='border-b border-primary-200 mt-10 mx-5' />

        <View>
          <Text className='text-xl font-rubikBold 
            text-black-300 mx-5 pt-5'>
              Agent
          </Text>
          <View className='flex-row gap-2 mx-4 px-2 items-center justify-between'>
            <View className='flex-row gap-4 items-center'>
              <Image 
                source={{ uri : selectedProperty?.agent.avatar }}
                className='size-14 rounded-full mt-2'
                resizeMode='cover'
              />
              <View>
                <Text className='text-lg font-rubikBold text-black-300 mt-2'>
                  {selectedProperty?.agent.name}
                </Text>
                <Text className='text-sm font-rubikMedium text-black-100'>
                  {selectedProperty?.agent.email}
                </Text>
              </View>
            </View>
            <View className='flex-row'>
              <TouchableOpacity 
                className="flex-row rounded-full size-11 items-center justify-center mt-2"
              >
                <Image 
                source={icons.chat}
                className="size-8"
                />
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row rounded-full size-11 items-center justify-center mt-2"
              >
                <Image 
                source={icons.phone}
                className="size-8"
                />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View>
          <Text className='text-2xl font-rubikBold text-black-300 mx-5 pt-5 mt-10'>
            Overview
          </Text>
          <Text className='text-lg font-rubik text-black-200 mx-5 mt-2'>
            {selectedProperty?.description}
          </Text>
        </View>

        <View>
          <Text className='text-2xl font-rubikBold text-black-300 mx-5 pt-5 mt-10'>
            Facilities
          </Text>
          {selectedProperty?.facilities.length > 0 && (
            <View className='flex-row flex-wrap gap-8 mt-5 
            justify-center items-center mx-5'>
            {selectedProperty?.facilities?.map((item: string, index: number) => {
              const facility = facilities.find((facility) => facility.title === item);
              return (
                <View key={index} className='gap-2 items-center justify-center'>
                  <View className='bg-primary-100 rounded-full size-16
                  gap-1 items-center justify-center'>
                    <Image 
                      source={facility ? facility?.icon : icons.info}
                      className='size-8'
                    />
                  </View>
                  <Text 
                    className='text-sm max-w-16 font-rubik text-black-200'
                    ellipsizeMode='tail'
                    numberOfLines={1}
                  >
                    {facility?.title}
                  </Text>
                </View>
                )
              })}
            </View>
          )}
        </View>

        <View>
          <Text className='text-2xl font-rubikBold text-black-300 mx-5 pt-5 mt-10'>
            Gallery
          </Text>
          <FlatList
            contentContainerStyle={{ paddingRight: 20 }}
            data={selectedProperty?.gallery}
            keyExtractor={(item) => item.$id}
            renderItem={(item) => (
              <View className='w-1/3'>
                <Image 
                  source={{ uri: item.item.image }}
                  className='size-40 rounded-xl'
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName='flex-row mt-5 px-2 mx-2 gap-2' 
          />
        </View>

        <View>
          <Text className='text-2xl font-rubikBold text-black-300 mx-5 pt-5 mt-10'>
            Location
          </Text>
          <View className='flex-row items-center gap-2 mx-5 mt-3'>
            <Image 
              source={icons.location}
              className='size-6'
            />
            <Text className='text-base font-rubikBold text-black-200 ml-2'>
              {selectedProperty?.address}
            </Text>
          </View>
          <View className='mx-2 px-2 mt-4'>
            <Image 
              source={images.map}
              className='w-full h-52 rounded-xl'
            />
          </View>
        </View>

        <View className='mt-10 mx-5'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Image
                source={icons.star}
                className='size-6' 
              />
              <Text className='text-xl font-rubikBold text-black-300 ml-4 mt-1.5'>
                {selectedProperty?.rating}
              </Text>
              <Text className='text-xl font-rubikBold text-black-100 ml-2 mt-1.5'>
                ({selectedProperty?.reviews.length} Reviews)
              </Text>
            </View>
            <TouchableOpacity>
              <Text className='text-xl font-rubikBold text-primary-300 mt-1.5'>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View className='mt-2 pt-2'>
            {selectedProperty?.reviews.slice(0,3).map((review: Models.Document, index: number) => {
              return (
                <View 
                key={index}
                className='mb-4 rounded-lg'
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 4, // Required for Android
                  backgroundColor: 'white' // Needed for shadow to work
              }}>
                    <Comment item={review} />
                </View>
                
              )
            })}
          </View>
        </View>

        <View 
          className='flex-row items-center mt-10 py-5
          absolute bottom-0 w-full
          justify-between border border-primary-200 rounded-t-2xl'
          style={{
            shadowColor: 'gray',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 4, // Required for Android
            backgroundColor: 'white' // Needed for shadow to work
            
        }}
        >
          <View className='items-start justify-start gap-2 mx-5 mt-5'>
            <Text className='text-base uppercase tracking-widest 
            font-rubikMedium text-black-100'
            >
              Price
            </Text>
            <Text className='text-xl font-rubikBold text-black-300'>
              ${selectedProperty?.price.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            className='pt-3'
          >
              <View className='border w-[250px] border-primary-300 
              bg-primary-300 px-4 py-3 mr-5 rounded-full items-center
              shadow-zinc-400 shadow-md'>
                <Text className='text-lg text-center font-rubikBold text-white'>
                  Booking Now
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Property