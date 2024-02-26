import React from 'react';
import { View, FlatList, Text, ListRenderItemInfo } from 'react-native';
import Group from 'app/components/cards/group';
import { useSuggestedGroups } from 'app/redux/group/hooks';

export type RecommendedGroupsScreenProps = {
  navigation?: any;
};

const RecommendedGroupsScreen: React.FC<RecommendedGroupsScreenProps> = ({
  navigation,
}) => {

  const { status, data, error, isFetching, refetch } = useSuggestedGroups();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View>
        <FlatList
          style={{
            marginTop: 6,
            padding: 20,
          }}
          data={data}
          keyExtractor={(item: GroupProps) => item._id}
          renderItem={({ item }: ListRenderItemInfo<GroupProps>) => (
            <Group item={item} navigation={navigation} recommended={true} />
          )}
        />
      </View>
    </View>
  );
};

export default RecommendedGroupsScreen;
