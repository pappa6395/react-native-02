import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import icons from '@/constants/icons';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {

    const path = usePathname();
    const params = useLocalSearchParams<{query?: string}>();
    const [search, setSearch] = useState(params.query || "")

    // const debouncedSearch = useDebouncedCallback((text: string) => {
    //     if (text.trim() === '') return; // Avoid setting empty query
    //     router.setParams({ query: text });
    // }, 500)

    const handleSearch = (text: string) => {
        if (text === search) return; // ✅ Prevent redundant updates

        setSearch(text);
        router.setParams({ query: text }); // 🔥 Update query instantly
    };

  return (
    <View className='flex-row items-center justify-between 
    w-full px-4 rounded-lg bg-accent-100 border 
    border-primary-100 mt-5 py-2'
    >
        <View className='flex-1 flex-row items-center justify-start z-50'>
            <Image
                source={icons.search}
                className='size-5' 
            />
            <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder='Search Properties...'
                className='text-sm font-rubik text-black-300 ml-2 flex-1' 
            />
        </View>
        <TouchableOpacity>
            <Image
                source={icons.filter}
                className='size-5' 
            />
        </TouchableOpacity>
    </View>
  )
}

export default Search