import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ContactHelper  from 'app/helpers/ContactHelper';

export default function SelectContact(props: any) {
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    async function loadContacts() {
      if (props.show) {
        let getContacts = await ContactHelper.getAllContacts();
        setContacts(getContacts);
      }
    }

    loadContacts();
  }, [props.show]);

  function SelectContact(contact: any) {
    props.setContact(JSON.stringify(contact));
    props.setShow(false);
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Select Contact
          </Text>

          <View style={{ flex: 1 }}>
            <FlatList
              data={contacts}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginVertical: 7,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      SelectContact(item);
                    }}
                  >
                    <Image
                      source={require('app/assets/user.jpg')}
                      style={{
                        width: wp('15%'),
                        height: hp('7.5%'),
                        borderRadius: wp('7%'),
                        borderColor: 'white',
                        borderWidth: wp('0.6%'),
                      }}
                    />
                    <View
                      style={{ flexDirection: 'column', marginHorizontal: 8 }}
                    >
                      <Text
                        style={{
                          marginVertical: 4,
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        {item.displayName}
                      </Text>
                      <Text style={{ color: 'rgba(0, 0, 0, 0.31)' }}>
                        {item.phoneNumbers && item.phoneNumbers.length > 0
                          ? item.phoneNumbers[0].number
                          : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View
            style={{
              marginTop: 'auto',
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={() => props.setShow(false)}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                CANCEL
              </Text>
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
    height: wp('100%'),
    width: '90%',
    borderRadius: 10,
    display: 'flex',
    padding: '7%',
    flexDirection: 'column',
  },
});
