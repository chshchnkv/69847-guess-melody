/**
 * Пример вызова getPluralString(value, 'фотографий', 'фотографии', 'фотография')
 * @function
 * @param {number} count
 * @param {string} of10to20
 * @param {string} of2to4
 * @param {string} of1
 * @param {string} [ofElse = of10to20]
 * @return {string}
 */
export default (count, of10to20, of2to4, of1, ofElse = of10to20) => {
  const countMod10 = count % 10;
  const countMod100 = count % 100;

  if (countMod100 >= 10 && countMod100 <= 20) {
    return of10to20;
  } else if (countMod10 >= 2 && countMod10 <= 4) {
    return of2to4;
  } else if (countMod10 === 1) {
    return of1;
  }
  return ofElse;
};
