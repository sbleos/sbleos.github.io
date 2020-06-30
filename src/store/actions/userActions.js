import { getFiscalYear } from '../../utils/utils'

export const updateUser = (updatedUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    var dues = Object.keys(updatedUser)
                          .filter(attr => attr.indexOf("dues-") === 0)
                          .reduce((obj,key) => {
                            if(updatedUser[key]) {
                              let num = +updatedUser[key];
                              if(isNaN(updatedUser[key]) && updatedUser[key].trim() !== "")
                                obj[key.replace("dues-","")] = updatedUser[key].replace("$","");
                              else if(num > 0)
                                obj[key.replace("dues-","")] = num;
                            }
                            delete updatedUser[key];
                            return obj;
                          }, {})

    updatedUser = {
      ...updatedUser,
      dues
    }

    firestore.collection('users').doc(updatedUser.id).update(updatedUser)
    .then(() => {
      dispatch({type: 'UPDATE_USER', updatedUser})
    }).catch(error => {});
  }
};

export const getYears = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection("users").get().then(querySnapshot => {
      var years = new Set()
      querySnapshot.forEach(userDoc => {
        var user = userDoc.data()

        years.add(user["start"])

        var start = parseInt(user["start"].split("-")[0]),
        end = user["end"] !== "" ? parseInt(user["end"].split("-")[1]) : parseInt(getFiscalYear(new Date()).split("-")[1]);

        for(start; start !== end; start++)
          years.add(`${start}-${start+1}`)

      })
      return years
    }).then((years) => {
        dispatch({type: 'CLUB_ACTIVE_YEARS', years})
    }).catch(error => {
      dispatch({type: 'CLUB_ACTIVE_YEARS_ERROR', error})
    })


  }
};