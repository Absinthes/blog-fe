const baseCoefficient = 2;
const viewNumCoefficient = 1 * baseCoefficient;
const likesCoefficient = 2 * baseCoefficient;

export const computedHeat = (viewNum: number, likes: number) => {
  return viewNum * viewNumCoefficient + likes * likesCoefficient;
};
