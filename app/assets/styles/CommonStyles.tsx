import { StyleSheet } from 'react-native';
import { default as themeFont } from 'app/assets/themes/fonts.json';

export const CommonStyles = StyleSheet.create({
  inputField: {
    height: 60,
    borderRadius: 14,
    paddingLeft: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 15,
    borderStyle: 'solid',
    marginTop: 10,
    fontSize: 16,
  },
  editInputField: {
    borderBottomColor: 'gold',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  editInputColor: {
    borderBottomColor: '#E8E8E8',
    color: '#0D99FF',
  },
  topicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 5,
    padding: 20,
  },
});
