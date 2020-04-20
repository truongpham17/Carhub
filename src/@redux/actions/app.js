import { SET_POPUP_DATA, CANCEL_POPUP } from '@redux/constants/app';

type PopupType = {
  title: String,
  description: String,
  onDecline: () => void,
  onConfirm: () => void,
  onClose: () => void,
  modalVisible: Boolean,
  popupType: 'success' | 'confirm' | 'error' | 'policy' | 'profile',
  grandResponder: Boolean,
  acceptOnly: Boolean,
  confirmLabel: String,
};

export const setPopUpData = dispatch => (data: PopupType) =>
  dispatch({ type: SET_POPUP_DATA, payload: data });

export const cancelPopup = dispatch => dispatch({ type: CANCEL_POPUP });
