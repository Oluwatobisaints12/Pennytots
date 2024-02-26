// Create react native functional component

import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RecommendedGroupsScreen from './recommended-groups';
import MyGroups from './my-groups';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import FloatingAddSVG from 'app/assets/svg/floating-add.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { useTranslation } from 'react-i18next';

export type GroupsScreenProps = {
  navigation?: any;
  route: any;
};

const GroupsScreen: React.FC<GroupsScreenProps> = ({ navigation, route }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  function HandleTabChange(index: number) {
    setTabIndex(index);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '80%',
          }}
        >
          <SegmentedControlTab
            activeTabStyle={{
              backgroundColor: 'white',
              borderBottomWidth: 2,
              borderBottomColor: '#FFCB05',
            }}
            activeTabTextStyle={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'bold',
              paddingVertical: 8,
            }}
            tabTextStyle={{
              color: 'black',
              fontSize: 13,
              paddingVertical: 4,
              fontFamily: 'regular',
            }}
            tabStyle={{
              backgroundColor: 'white',
              borderColor: 'white',
              color: 'yellow',
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
            }}
            values={[t('Groups_'), t('Groups_joinGroups')]}
            selectedIndex={tabIndex}
            onTabPress={HandleTabChange}
          />
        </View>
      </View>
      {tabIndex === 0 ? (
        <MyGroups navigation={navigation} />
      ) : tabIndex === 1 ? (
        <RecommendedGroupsScreen navigation={navigation} />
      ) : null}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.push('Home', { screen: 'CreateGroup' })}
        style={styles.touchableOpacityStyle}
      >
        <FloatingAddSVG width={rv(55)} height={rv(55)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});
export default GroupsScreen;
