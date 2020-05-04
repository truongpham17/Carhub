import { HubType, CarModel, SharingType } from 'types';

export function formatData(
  carModels: [{ hub: HubType, carModel: CarModel }],
  sharingList: [SharingType]
) {
  const sharingInfos = sharingList.map(sharing => ({
    rentalType: 'SHARING',
    _id: sharing._id,
    image: sharing.rental.carModel.images[0],
    name: sharing.rental.carModel.name,
    type: sharing.rental.carModel.type,
    distance: sharing.distance,
    discount: 1 - sharing.price / sharing.rental.carModel.price,
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: `${sharing.rental.carModel.numberOfSeat} Passengers`,
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Sharing',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: `${sharing.rental.carModel.numberOfBag || 6} Bags`,
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: `${sharing.price}$/day`,
      },
    ],
  }));

  const carModelInfos = carModels
    .sort((a, b) => a.hub.distance - b.hub.distance)
    .map(info => ({
      // image: car.images,
      _id: info.carModel._id,
      rentalType: 'HUB',
      image: info.carModel.images[0],
      name: info.carModel.name,
      type: info.carModel.type,
      distance: info.hub.distance,
      rating: 3,
      configs: [
        {
          icon: 'users',
          type: 'passenger',
          value: `${info.carModel.numberOfSeat} Passengers`,
        },
        {
          icon: 'truck',
          type: 'provided',
          value: info.hub ? 'Provide hub' : 'Shared',
        },
        {
          icon: 'briefcase',
          type: 'bag',
          value: `${info.carModel.numberOfBag || 6} Bags`,
        },
        {
          icon: 'dollar-sign',
          type: 'price',
          value: `${info.carModel.price}$/day`,
        },
      ],
    }));

  return [...sharingInfos, ...carModelInfos];
}
