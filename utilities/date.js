import { OFFSET } from '../constants/constants.js';

export function getNPTDate() {
  const date = new Date();
  const NPT = new Date(date.getTime() - (OFFSET.NPT * 60 * 1000));
  const NPTDate = NPT.toISOString().split('T')[0];

  return {
    NPT,
    NPTDate,
  };
}
