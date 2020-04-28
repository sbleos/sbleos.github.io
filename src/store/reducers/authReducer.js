const initState = {
  authError: null,
  emailVerificationError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return{
        ...state,
        authError: null
      }

    case 'LOGIN_ERROR':
      return{
        ...state,
        authError: action.error.message
      }

    case 'SIGNOUT_SUCCESS': return state;

    case 'SIGNUP_SUCCESS':
      return{
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      return{
        ...state,
        authError: action.error.message
      }

    case 'EMAIL_VERIFICATION_SUCCESS':
      return{
        ...state,
        emailVerificationError: null
      }

    case 'EMAIL_VERIFICATION_ERROR':
      return{
        ...state,
        emailVerificationError: action.error.message
      }


    default: return state;
  }
}

export default authReducer;