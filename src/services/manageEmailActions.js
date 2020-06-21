export const getMessages = () => {
  return (dispatch) => {
    MessagingApi.get('users/', {
      headers: {
        Authorization: getToken(),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getUserMessages(res)))
      .catch((err) => console.log('Something went wrong'));
  };
};
