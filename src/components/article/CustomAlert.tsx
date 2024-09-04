interface CustomAlertProps {
  type: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, children }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getAlertStyle()}`}>
      {children}
    </div>
  );
};

export default CustomAlert;