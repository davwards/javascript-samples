import itBehavesLikeAPuzzleGenerator from '../__contracts__/puzzle-generator-contract'
import FakePuzzleGenerator from '../__fakes__/fake-puzzle-generator'

itBehavesLikeAPuzzleGenerator(
  () => new FakePuzzleGenerator()
);
