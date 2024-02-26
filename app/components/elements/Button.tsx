import React, { FunctionComponent } from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CustomText } from './Text';
import Ionicons from '@expo/vector-icons/Ionicons';
// import FastImage from 'react-native-fast-image';

type CustomButtonProps = {
  style?: TextStyle | TextStyle[];
  buttonTheme?: 'primary' | 'secondary' | 'tertiary';
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  textSize?: number;
};

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  buttonTheme = 'primary',
  style,
  label,
  icon,
  loading = false,
  disabled = false,
  onPress,
  textSize = 16,
}) => {
  let buttonStyle: {};
  let textStyle = {};

  switch (buttonTheme) {
    case 'primary':
      buttonStyle = loading ? styles.secondary : styles.primary;
      textStyle = styles.textPrimary;
      break;
    case 'secondary':
      buttonStyle = styles.secondary;
      textStyle = styles.textSecondary;
      break;
    case 'tertiary':
      buttonStyle = styles.tertiary;
      textStyle = styles.textTertiary;
      break;
    default:
      buttonStyle = loading ? styles.secondary : styles.primary;
      textStyle = styles.textPrimary;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!loading && !disabled) {
          onPress!();
        }
      }}
      style={{
        ...buttonStyle,
        height: 60,
        width: '100%',
        marginTop: 15,
        // marginBottom: 20,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        ...passedStyles,
      }}
    >
      {loading ? (
        <Image
          style={{
            width: 30,
            height: 30,
            alignSelf: 'center',
          }}
          source={require('app/assets/loading.gif')}
          // resizeMode={Image.resizeMode.contain}
        />
      ) : (
        <>
          <CustomText
            style={{
              ...textStyle,
              textAlign: 'center',
              fontSize: textSize,
              marginTop: 3,
              color: buttonTheme == 'secondary' ? 'gold' : 'black',
            }}
          >
            {label}
          </CustomText>

          {icon ? (
            <Ionicons
              name={icon}
              style={{
                marginLeft: 6,
              }}
              size={22}
              color={buttonTheme == 'secondary' ? 'gold' : 'black'}
            />
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'gold',
  },
  secondary: {
    backgroundColor: 'black',
  },
  tertiary: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gold',
  },
  textPrimary: {
    color: 'black',
  },
  textSecondary: {
    color: 'white',
  },
  textTertiary: {
    color: 'black',
  },
});
