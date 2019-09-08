export default [
    [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]
  ];

  // 0 means space is open and we can go ahead and place something
  // -1 means blocked position - path of enemies
  // as we place items we update 0 to 1 to indicate place is
  // now occupied