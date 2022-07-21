import React, { useState } from "react";



const PlayScreen= () => {
  let initialArr:string[] = []
  for(let i = 0; i < 144; i++){
    initialArr.push("")
  }
  const [tiles, setTiles] = useState(initialArr)
  console.log(tiles)
  const selectTile = (key: number) => {
    const clickText:string = 'P'
    setTiles([
    ...tiles.slice(0, key),
    clickText,
    ...tiles.slice(key + 1, tiles.length)
  ])
  }
  return <div className="grid grid-cols-12 gap-2 s:w-full md:w-1/2 lg:w-1/3 h-1/2">
    
    {tiles.map((value,key) => (
      <div className="s:w-6 s:h-6 w-8 h-8 border-2 border-red-200 hover:border-blue-200 flex justify-center items-center" onClick={() => selectTile(key)} key={key}>{value}</div>
    )
    )}

  </div>;
};

export default PlayScreen;
