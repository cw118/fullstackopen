const Notification = ({ message, messageColor }) => {
  if (message === null) {
    return null;
  }

  const notifStyles = {
    color: messageColor,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notifStyles}>{message}</div>;
};

export default Notification;
