import { View, Text } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

export const TimeAgo = (createdAt: string | undefined) => {
  if (!createdAt) return <Text>No date available</Text>;

  const timeAgoText = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const parts = timeAgoText.split(" ");

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 12, color: "gray" }}>{parts[0]}</Text>
      <Text style={{ fontSize: 12, color: "gray", marginLeft: 4 }}>{parts.slice(1).join(" ")}</Text>
    </View>
  );
};