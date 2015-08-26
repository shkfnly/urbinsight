function links(start1, end1, start2, end2){
  for(var i = 0; i < 200; i++){
    node1 = Math.floor(Math.random() * (end1 - start1) + start1);
    node2 = Math.floor(Math.random() * (end2 - start2) + start2);
    db.relate(node1, 'flows_to', node2, function(err, relationship){})
  }
}