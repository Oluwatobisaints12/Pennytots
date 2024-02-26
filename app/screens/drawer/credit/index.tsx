import {
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderTitle from 'app/components/HeaderTitle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomButton, CustomText } from 'app/components/elements';
import BuyCreditModal from 'app/components/elements/buy-credit-modal';
import { ShowAlert } from 'app/providers/toast';
import { MAIN_URL } from 'app/api/axios';
import {
  useGetCredit,
  useGetCreditTransactionHistory,
} from 'app/redux/credit/hook';
import { queryClient } from 'app/redux/user/hooks';
import WebView from 'react-native-webview';
import { responsiveValue as rv } from 'app/providers/responsive-value';
import moment from 'moment';
import { useGetFreeCredit } from '../../../redux/credit/hook';
import { formatAmount } from 'app/helpers/formatAmout';
import { useTranslation } from 'react-i18next';

const CreditScreen = ({ navigation }: any) => {
  const [showBuyCredit, setShowBuyCredit] = useState(false);
  const { data: credits, isLoading, refetch } = useGetCredit();
  const {
    data: transactionHistory,
    isLoading: creditHistoryLoading,
    refetch: refetchHistory,
  } = useGetCreditTransactionHistory();
  const [paymentLink, setPaymentLink] = useState<string>('');
  const { mutate: getFreeCredit, isLoading: freeCreditLoading } =
    useGetFreeCredit();

  const { t } = useTranslation();
  function processPaymentError(error: any) {
    const { nativeEvent } = error;

    setPaymentLink('');

    // if (nativeEvent && nativeEvent.code === -6) {
    //     setPaymentLink('');

    // }

    console.log('WebView error: ', nativeEvent);
  }

  function watchPaymentProcess(data: any) {
    console.log(data, '== watching');

    if (data.url.includes(`${MAIN_URL}/success?status=successful`)) {
      setPaymentLink('');

      ShowAlert({
        type: 'success',
        className: 'success',
        message: 'Payment was successful, Your credits will be updated shortly',
      });

      setTimeout(() => {
        queryClient.invalidateQueries(['credit', 'credit-transaction-history']);
      }, 3000);
    }

    if (data.url.includes(`${MAIN_URL}/success?status=cancelled`)) {
      setPaymentLink('');
      ShowAlert({
        type: 'error',
        className: 'error',
        message: 'Payment was cancelled',
      });
    }
  }
  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      {paymentLink ? (
        <WebView
          source={{ uri: paymentLink }}
          scalesPageToFit
          onError={processPaymentError}
          onNavigationStateChange={watchPaymentProcess}
        />
      ) : (
        <View
          style={{
            backgroundColor: '#ffffff',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <HeaderTitle title={t('Credits_Title')} navigation={navigation} />

          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Purchase credit */}

            <FlatList
              contentContainerStyle={{
                backgroundColor: '#ffffff',
                flex: 1,
                flexDirection: 'column',
                paddingHorizontal: rv(20),
              }}
              data={credits ? [credits] : []}
              keyExtractor={() => 'credits'}
              refreshing={isLoading}
              onRefresh={refetch}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: '100%',
                  }}
                >
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center' }}
                  >
                    <CustomText
                      style={{
                        color: '#797978',
                        fontSize: 15,
                      }}
                      textType='semi-bold'
                    >
                      {t('Credits_balance')}
                    </CustomText>
                    {item ? (
                      <CustomText
                        style={{
                          color: '#797978',
                          fontSize: 40,
                        }}
                        textType='semi-bold'
                      >
                        {formatAmount(item.amount)}
                      </CustomText>
                    ) : null}
                    <CustomButton
                      label={t('Credits_purchase')}
                      onPress={() => {
                        setShowBuyCredit(true);
                      }}
                      buttonTheme='primary'
                      style={{
                        borderRadius: 10,
                      }}
                    />
                    <CustomButton
                      label={t('Credits_free')}
                      onPress={() => {
                        getFreeCredit();
                      }}
                      buttonTheme='tertiary'
                      style={{
                        borderRadius: 10,
                      }}
                      loading={freeCreditLoading}
                    />
                  </View>
                </View>
              )}
            />
            <View
              style={{
                flexDirection: 'column',
                // marginTop: 20,
                height: '55%',
                width: '100%',
                paddingHorizontal: rv(20),
              }}
            >
              <CustomText
                style={{
                  color: '#797978',
                  fontSize: rv(14),
                  marginBottom: 20,
                }}
                textType='semi-bold'
              >
                {' '}
                {t('Credits_History')}
              </CustomText>

              {transactionHistory && (
                <FlatList
                  data={transactionHistory}
                  keyExtractor={(item, index) => item._id}
                  onRefresh={refetchHistory}
                  refreshing={creditHistoryLoading}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'column',
                        }}
                      >
                        <View
                          style={{
                            marginTop: rv(5),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CustomText
                            style={{
                              color: '#797978',
                              fontSize: 14,
                              marginBottom: 5,
                            }}
                            textType='semi-bold'
                          >
                            {moment(item.updatedAt).format('DD/MM/YYYY')}
                          </CustomText>

                          <CustomText
                            style={{
                              color: 'black',
                              fontSize: 18,
                              marginBottom: 5,
                            }}
                            textType='semi-bold'
                          >
                            {' '}
                            {item.data
                              ? item.data.pennytots_added
                              : item.amount}
                          </CustomText>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CustomText
                            style={{
                              color: '#797978',
                              fontSize: 14,
                              marginBottom: 20,
                            }}
                            textType='semi-bold'
                          >
                            {' '}
                            {item?.source === 'admin'
                              ? 'Admin top up'
                              : 'Purchase'}
                          </CustomText>

                          <CustomText
                            style={{
                              color: '#797978',
                              fontSize: 14,
                              marginBottom: rv(20),
                            }}
                            textType='semi-bold'
                          >
                            {' '}
                            Status: {item.status}
                          </CustomText>
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </View>

            {showBuyCredit ? (
              <BuyCreditModal
                isOpen={showBuyCredit}
                setIsOpen={setShowBuyCredit}
                setPaymentLink={setPaymentLink}
              />
            ) : null}
          </View>
        </View>
      )}
    </>
  );
};

export default CreditScreen;
