const profileReducer = (state = {}, action) => {
  switch(action.type){
    case 'UPDATE_PROFILE': return state;

    default: return state;
  }
}

export default profileReducer;