import {
  View,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import BottomModal from '../bottom-modal';
import { CustomText } from './Text';
import { CommonStyles } from 'app/assets/styles';
import { CustomButton } from './Button';
import { useBuyCredit } from '../../redux/credit/hook';
import { useTranslation } from 'react-i18next';


const BuyCreditModal = ({ isOpen, setIsOpen, setPaymentLink }: any) => {

  const [amount, setAmount] = useState("100");
  const { mutateAsync: buy, isLoading } = useBuyCredit();
  const { t } = useTranslation();

  const credits: string = useMemo(() => {
      if (!amount) {
          return "0";
      }

      return (parseInt(amount) * 20).toString();;
  }, [amount])



  async function proceed() {
      if (parseInt(credits) < 2000) {
          alert('A minimum of 2000 Pennytots can be bought at a time');
          return
      }


      let payload = {
          amount
      }

      buy(payload).then((response) => {
          console.log(response.data.data.link, 'payment response data');

          setPaymentLink(response.data.data.link)
          setIsOpen(false);
      })

  }

  return (
      <BottomModal isOpen={isOpen} setIsOpen={setIsOpen} height={rv(400)}>
          <View style={{
              flex: 1,
              padding: rv(15),
              paddingHorizontal: rv(20),
              flexDirection: 'column',
              backgroundColor: 'white'
          }}>

              <CustomText
                  style={{
                      color: '#797978',
                      fontSize: 18,
                      marginBottom: 10,
                  }}
                  textType='semi-bold'
              > {t("Credits_purchasePennytots")}
              </CustomText>

              <View
                  style={{
                      flex: 1,
                      flexDirection: 'column',
                      // marginTop: rv(5),
                  }}
              >
                  <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                  }}>
                      <View style={{
                          width: '40%'
                      }}>
                          <TextInput
                              style={{
                                  ...CommonStyles.inputField,
                                  marginBottom: 0
                              }}
                              onChangeText={(text: any) => {
                                  setAmount(text);
                              }}
                              inlineImageLeft='callplain'
                              placeholder='Pennytots'

                              keyboardType='phone-pad'
                              value={amount}

                          />
                      </View>


                      <View style={{
                          width: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}>
                          <CustomText
                              style={{
                                  color: '#797978',
                                  fontSize: 40,
                                  marginLeft: -15
                              }}
                              textType='semi-bold'
                          >  =
                          </CustomText>
                      </View>

                      <View style={{
                          width: '40%'
                      }}>

                          <TextInput
                              style={{
                                  ...CommonStyles.inputField,
                                  marginBottom: 0
                              }}
                              inlineImageLeft='callplain'
                              placeholder={t('LoginPage_PhoneNumber')}
                              keyboardType='phone-pad'
                              value={credits}
                          // editable={false}
                          />
                      </View>
                  </View>

                  <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5
                  }}>
                      <CustomText
                          style={{
                              color: '#797978',
                              fontSize: 18,
                              marginBottom: 20,
                          }}
                          textType='semi-bold'
                      > Naira
                      </CustomText>

                      <CustomText
                          style={{
                              color: '#797978',
                              fontSize: 18,
                              marginBottom: 20,
                          }}
                          textType='semi-bold'
                      > Pennytots
                      </CustomText>


                  </View>

                  <View style={{
                      width: '90%'
                  }}>
                      <CustomText
                          style={{
                              color: '#797978',
                              fontSize: rv(13),
                              marginBottom: 10,
                          }}
                      > Minimum of 2,000 Pennytots can be bought at a time
                          {'\n'}
                          100 Naira = 2,000 Pennytots
                      </CustomText>
                  </View>


                  <CustomButton
                      label={t('Credits_proceedBtn')}
                      onPress={() => {
                          proceed();
                      }}
                      buttonTheme="primary"
                      style={{
                          borderRadius: 14,
                          // height: 50
                      }}
                      loading={isLoading}
                  />

              </View>


          </View>



      </BottomModal>
  );
};

export default BuyCreditModal;
