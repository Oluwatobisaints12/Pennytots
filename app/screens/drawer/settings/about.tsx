import { CustomText } from 'app/components/elements';
import React from 'react';
import { ScrollView, StatusBar, View, SafeAreaView } from 'react-native';
import HeaderTitle from 'app/components/HeaderTitle';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';

type AboutScreenProps = {
  navigation: any;
};

const About: React.FC<AboutScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const termsHTML = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  </head>
  <body style="font-size: 20px; line-height: 1.5em; max-width: 100%">
  <p><strong><span style="font-size: 26px;">${t(
    'AboutPennytots'
  )}</span></strong></p>
  <p>
  ${t('AboutPennytots_aboutText')}
  </p>
<p><a data-fr-linked="true" href="https://pennytots.com">www.pennytots.com</a></p>
<p><br></p>
  </body>
  </html>
  `;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView
        style={{ backgroundColor: '#ffffff' }}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle='dark-content' backgroundColor='white' />
        <HeaderTitle title='' navigation={navigation} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <WebView
            source={{ html: termsHTML }}
            style={{
              flex: 1,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
