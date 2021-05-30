import React from 'react';

export default () => {
  //   const canvas = React.createRef();
  //   var c = document.getElementById('myCanvas');
  setTimeout(() => {
    const canvas = document.getElementById('myCanvas');
    // if (canvas && canvas.current) {
    console.log(canvas);
    var ctx = canvas?.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 150, 75);
    // }
  }, 2000);

  return (
    <>
      <canvas
        // ref={canvas}
        id="myCanvas"
        width="200"
        height="100"
        style={{ border: '1px solid #000000' }}
      ></canvas>
    </>
  );
};
