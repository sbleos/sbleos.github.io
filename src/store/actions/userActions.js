import { getFiscalYear, getDateArray, isActive } from '../../utils/utils'

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
    }).then(years => {
        dispatch({type: 'CLUB_ACTIVE_YEARS', years})
    }).catch(error => {
      dispatch({type: 'CLUB_ACTIVE_YEARS_ERROR', error})
    })


  }
};

export const getActiveMembership = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection("users").get().then(querySnapshot => {
      var years = new Set(),
      userActivity = [];
      querySnapshot.forEach(userDoc => {
        var user = userDoc.data();


        years.add(user["start"])

        var start = parseInt(user["start"].split("-")[0]),
        end = user["end"] !== "" ? parseInt(user["end"].split("-")[1]) : parseInt(getFiscalYear(new Date()).split("-")[1]);

        userActivity.push({ joinDate: new Date(user["joinDate"]), end });

        for(start; start !== end; start++)
          years.add(`${start}-${start+1}`)

      })

      return { years: [...years], userActivity }
    }).then(({ years, userActivity }) => {
        const startDate = new Date(Math.min(...userActivity.map(({ joinDate }) => joinDate)));
        const dates = getDateArray(startDate);

        const activeMembership = dates.reduce((obj, date) =>{
          var activeMembers = 0;
          userActivity.forEach(({ joinDate, end }) => activeMembers += isActive(joinDate, end, date)); // javascript treats true as 1 and false as 0

          if(obj.length === 0 || obj[obj.length - 1].y !== activeMembers) // not the same number of active members as the element before so it only shows the change in membership
            obj.push({ x: date, y: activeMembers });

          return obj;
          }, [])

        return activeMembership;
    }).then(activeMembership => {
        dispatch({type: 'ACTIVE_MEMBERSHIP', activeMembership})
    }).catch(error => {
      dispatch({type: 'ACTIVE_MEMBERSHIP_ERROR', error})
    })


  }
};