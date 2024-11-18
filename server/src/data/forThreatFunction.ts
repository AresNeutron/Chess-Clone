import { Position } from "../functions/convertPosition";

export const directions: Position[] = [
    { y: 1, x: 0 },
    { y: 1, x: 1 },
    { y: 0, x: 1 },
    { y: -1, x: 1 },
    { y: -1, x: 0 },
    { y: -1, x: -1 },
    { y: 0, x: -1 },
    { y: +1, x: -1 },
  ];

export const whiteThreats = [
  "white-rook-1",
  "white-bishop-1",
  "white-rook-2",
  "white-bishop-2",
  "white-queen-1",
];
export const blackThreats = [
  "black-rook-1",
  "black-bishop-1",
  "black-rook-2",
  "black-bishop-2",
  "black-queen-1",
];

