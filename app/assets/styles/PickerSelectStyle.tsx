import { StyleSheet } from 'react-native';
import { default as themeFont } from '../themes/fonts.json';

export const PickerSelectStyle = StyleSheet.create({
  inputIOS: {
    fontFamily: 'regular',
    display: 'none',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // fontFamily: 'regular',
    fontSize: 16,
    marginLeft: 5,
    justifyContent: 'center',
    color: 'gray',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    // fontFamily: 'regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    // fontFamily: 'regular',
  },
  iconContainer: {
    top: 20,
    right: 15,
  },
  item: {
    color: 'red',
  },
});
