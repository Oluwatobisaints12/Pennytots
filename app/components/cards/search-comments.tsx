import { FunctionComponent } from "react";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CustomText } from "../elements";
import Avatar from 'app/components/elements/Avater';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FastImage from "react-native-fast-image";
import Document from '../attachments/Document';
import Audio from '../attachments/Audio';
import Video from 'app/components/attachments/Video';
import { timeAgo } from "app/helpers/time-ago";


export type CommentProps = {
    navigation: any;
    item?: any;
    refreshFunction?: () => void;
};

export const SearchCommentCard: FunctionComponent<CommentProps> = ({
    item,
    navigation,
    refreshFunction,
}) => {
    {

        const { SlideInMenu } = renderers;

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    backgroundColor: '#ffffff',
                    paddingTop: 20,
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                }}
            >
                <View style={{
                    width: '20%'
                }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('Common', {
                                screen: 'private-chat',
                                params: {
                                    postid:
                                        item.userId.first_name +
                                        ' ' +
                                        item.userId.last_name,
                                    userDetails: item.userId,
                                },
                            })
                        }
                    >
                        <View
                            style={{
                                marginBottom: 10,
                                marginRight: 10,
                            }}
                        >
                            <Avatar
                                source={item.userId.profile_picture}
                                size={50}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '80%' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            marginBottom: 5,
                        }}
                    >
                        <View style={{ width: '60%' }}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push('Common', {
                                        screen: 'private-chat',
                                        params: {
                                            userDetails: item.userId,
                                        },
                                    })
                                }
                            >
                                <CustomText
                                    style={{
                                        color: '#000000',
                                        fontSize: 18,
                                    }}
                                    textType='bold'
                                >
                                    {item.userId.first_name +
                                        ' ' +
                                        item.userId.last_name}
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '40%',
                                alignItems: 'flex-end',
                                flexWrap: 'nowrap',
                                flexDirection: 'row',
                                paddingLeft: 20,
                                justifyContent: "flex-end"
                            }}
                        >

                            <CustomText
                                style={{
                                    fontSize: hp('1.5%'),
                                    color: '#9D9D9D',
                                    marginTop: 7,
                                    alignSelf: "flex-end"
                                }}
                            >

                                {timeAgo(item.createdAt)}
                            </CustomText>

                            {/* <Menu
                    renderer={SlideInMenu}
                    // onSelect={(value) => onMenuClicked(value)}
                  >
                    <MenuTrigger>
                      <Icon
                        name={'ellipsis-v'}
                        size={17}
                        style={{
                          marginLeft: 10,
                        }}
                        color='black'
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
                            openReportDetails(item._id, 'comment');
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                            }}
                          >
                            <View
                              style={{
                                marginRight: 10,
                              }}
                            >
                              <Icon name='flag' size={20} />
                            </View>
                            <CustomText
                              style={{ color: 'black', fontSize: 20 }}
                            >
                              Flag comment as inappropriate
                            </CustomText>
                          </View>
                        </MenuOption>
                      </View>
                    </MenuOptions>
                  </Menu> */}
                        </View>
                    </View>
                    {/* {Comment} */}
                    <View
                        style={{
                            flexDirection: 'row',

                        }}
                    >
                        <View style={{ width: '95%', marginBottom: 10 }}>
                            <CustomText
                                style={{
                                    color: '#636363',
                                    lineHeight: 20,
                                }}
                            >
                                {item.comment}
                            </CustomText>
                        </View>
                    </View>

                    {/* Comment Medias */}

                    {item.image ? (
                        <TouchableOpacity
                            style={styles.attachment}
                            onPress={() =>
                                navigation.push('fullScreenImage', {
                                    image: item.image,
                                })
                            }
                        >
                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={{
                                    height: hp('30%'),
                                    borderRadius: wp('2%'),
                                    borderColor: 'white',
                                    borderWidth: wp('0.6%'),
                                    flex: 1,

                                    flexDirection: 'column',
                                }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ) : null}
                    {item.document ? (
                        <View style={styles.attachment}>
                            <Document
                                attachmentSize={item.attachmentSize}
                                link={item.document}
                                navigation={navigation}
                            />
                        </View>
                    ) : null}

                    {item.audio ? (
                        <View style={styles.attachment}>
                            <Audio
                                attachmentSize={item.attachmentSize}
                                link={item.audio}
                                navigation={navigation}
                            />
                        </View>
                    ) : null}

                    {item.video ? (
                        <View style={styles.attachment}>
                            <Video
                                attachmentSize={item.attachmentSize}
                                link={item.video}
                                navigation={navigation}
                            />
                        </View>
                    ) : null}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    attachment: {
        marginTop: 8,
        width: wp('68%'),
    },
})