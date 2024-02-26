import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { CustomText } from 'app/components/elements';
import HeaderTitle from 'app/components/HeaderTitle';
import Avatar from 'app/components/elements/Avater';
import GroupParticipantItem from 'app/components/FlatListItems/GroupParticipant';
import { useSelector } from 'react-redux';
import { userId } from 'app/redux/user/reducer';
import { Axios } from 'app/api/axios';
import CreatorSVG from 'app/assets/svg/creator.svg';
import MemberSVG from 'app/assets/svg/members.svg';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import { useGetGroup } from 'app/redux/group/hooks';
import { useTranslation } from 'react-i18next';

export type GroupInformationScreenProps = {
  navigation?: any;
  route?: any;
  item?: any;
};

const GroupInfo = ({ navigation, route }: any) => {
  const myId = useSelector(userId);

  const { groupDetails } = route.params;

  const [isAdmin, setIsAdmin] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupTag, setGroupTag] = useState('');
  const [tags, setTags] = useState([]);
  const [groupId, setGroupId] = useState<any>(null);
  const { data: group, isLoading: loading } = useGetGroup(groupId);
  const { t } = useTranslation();

  useEffect(() => {
    if (groupDetails) {
      setGroupId(groupDetails._id);
    }
  }, [groupDetails]);

  useEffect(() => {
    console.log(group, '== group');
    if (group) {
      setGroupDescription(group.description);
      setGroupName(group.name);
      setGroupTag(group.tag);
    }
  }, [group]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: '/tags/list',
    }).then((response) => {
      let formatData = JSON.parse(JSON.stringify(response.data.data));
      for (let i in formatData) {
        formatData[i].label = formatData[i].name;
        formatData[i].value = formatData[i]._id;
      }
      // console.log('tags', formatData);
      setTags(formatData);
    });
  }, [group]);

  useEffect(() => {
    if (group && group.participants && group.participants.length > 0) {
      let currentUser = group.participants.filter((item: any) => {
        return item._id == myId;
      });
      if (currentUser && currentUser.length > 0) {
        setIsAdmin(currentUser[0].admin ? currentUser[0].admin : false);
      }
      //  console.log('currentUser ', currentUser);
    }
  }, [group]);

  function InGroup() {
    if (group && group.participants && group.participants.length > 0) {
      let ids = new Set(group.participants.map((data: any) => data._id));
      if (ids.has(myId)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // async function makeAdmin(userId: string) {
  //   setLoading(true);
  //   await Axios({
  //     method: 'patch',
  //     url: '/group/make-admin/' + groupDetails._id + '/' + userId,
  //   })
  //     .then((response: any) => {
  //       showMessage({
  //         type: 'success',
  //         title: 'Success',
  //         message: response.data.message,
  //       });

  //       getGroup(groupDetails);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function removeAdmin(userId: string) {
  //   setLoading(true);
  //   await Axios({
  //     method: 'patch',
  //     url: '/group/remove-admin/' + groupDetails._id + '/' + userId,
  //   })
  //     .then((response: any) => {
  //       showMessage({
  //         type: 'success',
  //         title: 'Success',
  //         message: response.data.message,
  //       });

  //       getGroup(groupDetails);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function removeUser(userId: string) {
  //   setLoading(true);
  //   await Axios({
  //     method: 'patch',
  //     url: '/group/remove/' + groupDetails._id + '/' + userId,
  //   })
  //     .then((response: any) => {
  //       showMessage({
  //         type: 'success',
  //         title: 'Success',
  //         message: response.data.message,
  //       });
  //       getGroup(groupDetails);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function updateGroup() {
  //   setLoading(true);
  //   await Axios({
  //     method: 'patch',
  //     url: '/group/update/' + groupDetails._id,
  //     data: {
  //       name: groupName,
  //       description: groupDescription,
  //       tag: groupTag,
  //     },
  //   })
  //     .then((response) => {
  //       // console.log('group', response.data);
  //       getGroup(groupDetails);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function leaveGroup() {
  //   setLoading(true);
  //   await Axios({
  //     method: 'delete',
  //     url: '/group/leave/' + groupDetails._id,
  //   })
  //     .then((response) => {
  //       navigation.goBack();
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // async function reportGroup() {
  //   setLoading(true);
  //   await Axios({
  //     method: 'post',
  //     url: '/group/flag/' + groupDetails._id,
  //     data: {},
  //   })
  //     .then((response: any) => {
  //       showMessage({
  //         type: 'success',
  //         title: 'Success',
  //         message: response.data.message,
  //       });
  //       navigation.goBack();
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  if (!group) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <HeaderTitle
        title={group.name.slice(0, 17) + (group.name.length > 17 ? '...' : '')}
        navigation={navigation}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '70%',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (group.image) {
                    navigation.push('Common', {
                      screen: 'fullscreen-image',
                      params: {
                        image: group.image,
                      },
                    });
                  }
                }}
              >
                <Avatar size={90} type='group' source={group.image} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '30%',
              }}
            >
              {isAdmin && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('edit-group', {
                      group,
                    })
                  }
                  style={{
                    borderColor: 'gold',
                    borderWidth: rv(1),
                    borderRadius: rv(20),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: rv(7),
                    paddingHorizontal: rv(10),
                  }}
                >
                  <CustomText
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    textType='semi-bold'
                    style={{
                      fontSize: rv(13),
                    }}
                  >
                    Edit Group
                  </CustomText>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <CustomText
            style={{
              marginTop: 10,
              fontSize: rv(16),
            }}
            textType='bold'
          >
            {group.name}
          </CustomText>

          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: '100%',
              }}
            >
              <CustomText
                style={{
                  fontSize: rv(14),
                }}
                textType='semi-bold'
              >
                {t('Description:')}
              </CustomText>
              <CustomText
                style={{
                  fontSize: rv(14),
                }}
              >
                {group.description}
              </CustomText>
            </View>

            {/* 
            <View
              style={{
                width: '30%',
              }}
            >
              <TouchableOpacity
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
                <CustomText textType='semi-bold'>Joined1</CustomText>
              </TouchableOpacity>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CreatorSVG
                style={{
                  width: 25,
                  height: 25,
                }}
              />

              <CustomText
                style={{
                  marginTop: 4,
                  marginLeft: 4,
                }}
              >
                {t('GroupDesc_creator')}:
              </CustomText>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (myId != group.createdBy._id) {
                  navigation.navigate('Common', {
                    screen: 'private-chat',
                    params: {
                      userDetails: group.createdBy,
                    },
                  });
                }
              }}
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar size={25} source={group.createdBy.profile_picture} />

              <CustomText
                style={{
                  marginTop: 4,
                  marginLeft: 4,
                  flex: 1,
                }}
              >
                {group.createdBy.first_name} {group.createdBy.last_name}
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <FastImage
              source={require('app/assets/copy_link.png')}
              style={{
                width: 18,
                height: 19,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />

            <CustomText
              style={{
                marginTop: 4,
                marginLeft: 4,
                color: '#696969',
              }}
            >
              Copy group link
            </CustomText>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <MemberSVG width={22} height={22} />

            <CustomText
              style={{
                marginTop: 4,
                marginLeft: 4,
                color: '#696969',
              }}
            >
              {t("Groups_members")} ({group.participants.length} member
              {group.participants.length > 1 ? 's' : ''})
            </CustomText>
          </View>

          <FlatList
            style={{
              marginTop: 20,
            }}
            data={group.participants}
            keyExtractor={(item: GroupParticipant) => item._id}
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => {
                  if (myId != item.item._id) {
                    navigation.push('Common', {
                      screen: 'private-chat',
                      params: {
                        userDetails: item.item,
                      },
                    });
                  }
                }}
              >
                <GroupParticipantItem
                  item={item.item}
                  navigation={navigation}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default GroupInfo;
