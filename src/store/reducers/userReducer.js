const userReducer = (state = {}, action) => {
  switch(action.type){
    case 'UPDATE_USER': return state;

    case 'CLUB_ACTIVE_YEARS': return {
      ...state,
      years: [...action.years]
    }

    case 'ACTIVE_MEMBERSHIP': return {
      ...state,
      activeMembership: action.activeMembership
    }

    default: return state;
  }
}

export default userReducer;