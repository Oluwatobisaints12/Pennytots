import React from 'react';
// import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';


const Loader = (props: any) => {
  const { loading, ...attributes } = props;

  return (
    <>
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
      ) : null}
    </>
  );
};
export default Loader;
