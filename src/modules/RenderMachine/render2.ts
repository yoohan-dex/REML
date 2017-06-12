const Paul = require('paul');

export default function render(tree: any) {
  const walker = (node: any, walk: Function) => {
    if (node.children) {
      return walk(node.children);
    }
    return node;
  };


  const paul = new Paul(walker);

  const iter = paul.breadthIterator(tree);
  while (true) {
    const res = iter.next();
    if (res.done) {
      break;
    }
    console.log(res);
  }
}