export const findMyDataInArray = (arr: any[], myData: any) => {
  return arr.find((x: any) => x.username === myData.username);
};
