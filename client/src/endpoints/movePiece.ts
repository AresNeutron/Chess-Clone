const movePiece = async (_id: string, position: string) => {
  try {
    if(!_id){
      alert("Fail in the movePiece function .ID is null or undefined")
      return 
    }
    const res = await fetch(`http://localhost:3003/api/move/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ position: position }),
    });
    if (!res.ok) {
      console.error("Error in the move function");
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

export default movePiece;
