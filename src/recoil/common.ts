import { atom } from 'recoil';

export const activeItemState = atom<CompanyType>({
  key: 'activeItemState',
  default: undefined,
});

export const activeItemIdState = atom<string>({
  key: 'activeItemIdState',
  default: '',
});
