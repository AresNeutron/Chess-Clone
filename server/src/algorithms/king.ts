const kingMovements = (xAxis: number, yAxis:number)=>{
    const moves = [
        { y: yAxis + 1, x: xAxis },
        { y: yAxis + 1, x: xAxis + 1 },
        { y: yAxis, x: xAxis + 1 },
        { y: yAxis - 1, x: xAxis + 1 },
        { y: yAxis - 1, x: xAxis },
        { y: yAxis - 1, x: xAxis - 1 },
        { y: yAxis, x: xAxis - 1 },
        { y: yAxis + 1, x: xAxis - 1 },
      ];

    return moves
}

export default kingMovements