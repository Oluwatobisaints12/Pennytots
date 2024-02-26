import React from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CameraHelper, FileSelectHelper } from 'app/helpers';
import { CustomText } from 'app/components/elements';

type SelectImageProps = {
  setImage: any;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};

export default function SelectImageDialog(props: SelectImageProps) {
  async function selectCamera() {
    let file: string = await CameraHelper.openCamera();
    if (file) {
      props.setImage(file);
      props.setShow(false);
    }
  }

  async function selectFromGallery() {
    let file = await CameraHelper.selectImageFromGallery()
    if (file) {
      props.setImage(file);
      props.setShow(false);
    }
  }

  async function selectFromFiles() {
    let file = await FileSelectHelper()
    if (file) {
      props.setImage(file);
      props.setShow(false);
    }
  }

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.show}
      onRequestClose={() => {
        props.setShow(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <CustomText
            style={{
              fontSize: 15,
            }}
            textType='bold'
          >
            Select Image
          </CustomText>
          <TouchableOpacity
            onPress={selectCamera}
            style={{
              marginTop: 20,
            }}
          >
            <CustomText
              style={{
                fontSize: 15,
              }}
            >
              Take Photo...
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 20,
              marginTop: 20,
            }}
            onPress={selectFromGallery}
          >
            <CustomText
              style={{
                fontSize: 15,
              }}
            >
              Choose from Library
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 20,
              marginTop: 20,
            }}
            onPress={selectFromFiles}
          >
            <CustomText
              style={{
                fontSize: 15,
              }}
            >
              Choose from Files
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 'auto',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={() => props.setShow(false)}>
              <CustomText
                style={{
                  fontSize: 15,
                }}
                textType='bold'
              >
                CANCEL
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: wp('55%'),
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    padding: '7%',
    flexDirection: 'column',
  },
});
