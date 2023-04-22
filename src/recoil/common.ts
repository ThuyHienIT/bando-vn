import { atom, selector } from 'recoil';

import { userInfoState } from './user';

export const activeItemState = atom<CompanyType>({
  key: 'activeItemState',
  default: undefined,
});

export const activeItemIdState = atom<string>({
  key: 'activeItemIdState',
  default: '',
});

export const activeAttractionTypeState = atom<string>({
  key: 'activeAttractionTypeState',
  default: '',
});

export const clearSessionSelector = selector({
  key: 'clearSessionSelector',
  get: () => null,
  set: ({ reset }) => {
    reset(activeItemState);
    reset(activeItemIdState);
    reset(activeAttractionTypeState);
    reset(userInfoState);
  },
});
