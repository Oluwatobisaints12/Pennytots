import { View, Text, StyleSheet } from 'react-native';
import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTheme } from 'react-native-paper';
import { responsiveValue as rv } from 'app/providers/responsive-value';

interface IBottomModal {
    isOpen: any;
    setIsOpen: any;
    children: any;
    height: number;
    closeOnDragDown?: boolean;
}


const BottomModal = ({
    isOpen,
    setIsOpen,
    children,
    height,
    closeOnDragDown = true,
}: IBottomModal) => {

    const modalRef = useRef<any>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current.open();
        }
    }, [isOpen]);

    return (
        <RBSheet
            ref={modalRef}
            closeOnDragDown={closeOnDragDown}
            closeOnPressMask={true}
            height={height}
            customStyles={{
                wrapper: {
                    // backgroundColor: 'transparent',
                },
                container: {
                    borderTopLeftRadius: rv(15),
                    borderTopRightRadius: rv(15),
                    backgroundColor: 'white',
                },
                draggableIcon: {
                    backgroundColor: 'white',
                },
            }}
            onClose={() => setIsOpen(false)}
        >
            {children}
        </RBSheet>
    );
};

export default BottomModal;
