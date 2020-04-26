import { UserType } from 'types';
import { GENDERS } from 'Constants/app';
import { scaleVer } from 'Constants/dimensions';

const textContainer = {
  marginTop: scaleVer(12),
};

const getUserGender = gender => {
  if (gender) {
    const gender = GENDERS.find(item => item.key === gender);
    if (gender) {
      return gender.value;
    }
    return GENDERS[0].value;
  }
};

export function getData(user: UserType) {
  return [
    {
      label: 'Họ và tên',
      containerStyle: { marginTop: scaleVer(32) },
      value: user.fullName,
      key: 'fullName',
    },
    {
      label: 'Email',
      containerStyle: textContainer,
      value: user.email,
      key: 'email',
    },
    {
      label: 'Ngày sinh',
      containerStyle: textContainer,
      value: user.dateOfBirth,
      key: 'dateOfBirth',
      type: 'calendar',
    },
    {
      label: 'Giới tính',
      containerStyle: textContainer,
      value: getUserGender(user.gender),
      key: 'gender',
      type: 'dropdown',
      dropDownList: GENDERS,
      selectedItem: getUserGender(user.gender),
      placeholder: 'Select gender',
    },
  ];
}
