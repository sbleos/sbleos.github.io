import { generateID } from '../../utils/utils'

export const createNotification = (notification) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      notification: {
        id: generateID(10),
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