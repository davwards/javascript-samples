export default function FakePuzzleGenerator() {
  this.generate = () => Promise.resolve([
    [9, undefined, undefined,2,3,7,6,8,undefined],
    [undefined,2,undefined,8,4,undefined,undefined,7,3],
    [8,undefined,7,1,undefined,5,undefined,2,9],
    [undefined,undefined,4,5,9,8,3,undefined,undefined],
    [2,undefined,undefined,undefined,undefined,1,undefined,undefined,6],
    [5,1,undefined,undefined,undefined,undefined,undefined,4,7],
    [4,undefined,1,3,undefined,6,2,9,5],
    [undefined,5,undefined,9,1,undefined,7,3,8],
    [3,undefined,8,undefined,5,undefined,undefined,undefined,undefined],
  ]);
}
