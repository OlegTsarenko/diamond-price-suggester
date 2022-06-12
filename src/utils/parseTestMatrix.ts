export default (text: string): Array<Array<number>> => {
  return text.split('\n')
      .map((x)=> x.split(' ').map((x)=> Number(x)))
};



