import Toast from 'react-native-root-toast';

interface AlertMessageProps {
  message: string;
  type?: 'success' | 'error' | 'warn' | 'info';
  className?: string;
}

export const ShowAlert = ({ message, type,className }: AlertMessageProps) => {
  const toastOptions = {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: getBackgroundColor(type), // Set background color based on type
    textColor: '#fff', // Set text color to white
    onShow: () => {
      // Callback when toast appears
    },
    onShown: () => {
      // Callback when toast appears animation ends
    },
    onHide: () => {
      // Callback when toast hide animation starts
    },
    onHidden: () => {
      // Callback when toast hide animation ends
    },
  };

  Toast.show(message, toastOptions);
};

const getBackgroundColor = (type?: 'success' | 'error' | 'warn' | 'info') => {
  switch (type) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'warn':
      return 'orange';
    case 'info':
      return 'blue';
    default:
      return 'gray'; // Default color for unknown types
  }
};
