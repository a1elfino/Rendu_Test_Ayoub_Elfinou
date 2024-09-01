/**
 * This class has a very nice and complex method allowing to manipulate a given number.
 */
export class MyClass {
  constructor(private readonly aNumber: number) { }

  /**
   * Returns a number for very important reasons, obviously.
   */
  get(): number {
    return this.aNumber;
  }
}
