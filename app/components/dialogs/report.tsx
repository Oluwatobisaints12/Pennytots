import React, { useContext, useState } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { CustomText, CustomButton } from '../elements';
import { useReportUser } from 'app/redux/user/hooks';
import { useReport } from 'app/hooks/useReport';

type reportTypes = 'user' | 'comment' | 'group' | 'topic';

type ReportDialogProps = {
  reportDetails: {
    type?: reportTypes;
    data: {
      _id: string;
      description?:string;
    };
  } | any;
  setShow: any;
  show: boolean;
};

type reportCategories = 'spam' | 'harassment' | 'deceit';

export default function ReportDialog(props: ReportDialogProps) {
  const [spam, setSpam] = useState(false);
  const [harassment, setHarassment] = useState(false);
  const [deceit, setDeceit] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(props.reportDetails,"Here")
  const { report, isLoading } = useReport(props.reportDetails.type);
  
  
  const reportEntity = async () => {
    setLoading(true);

    try {
      // Call the report function with the appropriate payload
      const payload = {
        _id: props.reportDetails.data._id, // Replace with the actual user ID
        description: props.reportDetails.data.description,
      };

      await report(props.reportDetails.data);
      props.setShow(false);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  function onCheckChanged(data: reportCategories) {
    if (data == 'spam') {
      setSpam(!spam);
    } else if (data == 'harassment') {
      setHarassment(!harassment);
    } else if (data == 'deceit') {
      setDeceit(!harassment);
    }
  }

  return (
    <View>
      {props.reportDetails && props.reportDetails.data ? (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={props.show}
          onRequestClose={() => {
            props.setShow(false);
          }}
          style={{
            height: '80%',
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <CustomText
                  style={{
                    fontSize: 15,
                    textTransform: 'capitalize',
                  }}
                  textType='bold'
                >
                  Report {props.reportDetails.type}
                </CustomText>

                <TouchableOpacity onPress={() => props.setShow(false)}>
                  <Ionicons name='close-circle' color={'grey'} size={18} />
                </TouchableOpacity>
              </View>
              <CustomText
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Tell us why you are reporting
              </CustomText>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CustomText>Spam</CustomText>
                  <View style={{ marginRight: -28 }}>
                    <Checkbox
                      key={1}
                      // checked={spam}
                      value={spam}
                      onValueChange={()=>onCheckChanged('spam')}
                      color={spam ? "gold" : undefined}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CustomText>Harassment</CustomText>
                  <View style={{ marginRight: -28 }}>
                    <Checkbox
                      key={1}
                      value={harassment}
                      onValueChange={()=>onCheckChanged('harassment')}
                      color={spam ? "gold" : undefined}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CustomText>Deceit</CustomText>
                  <View style={{ marginRight: -28 }}>
                    <Checkbox
                       key={1}
                       value={deceit}
                       onValueChange={()=>onCheckChanged('deceit')}
                       color={spam ? "gold" : undefined}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingBottom: 20,
                }}
              >
                <CustomButton
                  label={`Report ${props.reportDetails.type}`}
                  onPress={() => {
                    reportEntity()
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
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
    height: wp('95%'),
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    padding: '7%',
    flexDirection: 'column',
  },
  splashbtn: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    width: 250,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 30,
    paddingTop: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 14,
    textAlign: 'center',
    color: 'gold',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
  },
});
