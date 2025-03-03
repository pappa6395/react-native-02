import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import { PropCard, PropertyFeaturedCard } from "@/components/PropertyCard";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string}>();
  const { 
    data: latestProperties, 
    loading: latestPropertiesLoading 
  } = useAppwrite({
    fn: getLatestProperties
  })
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query,
      limit: 6,
    },
    skip: true,
  })
  
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query,
      limit: 6,
    });
  })

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);

  }

  return (
    <SafeAreaView
      className="bg-white h-full"
    >
      <FlatList 
        data={properties}
        keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
        numColumns={2}
        renderItem={({item}) => <PropCard 
        onPress={() => handleCardPress(item.$id)} 
        item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListFooterComponent={<View style={{ height: 80 }} />}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator 
              size='large'
              className="text-primary-300 mt-5" 
            />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex-row items-center justify-between mt-5">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: user?.avatar}}
                  className="size-12 rounded-full"
                />
                <View className="flex-col items-start justify-center ml-2">
                  <Text className="text-black-100 font-rubik text-xs">
                    Good Morning
                  </Text>
                  <Text className="text-sm font-rubikMedium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                className="size-6" 
              />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-rubikBold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubikBold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator 
                  size='large'
                  className="text-primary-300" 
                />
              ) : (
                !latestProperties || latestProperties.length === 0 ? (
                  <NoResults />
                ) : (
                  <View className="flex-row gap-5 mt-5">
                    <FlatList 
                      data={latestProperties}
                      keyExtractor={(item, index) => item?.id?.toString() ?? `post-${index}`}
                      renderItem={(item) => <PropertyFeaturedCard 
                        onPress={() => handleCardPress(item.item.$id)} 
                        item={item.item} />}
                      horizontal
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerClassName="gap-5 mt-5"
                      
                    />
                  </View>
                )
              )}
            </View>
            
            <View className="mt-5">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-rubikBold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubikBold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filter />
            </View>
          </View>
        }
      />
      
      
    </SafeAreaView>
  );
}
