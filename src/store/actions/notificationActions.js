export const createNotification = (notification) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      notification: {
        id: parseInt(Math.random().toString().split('.')[1], 10),
        ...notification,
      }
    })
  }
};

export const removeNotification = (id) => {
  return (dispatch, getState) => {
    dispatch({type: 'REMOVE_NOTIFICATION', id})
  }
};