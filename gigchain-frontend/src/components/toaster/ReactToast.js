import toast from 'react-hot-toast';

const notifyToaster = (title, msg, promise) => {
  const key = title.toLowerCase();
  switch (key) {
    case 'success':
      toast.success(msg);
      break;
    case 'error':
      toast.error(msg);
      break;
    default:
      toast.success(msg);
  }
};
export default notifyToaster;
