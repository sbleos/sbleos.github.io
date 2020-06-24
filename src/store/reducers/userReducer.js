const userReducer = (state = {}, action) => {
  switch(action.type){
    case 'UPDATE_USER': return state;

    case 'CLUB_ACTIVE_YEARS': return {
      ...state,
      years: [...action.years]
    }

    default: return state;
  }
}

export default userReducer;