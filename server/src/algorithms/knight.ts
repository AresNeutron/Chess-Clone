const knightMovements = (
  xAxis: number,
  yAxis: number,
) => {
  const moves = [
    { y: yAxis + 2, x: xAxis + 1 },
    { y: yAxis + 1, x: xAxis + 2 },
    { y: yAxis + 2, x: xAxis - 1 },
    { y: yAxis + 1, x: xAxis - 2 },
    { y: yAxis - 2, x: xAxis - 1 },
    { y: yAxis - 1, x: xAxis - 2 },
    { y: yAxis - 2, x: xAxis + 1 },
    { y: yAxis - 1, x: xAxis + 2 },
  ];
  return moves
};

export default knightMovements