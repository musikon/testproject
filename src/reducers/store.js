import * as actionTypes from '../constants/StoreConstants';

const initialState = {
  data: []
};

export default function store(state = initialState, action) {
  const {
    type,
    data
  } = action;

  switch (type) {
    case actionTypes.INITIAL_CONSTANT:
      return {
        ...state,
        data
      };

    default:
      return state;
  }
}
