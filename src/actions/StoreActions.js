import * as actionTypes from '../constants/StoreConstants';

import fetchJsonp from 'fetch-jsonp'

export function storeActions(id, language) {
  return dispatch => {
    setTimeout(() => {
      fetchJsonp('https://itunes.apple.com/lookup?country='+language+'&id='+id)
      //763692274 606870241
        .then(function(response) {
          return response.json()
        }).then(function(json) {
        dispatch({
          type: actionTypes.INITIAL_CONSTANT,
          data: json.results[0]
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }, 0);
  };

}
