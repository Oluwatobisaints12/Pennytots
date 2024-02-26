import React, { useState } from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { Country as CountryType } from '../types/types';
import { CountryCode } from '../types/types';
import { Picker } from '@react-native-picker/picker';
import { CustomText } from './elements';

interface CustomCountryPickerProps {
  onCountrySelect: (countryCode: string) => void;
}


const CustomCountryPicker: React.FC<CustomCountryPickerProps> = ({
  onCountrySelect,
}) => {
  const [countryCode, setCountryCode] = useState('234')
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setCountryCode(country.callingCode[0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.countryCodeText}>
        +{selectedCountry ? selectedCountry.callingCode[0] : '234'}
      </Text>
      {selectedCountry && (
        <Image
          style={styles.flagImage}
          source={{ uri: selectedCountry.flag }}
        />
      )}
      <CountryPicker
        withCallingCode
        withFilter
        withFlag
        onSelect={handleCountryChange}
        countryCode={selectedCountry ? selectedCountry.cca2 : 'NG'}
        containerButtonStyle={styles.countryPickerContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: {
    marginLeft: 7,
    fontSize: 16,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginLeft: -30,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default CustomCountryPicker;
