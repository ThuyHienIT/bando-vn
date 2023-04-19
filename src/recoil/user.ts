import { atom } from 'recoil';

export const userInfoState = atom<UserInfo | undefined>({
  key: 'userInfoState',
  default: undefined,
});
