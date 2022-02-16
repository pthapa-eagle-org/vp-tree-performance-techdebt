import { ActionConstants } from "../actions/progressBarActions";

const initialState = {
  progressBarData: { "buttons": [43, 27, -33, -26], "bars": [42, 37, 65], "limit": 130 }
}

export default function ProgressBarReducer(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.DATA_RECEIVED:
      return { ...state, progressBarData: action.value };
    case ActionConstants.SELECTED_PROGRESSBAR:
      return { ...state, selectProgressBar: action.value };

    default:
      return state;
  }
}