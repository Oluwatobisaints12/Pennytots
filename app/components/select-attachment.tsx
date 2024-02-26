import { View, Text, Image, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import React from 'react';
import GallerySVG from 'app/assets/svg/media/gallery.svg';
import GallerySVG2 from 'app/assets/svg/media/gallery3.svg';
import CameraSVG from 'app/assets/svg/media/camera.svg';
import DocumentSVG from 'app/assets/svg/media/document.svg';
import ContactSVG from 'app/assets/svg/media/contact.svg';
import AudioSVG from 'app/assets/svg/media/audio.svg';;
import { useTranslation } from 'react-i18next';

export default function SelectAttachment(props: any) {
  const { t } = useTranslation();
  return (
    <View>
      {props.show ? (
        <View
          style={{
            height: 230,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => props.openShareAttachment('camera')}
              style={{
                flexDirection: 'column',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <CameraSVG
                width={57}
              />


              <Text
                style={{
                  paddingTop: 4,
                  paddingRight: 5,
                  color: 'rgba(0, 0, 0, 0.31)',
                }}
              >
                Camera {props.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.openShareAttachment('image')}
              style={{
                flexDirection: 'column',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <GallerySVG
                width={57}
              />


              <Text
                style={{
                  paddingTop: 4,
                  paddingRight: 5,
                  color: 'rgba(0, 0, 0, 0.31)',
                }}
              >
                {t('Chats_att_images')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.openShareAttachment('video')}
              style={{
                flexDirection: 'column',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <GallerySVG2
                width={57}
              />

              <Text
                style={{
                  paddingTop: 4,
                  paddingRight: 5,
                  color: 'rgba(0, 0, 0, 0.31)',
                }}
              >
                Video
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => props.openShareAttachment('audio')}
              style={{
                flexDirection: 'column',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <AudioSVG
                width={57}
              />

              <Text
                style={{
                  paddingTop: 4,
                  paddingRight: 5,
                  color: 'rgba(0, 0, 0, 0.31)',
                }}
              >
                Audio
              </Text>
            </TouchableOpacity> */}
          </View>

          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {props.source == 'group' ? (
              <TouchableOpacity
                onPress={() => {
                  props.setShowSelectContact(true);
                }}
                style={{
                  flexDirection: 'column',
                  margin: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >

                <ContactSVG
                  width={57}
                />

                <Text
                  style={{
                    paddingTop: 4,
                    paddingRight: 5,
                    color: 'rgba(0, 0, 0, 0.31)',
                  }}
                >
                  {t("Chats_att_contact")}
                </Text>
              </TouchableOpacity>
            ) : null}
            {/* <TouchableOpacity
              onPress={() => props.openShareAttachment('document')}
              style={{
                flexDirection: 'column',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <DocumentSVG
                width={57} />

              <Text
                style={{
                  paddingTop: 4,
                  paddingRight: 5,
                  color: 'rgba(0, 0, 0, 0.31)',
                }}
              >
                Document
              </Text>
            </TouchableOpacity> */}
            
          </View>
        </View>
      ) : null}
    </View>
  );
}
