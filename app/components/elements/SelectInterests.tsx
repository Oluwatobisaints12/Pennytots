import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomText } from '.';
import { GlobalContext } from 'app/GlobalProvider';
import { Axios } from 'app/api/axios';

type SelectInterestsProps =
  | {
      multiple: boolean;
      setInterests: any;
      interests: string[];
      interest?: string;
      setInterest?: any;
    }
  | {
      multiple?: never;
      setInterests?: any;
      interests?: string[];
      interest: string;
      setInterest: any;
    };

interface IInterestButtonProps {
  item: IInterest;
}

const SelectInterests: FunctionComponent<SelectInterestsProps> = ({
  setInterests,
  interests,
  setInterest,
  interest,
  multiple,
}) => {
  const [allInterests, setAllInterests] = useState<IInterest[]>([]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: '/tags/list',
    }).then((response: any) => {
      let interestData = JSON.parse(JSON.stringify(response.data.data));
      // code to make sure buisness to come first remove when not usefull
      interestData.sort((a:IInterest, b:IInterest) => {
        if (a.name.toLowerCase() === 'business') return -1; // a comes before b
        if (b.name.toLowerCase() === 'business') return 1; // b comes before a
        return 0; // no change in order for other cases
      });
      setAllInterests(interestData);
    });
  }, []);

  const toggleInterest = (id: string) => {
    if (multiple) {
      if (isInterestSelected(id)) {
        setInterests(interests!.filter((item) => item !== id));
      } else {
        setInterests((interests: string[]) => [...interests, id]);
      }
    } else {
      if (isInterestSelected(id)) {
        setInterest('');
      } else {
        setInterest(id);
      }
    }
  };

  const isInterestSelected = (id: string): boolean => {
    if (multiple) {
      const getIndex = interests!.findIndex((x: string) => x === id);
      return getIndex === -1 ? false : true;
    } else {
      return id === interest ? true : false;
    }
  };

  const InterestButton: FunctionComponent<IInterestButtonProps> = ({
    item,
  }): JSX.Element => {
    const isClickable = item.name.toLowerCase() === 'business';
    
    return (
      <TouchableOpacity
        onPress={() => toggleInterest(item._id)}
        
        style={{
          backgroundColor: isInterestSelected(item._id) ? 'black' : 'white',
          height: 55,
          marginTop: 1,
          marginBottom: 20,
          borderRadius: 30,
          padding: 7,
          paddingHorizontal: 30,
          borderWidth: 1,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
          marginRight: 4,
          opacity: 1,
        }}
      >
        <CustomText
          style={{
            color: isInterestSelected(item._id) ? 'white' : 'black',
            textAlign: 'center',
            fontSize: 14,
          }}
          textType={isInterestSelected(item._id) ? 'bold' : 'regular'}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{}}>
      <ScrollView horizontal={true}>
        <View
          style={{
            flexDirection: 'column',
            paddingVertical: 10,
          }}
        >
          {allInterests.slice(0, 6).map((item: IInterest, index) =>
            index % 2 === 0 ? (
              <View
                key={item._id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <InterestButton item={item} />
                {index + 1 < allInterests.length ? (
                  <InterestButton item={allInterests[index + 1]} />
                ) : null}
              </View>
            ) : null
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectInterests;
