const capturePiece = async (_id: string) => {
    try {
      if(!_id){
        alert("Fail in the capturePiece function .ID is null or undefined")
        return 
      }
      const res = await fetch(`http://localhost:3003/api/capture/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Error in the move function");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default capturePiece;
  