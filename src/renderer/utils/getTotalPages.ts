/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-else-return */
const getTotalPages = (totalItems: number, pageLimit: number = 10) => {
  if (totalItems % pageLimit !== 0) {
    return Math.floor(totalItems / pageLimit) + 1;
  } else {
    return totalItems / pageLimit;
  }
};

export default getTotalPages;
