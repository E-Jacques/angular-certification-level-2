import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  it('create an instance', () => {
    const pipe = new JoinPipe();
    expect(pipe).toBeTruthy();
  });

  it("should join an array of strings with passed separator", () => {
    const pipe = new JoinPipe();
    const inputArray = ['apple', 'banana', 'cherry'];
    const separator = ', ';
    const result = pipe.transform(inputArray, separator);
    expect(result).toBe('apple, banana, cherry');
  });
});
