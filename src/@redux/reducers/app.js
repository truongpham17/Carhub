import { defaultFunction } from 'Utils/common';
import { SET_POPUP_DATA, CANCEL_POPUP } from '@redux/constants/app';
import { ADD_LEASE_FAILURE } from '@redux/constants/lease';
import { CAR_CURRENTLY_LEASING } from 'Constants/errorCode';

const INITIAL_STATE = {
  popup: {
    title: '',
    description: '',
    onDecline: defaultFunction,
    onConfirm: defaultFunction,
    onClose: defaultFunction,
    modalVisible: false,
    popupType: null,
    grandResponder: false,
    acceptOnly: false,
  },
};

const TEST = {
  popup: {
    popupType: 'confirm',
    modalVisible: true,
    title: 'hello',
    description: 'hello',
    onConfirm(data) {
      console.log(data);
    },
    onDecline(data) {
      console.log(data);
    },
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_POPUP_DATA:
      return {
        ...state,
        popup: {
          grandResponder: false,
          popupType: 'confirm',
          modalVisible: true,
          ...action.payload,
        },
      };
    case CANCEL_POPUP:
      return { ...INITIAL_STATE };
    case ADD_LEASE_FAILURE:
      if (action.payload === CAR_CURRENTLY_LEASING) {
        return {
          ...state,
          popup: {
            title: 'Request denined!',
            description: 'Your car currently is on the leasing period',
            modalVisible: true,
            popupType: 'error',
            grandResponder: false,
          },
        };
      }
      return {
        ...state,
        popup: {
          title: 'Something went wrong!',
          description: 'Something went wrong, please try again!',
          modalVisible: true,
          popupType: 'error',
          grandResponder: false,
        },
      };

    default:
      return { ...state };
  }
};
