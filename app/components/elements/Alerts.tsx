import React, { FunctionComponent } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { CustomText } from './Text';

type AlertProps = {
  children: React.ReactNode;
};

export const Alerts: FunctionComponent<AlertProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <View style={[styles.sheet]}>
        <Animated.View style={[styles.popup]}>
          <TouchableOpacity>
            <CustomText>Brox12</CustomText>
          </TouchableOpacity>
        </Animated.View>
      </View> */}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // rest remains same

  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
