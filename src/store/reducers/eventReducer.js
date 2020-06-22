const eventReducer = (state = {}, action) => {
  switch(action.type){
    case 'CREATE_EVENT': return state;

    case 'CREATE_PROJECT_ERROR': return state;

    case 'UPLOAD_EVENT_IMAGE_SUCCESS': return state;

    case 'UPLOAD_EVENT_IMAGE_ERROR': return state;

    case 'UPDATE_EVENT': return state;

    case 'UPDATE_EVENT_ERROR': return state;

    case 'DELETE_EVENT': return state;

    case 'DELETE_EVENT_ERROR': return state;

    case 'GET_USER_IN_FISCAL_YEAR':
      return {
        ...state,
        users: [
          ...state.users || [],
          action.user
        ]
      }

    case 'RESET_USER_IN_FISCAL_YEAR':
      return {
        ...state,
        users: null
      }

    default: return state;
  }
}

export default eventReducer;

/*
{
  events: [
    {
      title: "Covid-19 Appreciation",
      date: "4/28/20 11:00 am",
      description: "Our Leos are writing a message to South Brunswick First responders and hanging it up on the Municipal Building!",
      type: "community",
      imgsrc: require("../../assets/logos/humanitarian.png"),
      imgDescription: "Humanitarian"
    },
    {
      title: "Covid-19 Relief",
      date: "4/30/20 12:00 pm",
      description: "We are raising money on a GoFundMe for those in need during this situation. We are hoping for everyone to show their thanks to their local hospitals, food banks, etc for getting us through these difficult times.",
      type: "community",
      imgsrc: require("../../assets/logos/humanitarian.png"),
      imgDescription: "Humanitarian",
      formLink: "https://charity.gofundme.com/",
      formDescription:"GoFundMe (Not Set up Yet)"
    }
  ]
}
*/