const initState = {
  notifications: []
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.notification
        ]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(item => item.id !== action.id)
      };
    default: return state;
  }
}

export default notificationReducer;