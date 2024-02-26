import React, { FunctionComponent, useMemo } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';


interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  textType?: 'light' | 'regular' | 'bold' | 'semi-bold' | 'extra-bold';
  children: any;
  onPress?: () => void
}

export const CustomText: FunctionComponent<CustomTextProps> = ({
  children,
  textType,
  style,
  ...rest
}) => {

  const textStyle = useMemo(() => {
    switch (textType) {
      case 'regular':
        return styles.regular;
      case 'bold':
        return styles.bold;
      case 'extra-bold':
        return styles.extraBold;
      case 'semi-bold':
        return styles.semiBold;
      default:
        return styles.regular;
    }
  }, [textType]);

  const passedStyles = useMemo(() => StyleSheet.flatten(style || {}), [style]);

  return (
    <Text
      // adjustsFontSizeToFit={true}
      // numberOfLines={2}
      // ellipsizeMode='tail'
      style={[textStyle, passedStyles]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'regular',
  },
  bold: {
    fontFamily: 'bold',
  },
  extraBold: {
    fontFamily: 'extraBold',
  },
  semiBold: {
    fontFamily: 'semiBold',
  },
  black:{
    fontFamily: 'black'
  },
  italic:{
    fontFamily: 'italic'
  }
});
