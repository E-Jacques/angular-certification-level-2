import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true,
  pure: true
})
/**
 * A pipe that joins an array of strings into a single string with a specified separator.
 * 
 * @example
 * ```html
 * <p>{{ ['apple', 'banana', 'cherry'] | join: ', ' }}</p>
 * ```
 */
export class JoinPipe implements PipeTransform {

  /**
   * Transforms an array of strings into a single string, separated by the specified separator.
   */
  transform(value: string[], sep: string): string {
    return value.join(sep);
  }

}
