import { atom, DefaultValue, selector } from 'recoil';

const placeCollectionState = atom<Record<string, PlaceType>>({
  key: 'placeCollectionState',
  default: {},
});

export const placeSelector = selector<PlaceType[]>({
  key: 'placeSelector',
  get: ({ get }) => {
    const placeCol = get(placeCollectionState);
    return Object.values(placeCol);
  },
  set: ({ set }, payload) => {
    if (!payload || payload instanceof DefaultValue) {
      return;
    }

    const col = payload.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item,
      }),
      {}
    );

    set(placeCollectionState, col);
  },
});
