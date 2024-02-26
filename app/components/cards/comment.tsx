import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Avatar from '../elements/Avater';
import { CustomText } from '../elements';
import { timeAgo } from 'app/helpers/time-ago';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReportDialog from 'app/components/dialogs/report';
import { Axios } from 'app/api/axios';
import ThumbSVG from 'app/assets/svg/thumb.svg';
import CommentSVG from 'app/assets/svg/comment.svg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { default as themeFont } from 'app/assets/themes/fonts.json';
import FastImage from 'react-native-fast-image';
import Document from '../attachments/Document';
import Audio from '../attachments/Audio';
import Video from '../attachments/Video';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import MenuSVG from 'app/assets/svg/menu.svg';
import { useSelector } from 'react-redux';
import { userId } from 'app/redux/user/reducer';
import { useTopicSubComments } from 'app/redux/topic/hooks';

interface ICommentCard {
    item: any;
    refreshFunction?: () => void,
    navigation: any;
    setSubCommentData: any;
}

const CommentCard = ({ item, refreshFunction = () => { }, navigation,
    setSubCommentData }: ICommentCard) => {

    const { SlideInMenu } = renderers;

    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const myId = useSelector(userId);
    const [commentId, setCommentId] = useState<any>(null)
    const { data: subComments, isLoading: loadingSubComments } = useTopicSubComments(commentId);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const [reportDetails, setReportDetails] = useState({});



    useEffect(() => {

        if (item.isLiked && item.likes) {
            setIsLiked(item.isLiked);
            setNumLikes(item.likes);
        }

    }, [item])


    function openReportDetails(item: any, type: any) {
        setReportDetails({ data: item, type });
        setShowReportDialog(true);
    }


    function handleCommentLike({ commentId, commentType }: any) {

        setIsLiked(!isLiked);
        setNumLikes(isLiked ? numLikes - 1 : numLikes + 1);

        Axios({
            method: 'post',
            url: '/topics/like-topic-comment/' + commentId + '?type=' + commentType,
        }).then((response) => {

            refreshFunction();
            // refetchComment();
        }).catch(() => {
            setIsLiked(!isLiked);
            setNumLikes(isLiked ? numLikes + 1 : numLikes - 1);

        })
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: 20,
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 1,
                paddingHorizontal: 20
            }}
        >
            <View style={{ width: '20%' }}>
                <TouchableOpacity
                    onPress={() => {
                        if (item?.userId?._id != myId) {
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
                    }

                    }
                >
                    <ReportDialog
                        show={showReportDialog}
                        setShow={setShowReportDialog}
                        reportDetails={reportDetails}
                    />

                    <View
                        style={{
                            marginBottom: rv(10),
                            marginLeft: rv(10),
                            marginRight: rv(10),
                        }}
                    >
                        <Avatar
                            source={item.userId.profile_picture}
                            size={rv(40)}
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
                        marginBottom: 10,
                        flex: 1
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
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <CustomText
                                adjustsFontSizeToFit={false}
                                numberOfLines={1}
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
                            flexDirection: 'row',
                            // paddingLeft: 20,
                        }}
                    >
                        <View style={{
                            width: '80%',
                            alignItems: 'flex-end'
                        }}>
                            <CustomText
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}
                                style={{
                                    fontSize: hp('1.5%'),
                                    color: '#9D9D9D',
                                    marginTop: 7,
                                    flexWrap: 'nowrap',
                                }}
                            >
                                {timeAgo(item.createdAt)}
                            </CustomText>
                        </View>


                        <Menu
                            renderer={SlideInMenu}
                            // onSelect={(value) => {
                            //     //onMenuClicked(value) 
                            // }}
                        >
                            <MenuTrigger>
                                <MenuSVG
                                    style={{
                                        marginLeft: rv(10),
                                        height: rv(17)
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
                                            openReportDetails(item._id, 'comment');
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                width: '100%',
                                                alignItems: 'center',
                                                marginHorizontal: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    marginRight: 10,
                                                }}
                                            >
                                                {/* <Icon name='flag' size={20} /> */}
                                            </View>
                                            <CustomText style={{ color: 'black', fontSize: 15 }}>
                                                Flag comment as inappropriate
                                            </CustomText>
                                        </View>
                                    </MenuOption>
                                </View>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
                {/* {item.updatedAt} */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    <View style={{ width: '95%' }}>
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
                            navigation.push('Common', {
                                screen: 'fullscreen-image',
                                params: {
                                    image: item.image,
                                },
                            })
                        }
                    >
                        <FastImage
                            source={{
                                uri: item.image
                            }}
                            style={{
                                height: hp('30%'),
                                borderRadius: wp('2%'),
                                borderColor: 'white',
                                borderWidth: wp('0.6%'),
                                flex: 1,
                                flexDirection: 'column',
                            }}
                            resizeMode={FastImage.resizeMode.cover}
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

                <View
                    style={{
                        width: '90%',
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setSubCommentData({
                                    id: item._id,
                                    comment: item.comment,
                                });
                            }}
                        >

                            <Ionicons
                                name='return-up-back'
                                size={17}
                                style={{
                                    marginLeft: 5,
                                }}
                                color='#9D9D9D'
                            />

                            {/* <CustomText
                                style={{
                                    color: '#9D9D9D',
                                    marginLeft: 3,
                                    fontSize: 13,
                                    paddingTop: 6,
                                }}
                            >
                                Reply
                            </CustomText> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCommentId(item._id)
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >

                            <CommentSVG
                                width={20}
                                color={'#9D9D9D'}
                                style={{
                                    marginRight: 5
                                }}
                            />

                            <CustomText
                                style={{
                                    color: '#9D9D9D',
                                    marginLeft: 3,
                                    fontSize: 13,
                                    paddingTop: 6,
                                }}
                            >
                                {item.subCommentsCount}
                                {/* {item.subCommentsCount} comment
                                {item.subCommentsCount > 1 ? 's' : ''} */}
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleCommentLike({ commentId: item._id, commentType: 'comment' })
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ThumbSVG
                                width={20}
                                color={isLiked ? '#E64028' : '#9D9D9D'}
                                style={{
                                    marginRight: 5
                                }}
                            />


                            <CustomText
                                style={{
                                    fontSize: 14,
                                    marginTop: 4,
                                    color: isLiked ? '#E64028' : '#9D9D9D',
                                    marginLeft: 3,
                                }}
                            >
                                {numLikes}
                                {/* Like{numLikes > 1 ? 's' : ''} */}
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SubComment Section */}

                <View
                    style={{
                        flex: 1,
                        marginVertical: 8,
                        width: '100%',

                    }}
                >
                    {subComments
                        ? subComments.map((subComment: any) => (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    paddingTop: 5,
                                }}
                            >
                                <View style={{ width: '15%' }}>
                                    <TouchableOpacity
                                        style={{
                                            paddingRight: 3
                                        }}
                                        onPress={() =>
                                            navigation.push('Common', {
                                                screen: 'private-chat',
                                                params: {
                                                    postid:
                                                        subComment.userId.first_name +
                                                        ' ' +
                                                        subComment.userId.last_name,
                                                    userDetails: subComment.userId,
                                                },
                                            })
                                        }
                                    >
                                        <Avatar
                                            source={subComment.userId.profile_picture}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: '85%' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: '60%',
                                                paddingTop: 5,
                                            }}
                                            onPress={() =>
                                                navigation.push('Common', {
                                                    screen: 'private-chat',
                                                    params: {
                                                        postid:
                                                            subComment.userId.first_name +
                                                            ' ' +
                                                            subComment.userId.last_name,
                                                        userDetails: subComment.userId,
                                                    },
                                                })}
                                        >
                                            <CustomText
                                                adjustsFontSizeToFit={true}
                                                numberOfLines={1}
                                                style={{
                                                    color: '#000000',
                                                }}
                                                textType='bold'
                                            >
                                                {subComment.userId.first_name +
                                                    ' ' +
                                                    subComment.userId.last_name}
                                            </CustomText>
                                        </TouchableOpacity>

                                        <View
                                            style={{
                                                width: '40%',
                                                alignItems: 'flex-end',
                                                flexDirection: 'row',
                                                paddingHorizontal: 5,
                                            }}
                                        >
                                            <View style={{
                                                width: '80%',
                                                alignItems: 'flex-end'
                                            }}>
                                                <CustomText
                                                    adjustsFontSizeToFit={true}
                                                    numberOfLines={1}
                                                    style={{
                                                        fontSize: 11,
                                                        color: '#9D9D9D',
                                                        marginTop: 7,

                                                    }}
                                                >
                                                    {timeAgo(subComment.createdAt)}
                                                </CustomText>
                                            </View>

                                            <View style={{
                                                width: '20%',

                                            }}>
                                                <Menu
                                                    renderer={SlideInMenu}
                                                    // onSelect={
                                                    //     (value) => { }
                                                    //     // onMenuClicked(value)
                                                    // }
                                                >
                                                    <MenuTrigger>

                                                        <MenuSVG
                                                            style={{
                                                                marginLeft: rv(10),
                                                                height: rv(17)
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
                                                                    openReportDetails(
                                                                        subComment._id,
                                                                        'sub-comment',
                                                                    );
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        width: '100%',
                                                                        alignItems: 'center',
                                                                        marginHorizontal: 10,
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            marginRight: 10,
                                                                        }}
                                                                    >
                                                                        {/* <Icon name='flag' size={20} /> */}
                                                                    </View>
                                                                    <CustomText style={{ color: 'black', fontSize: 15 }}>
                                                                        Flag comment as inappropriate
                                                                    </CustomText>
                                                                </View>
                                                            </MenuOption>
                                                        </View>
                                                    </MenuOptions>
                                                </Menu>
                                            </View>



                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <View style={{ width: '95%' }}>
                                            <CustomText
                                                style={{
                                                    color: '#636363',
                                                }}
                                            >
                                                {subComment.comment}
                                            </CustomText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                        : null}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    attachment: {
        marginTop: 8,
        width: wp('68%'),
    },
    text: {
        color: '#707070',
        fontSize: 18,
        padding: 4,
        width: '100%',
        fontFamily: themeFont.regular,
    },
    title: {
        fontSize: 25,
        color: '#333333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleAccount: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    disabled: {
        color: '#ccc',
    },
    divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    logView: {
        flex: 1,
        flexDirection: 'column',
    },
    logItem: {
        flexDirection: 'row',
        padding: 8,
    },
    slideInOption: {
        padding: 5,
    },
    bottom: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    touchableOpacityStyle: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // right: 30,
        bottom: 0,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: '125%',
        height: '125%',
        //backgroundColor:'black'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    profile: {
        height: 60,
        borderColor: '#C2C2C2',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 20,
        backgroundColor: '#FBFBFB',
        marginBottom: 10,
    },
});

export default CommentCard;