import { View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { CustomText } from './elements';
import SVG from "app/providers/svg";
import { useGetUnreadNotifications } from 'app/redux/main/hooks';
import { useTranslation } from 'react-i18next';

type ConvoNotificationIconProps = {
  count: number;
};

const ConvoNotificationIcon: FunctionComponent<ConvoNotificationIconProps> = ({
  count,
}) => {
  const { t } = useTranslation();


  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <CustomText
        style={{
          fontSize: 12,
          marginRight: 3,
          paddingTop: 3,
        }}
      >
        {t("Convos")}
      </CustomText>

      {count ? (
        <View
          style={{
            minHeight: 20,
            minWidth: 20,
            borderRadius: 20,
            backgroundColor: 'gold',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 3,
          }}
        >
          <CustomText
            style={{
              fontSize: 9,
              color: 'black',
              paddingTop: 3,
              paddingLeft: 2,
            }}
          >
            {count}

          </CustomText>
        </View>
      ) : null}
    </View>
  );
};

export default ConvoNotificationIcon;
