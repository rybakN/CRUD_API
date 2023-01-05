import { parseUrl } from './parseUrl.js';

export const checkURL = (url: string): boolean => {
  const urlArr: string[] = parseUrl(url);
  const correctUrl = ['api', 'users'];

  if (checkLength(urlArr)) {
    return urlArr[1] === correctUrl[0] && urlArr[2] === correctUrl[1];
  } else return false;
};

const checkLength = (urlArr: string[]): boolean => {
  if (urlArr.length === 3) {
    return true;
  } else return urlArr.length === 4;
};
