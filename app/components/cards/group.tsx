import React, { FunctionComponent, useContext, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CustomText } from '../elements';
import Avatar from '../elements/Avater';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import ReportDialog from 'app/components/dialogs/report';
import { Axios } from 'app/api/axios';
import { ShowAlert } from 'app/providers/toast';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import MenuSVG from 'app/assets/svg/menu.svg';
import { useTranslation } from 'react-i18next';

type GroupItemProps = {
  item: GroupProps;
  navigation: any;
  recommended?: boolean;
  menu?: boolean;
  refreshFunction?: () => void;
};

const Group: FunctionComponent<GroupItemProps> = ({
  item,
  navigation,
  recommended,
  refreshFunction,
  menu = true,
}) => {
  const { SlideInMenu } = renderers;
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const { t } = useTranslation();

  function openReportDetails(item: any) {
    setReportDetails({ data: item, type: 'group' });
    setShowReportDialog(true);
  }

  async function leaveGroup(groupId: string) {
    await Axios({
      method: 'delete',
      url: '/group/leave/' + groupId,
    }).then((response) => {
      ShowAlert({
        type: 'success',
        message: response.data.message,
      });
      refreshFunction!();
    });
  }

  function muteNotification() {
    Axios({
      method: 'post',
      url: '/app/mute-notifications/',
      data: {
        contentId: item._id,
        type: 'group',
        action: item.muted ? 'unmute' : 'mute',
      },
    }).then((response: any) => {
      refreshFunction!();
      ShowAlert({
        type: 'info',
        className: 'Success',
        message: 'Notifications has been muted successfully',
      });
    });
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Common', {
          screen: 'group-chat',
          params: {
            groupDetails: item,
          },
        })
      }
      style={{
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
      }}
    >
      <ReportDialog
        show={showReportDialog}
        setShow={setShowReportDialog}
        reportDetails={reportDetails}
      />
      <View
        style={{
          width: '20%',
          justifyContent: 'flex-start',
        }}
      >
        <Avatar size={50} source={item.image} />
      </View>
      <View
        style={{
          width: '80%',
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View
            style={{
              width: '70%',
              paddingRight: rv(5),
            }}
          >
            <CustomText
              style={{
                fontSize: rv(15),
                flex: 1,
              }}
              textType='bold'
            >
              {item.name}
            </CustomText>
          </View>

          <View
            style={{
              width: '30%',
              alignItems: 'flex-end',
            }}
          >
            {recommended ? (
              <CustomText
                style={{
                  fontSize: rv(12),
                  flex: 1,
                }}
              >
                {item.participants.length} Member
                {item.participants.length > 1 ? 's' : ''}
              </CustomText>
            ) : null}

            {!recommended && menu ? (
              <Menu renderer={SlideInMenu}>
                <MenuTrigger>
                  <MenuSVG
                    style={{
                      marginHorizontal: 5,
                      width: 23,
                      height: 23,
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: wp('4%'),
                    }}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionText: [styles.text],
                    optionsContainer: [
                      {
                        borderRadius: 15,
                      },
                    ],
                  }}
                >
                  <View
                    style={{
                      margin: 5,
                      flexDirection: 'column',
                      marginVertical: 10,
                      padding: 15,
                    }}
                  >
                    <MenuOption
                      onSelect={() => {
                        openReportDetails(item._id);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          marginBottom: 10,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                          }}
                        >
                          {/* <Image
                              source={require('app/assets/report.png')}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                            /> */}
                        </View>
                        <CustomText style={{ color: 'black' }}>
                          {t('Groups_opt_reportGroup')}
                        </CustomText>
                      </View>
                    </MenuOption>

                    <MenuOption
                      onSelect={() => {
                        muteNotification();
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          marginBottom: 10,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                          }}
                        >
                          {/* <Image
                              source={require('app/assets/report.png')}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                            /> */}
                        </View>
                        <CustomText style={{ color: 'black' }}>
                          {item.muted ? 'Unmute Group' : 'Mute Group'}
                        </CustomText>
                      </View>
                    </MenuOption>

                    <MenuOption
                      onSelect={() => {
                        leaveGroup(item._id);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          marginBottom: 10,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                          }}
                        >
                          {/* <Image
                              source={require('../../assets/exit.png')}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                            /> */}
                        </View>
                        <CustomText style={{ color: 'black' }}>
                          {t('Groups_opt_exitGroup')}
                        </CustomText>
                      </View>
                    </MenuOption>
                  </View>
                </MenuOptions>
              </Menu>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: '70%',
            }}
          >
            {item.description && (
              <CustomText
                style={{
                  fontSize: rv(12.5),
                }}
              >
                {item.description.slice(0, 17)}
                {item.description.length > 17 ? '...' : ''}
              </CustomText>
            )}
          </View>
          {recommended ? (
            <View
              style={{
                width: '30%',
                justifyContent: 'flex-end',
                paddingLeft: 10,
              }}
            >
              {/* <TouchableOpacity
                style={{
                  borderColor: '#DAA99A',
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 7,
                  paddingHorizontal: 15,
                }}
              >
                <CustomText textType='semi-bold'>Join</CustomText>
              </TouchableOpacity> */}
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#707070',
    textAlign: 'center',
    fontSize: 18,
    width: '87%',
    fontFamily: 'regular',
  },
});

export default Group;
