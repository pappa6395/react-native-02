import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import { PropCard, PropertyFeaturedCard } from "@/components/PropertyCard";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {

  const params = useLocalSearchParams<{ query?: string; filter?: string}>();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // const { data: properties, loading, refetch } = useAppwrite({
  //   fn: getProperties,
  //   params: {
  //     filter: params.filter!,
  //     query: params.query,
  //     limit: 4,
  //   },
  //   skip: true,
  // })

  const fetchProperties = async (pageNum: number) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const newProperties = await getProperties({
        filter: params.filter!,
        query: params.query,
        limit: 4, // Fetch 10 properties per request
        offset: (pageNum - 1) * 4, // Skip previous pages
      });
      
      setProperties((prev) => [...prev, ...newProperties]);
      setHasMore(newProperties.length === 4); // If less than 10, no more data
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect(() => {
  //   refetch({
  //     filter: params.filter!,
  //     query: params.query,
  //     limit: 4,
  //   });
  // })
  useEffect(() => {
    setProperties([]); // Reset list on filter change
    setPage(1);
    setHasMore(true);
    fetchProperties(1);
  }, [params.filter, params.query]);

  // Function to load more properties on scroll
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProperties(page + 1);
    }
  };

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
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : null
        }
        keyboardShouldPersistTaps="handled"
        onEndReached={loadMore} // Load more when scrolled to bottom
        onEndReachedThreshold={0.5} // Adjust sensitivity
        ListEmptyComponent={
          !loading ? (
            <NoResults />
          ) : null
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex-row items-center justify-between mt-5">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="flex-row bg-primary-200 
                rounded-full size-11 items-center justify-center"
              >
                <Image 
                source={icons.backArrow}
                className="size-5"
                />
              </TouchableOpacity>
              <Text className="text-2xl font-rubikExtraBold text-black-200">
                Explore
              </Text>
              <TouchableOpacity 
                className="flex-row bg-primary-200 
                rounded-full size-11 items-center justify-center"
              >
                <Image 
                source={icons.bell}
                className="size-5"
                />
              </TouchableOpacity>
            </View>
            <Search />
            <View className="mt-5">
              <Filter />
              <Text className="text-xl font-rubikBold text-black-300 mt-5">
                  Found {properties?.length || 0} Properties
              </Text>
            </View>
          </View>
        }
      />
      
      
    </SafeAreaView>
  );
}
