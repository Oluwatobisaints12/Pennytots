import { View, Text, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CommonStyles } from 'app/assets/styles';
import { default as themeFont } from 'app/assets/themes/fonts.json';

interface ISelectData {
  label: string;
  value: string;
}

interface ISelect {
  data: ISelectData[];
  value: any;
  search?: boolean;
  style?: ViewStyle;
  onSelect: (value: string, index: number) => void;
}

const Select = ({
  data,
  value,
  onSelect,
  search,
  style = {},
  ...rest
}: ISelect) => {
  const selectedIndex = useMemo(() => {
    if (value) {
      let index = data.findIndex((item) => item.value == value);

      if (index != -1) {
        return index;
      }

      return undefined;
    } else {
      return undefined;
    }
  }, [value]);

  return (
    <SelectDropdown
      data={data}
      defaultValueByIndex={selectedIndex}
      onSelect={(selectedItem: ISelectData, index: number) =>
        onSelect(selectedItem.value, index)
      }
      buttonTextAfterSelection={(selectedItem: ISelectData, index: number) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(selectedItem: ISelectData, index: number) => {
        return selectedItem.label;
      }}
      // renderDropdownIcon={(isOpened: boolean) => {
      //     return (
      //         <Icon
      //             name={isOpened ? 'chevron-up' : 'chevron-down'}
      //             size={15}
      //             color='gray'
      //         />
      //     );
      // }}

      dropdownIconPosition={'right'}
      buttonStyle={{
        ...CommonStyles.inputField,
        width: '100%',
        ...style,
      }}
      buttonTextStyle={{
        fontFamily: "regular",
        fontSize: 14,
        color: '#696969',
        borderWidth: 0,
      }}
      rowTextStyle={{
        fontFamily: "regular",
        fontSize: 13,
        borderWidth: 0,
      }}
      rowStyle={{
        borderBottomWidth: 0,
      }}
      search={search}
      {...rest}
    />
  );
};

export default Select;
