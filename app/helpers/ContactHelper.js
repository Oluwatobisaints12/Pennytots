
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';


const ContactHelper = {
  getAllContacts: async function () {
    try {
      const { status } = await Contacts.requestPermissionsAsync()

      if (status === 'granted') {
        const allContacts = await Contacts.getAll();
        return allContacts;
      } else {
        console.log('Permissions not granted to access Contacts');
        return [];
      }
    } catch (error) {
      console.log('Error getting contacts:', error);
      throw error;
    }
  },
  saveContacts: async function (contact) {
    try {
      await Contacts.openContactForm(contact);
      // showToast('Successfully added contact');
    } catch (error) {
      console.log('Error saving contact:', error);
    }
  },
};

export default ContactHelper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});