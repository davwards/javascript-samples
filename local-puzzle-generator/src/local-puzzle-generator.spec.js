import { itBehavesLikeAPuzzleGenerator } from 'flux-sudoku';
import generator from './local-puzzle-generator';

itBehavesLikeAPuzzleGenerator(() => generator);

