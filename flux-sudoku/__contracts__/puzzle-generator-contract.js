import { uniq, range, flatMap } from 'lodash';

expect.extend({
  toContainDuplicates(collection) {
    if(collection.length > uniq(collection).length) {
      return {
        pass: true,
        message: `expected collection ${collection} not to contain duplicate values`
      };
    } else {
      return {
        pass: false,
        message: `expected collection ${collection} to contain duplicate values`
      };
    }
  }
})

export default function itBehavesLikeAPuzzleGenerator(getGenerator) {
  let generator;

  beforeEach(() => {
    generator = getGenerator();
  });

  it('returns a promise which resolves to a valid sudoku puzzle', () => {
    return generator.generate()
      .then(puzzle => {
        expect(puzzle.length).toBe(9);

        puzzle.forEach(row => {
          expect(row.length).toBe(9);

          row.filter(cell => cell !== undefined).forEach(cell => {
            expect(typeof cell).toBe('number');
          });

          expect(row.filter(cell => cell !== undefined)).not.toContainDuplicates();
        });

        const columns = range(9).map(index => puzzle.map(row => row[index]));

        columns.forEach(column => {
          expect(column.filter(cell => cell !== undefined)).not.toContainDuplicates();
        });

        sectorsOf(puzzle).forEach(sector => {
          expect(sector.filter(cell => cell !== undefined)).not.toContainDuplicates()
        });
      });
  });
}

function sectorsOf(puzzle) {
  return flatMap(
    range(3),
    y => range(3).map(x => ({x,y}))
  ).map(sectorCoordinates =>
    flatMap(
      puzzle.slice(sectorCoordinates.y*3, sectorCoordinates.y*3+3),
      row => row.slice(sectorCoordinates.x*3, sectorCoordinates.x*3+3)
    )
  );
}
