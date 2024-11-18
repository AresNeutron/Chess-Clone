const promotePawn = async (_id: string, newPiece: string) => {
    try {
      if(!_id){
        alert("Fail in the promotePawn function .ID is null or undefined")
        return 
      }
      const res = await fetch(`http://localhost:3003/api/promote/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: newPiece }),
      });
      if (!res.ok) {
        console.error("Error in the move function");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default promotePawn;