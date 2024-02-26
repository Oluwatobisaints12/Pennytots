import React, { FunctionComponent } from 'react';
import { View, ListRenderItem } from 'react-native';
import { CustomText } from '../elements';
import Avatar from '../elements/Avater';


type GroupParticipantItemProps = {
  item: AccountProfileProp;
  navigation: any;
};

const GroupParticipantItem: FunctionComponent<GroupParticipantItemProps> = ({
  item,
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        minHeight: 60,
        marginTop: 5,
      }}
    >
      <View
        style={{
          width: '20%',
        }}
      >
        <Avatar size={40} source={item.profile_picture} />
      </View>
      <View
        style={{
          width: '80%',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <CustomText
          style={{
            fontSize: 16,
            marginBottom: 10
          }}
          textType='bold'
        >
          {item.first_name} {item.last_name}
        </CustomText>

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FastImage
            source={require('../../assets/single_user.png')}
            style={{
              width: 18,
              height: 18,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />

          {/* <CustomText
            style={{
              marginTop: 2,
              marginLeft: 4,
              color: '#696969',
            }}
          >
            About me: {item.bio}
          </CustomText> 
      </View> */}
      </View>
    </View >
  );
};

export default GroupParticipantItem;
