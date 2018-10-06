module.exports = function solveSudoku(matrix) {
  let point = null;
  outer: for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrix[y][x] === 0) {
        point = { x, y };

        break outer;
      }
    }
  }

  if (!point) {
    return matrix;
  }

  const { x, y } = point;

  const row = getRow(matrix, point);
  const column = getColumn(matrix, point);
  const square = getSquare(matrix, point);

  const missings = getMissing([...row, ...column, ...square]);

  for (let i = 0; i < missings.length; i++) {
    matrix[y][x] = missings[i];
    const result = solveSudoku(matrix);

    if (result) {
      return result;
    }
  }

  matrix[y][x] = 0;
  return null;
}

const fullRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const getMissing = (values) => fullRow.filter(i => !values.includes(i));

const getSquare = (matrix, { x, y }) => {
  const startX = Math.floor(x / 3) * 3;
  const endX = startX + 3;
  const startY = Math.floor(y / 3) * 3;

  return [
    ...matrix[startY].slice(startX, endX),
    ...matrix[startY + 1].slice(startX, endX),
    ...matrix[startY + 2].slice(startX, endX),
  ];
};
const getRow = (matrix, { y }) => matrix[y];
const getColumn = (matrix, { x }) => matrix.reduce((acc, cur) => acc.concat([cur[x]]), []);