import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CustomText } from '../components/elements';

type HeaderTitleProps = {
  title: string;
  navigation: any;
};

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({
  navigation,
  title,
}) => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          marginLeft: 15,
          marginBottom: 5,
        }}
      >
        <Ionicons
          name='chevron-back'
          size={22}
          color='black'
          style={{
            marginRight: 15,
          }}
        />
      </TouchableOpacity>
      <CustomText
        style={{
          fontSize: 18,
        }}
      >
        {title}
      </CustomText>
    </View>
  );
};

export default HeaderTitle;
