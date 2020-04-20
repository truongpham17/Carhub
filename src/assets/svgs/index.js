import React from 'react';
import RemoveIcon from './RemoveIcon';
import Edit from './Edit';
import ArrowReturn from './ArrowReturn';
import X from './X';
import AddImage from './AddImage';
import Remove from './Remove';
import EditIcon from './EditIcon';
import Calendar from './Calendar';
import DownArrow from './DownArrow';
import Error from './Error';
import RightArrow from './RightArrow';
import MarkerIcon from './MarkerIcon';
import Tick from './Tick';
import SecurityDraw from './SecurityDraw';
import CarIcon from './CarIcon';
import CarIconSelected from './CarIconSelected';
import Discount from './Discount';
import SuccessStick from './SuccessStick';
import ErrorCheck from './ErrorCheck';
import NextIcon from './NextIcon';

export {
  RemoveIcon,
  Edit,
  ArrowReturn,
  X,
  Remove,
  AddImage,
  EditIcon,
  Calendar,
  DownArrow,
  Error,
  RightArrow,
  MarkerIcon,
  Tick,
  SecurityDraw,
  CarIcon,
  CarIconSelected,
  Discount,
  SuccessStick,
  ErrorCheck,
};

export function getSvg(svg, props) {
  switch (svg) {
    case 'next':
      return <NextIcon {...props} />;
    default:
      return null;
  }
}
