import {Game} from './Game';
import {Tile} from './Tile';
import {ActualFieldValue, FieldValue, IGame} from './Assets.interface';
// tslint:disable:typedef
// tslint:disable:prefer-for-of
export class Logic {
  static readonly fieldSize = 6;



  static generate(): IGame {
    return this.createGame(this.createField(), false);
  }

  static createField(): Tile[][] {
    const field: Tile[][] = [];

    for (let y = 0; y < this.fieldSize; y++) {
      for (let x = 0; x < this.fieldSize; x++) {

        let value;
        if (Math.round(Math.random()) !== 0) { value = ActualFieldValue.WATER; } else { value = ActualFieldValue.SHIP_PART; }
        const element: Tile = new Tile(value, FieldValue.UNKNOWN);
        const column = field[x] = field[x] || [];
        column[y] = element;
      }
    }

    return field;
  }

  static createGame(field: Tile[][], winState: boolean) {
    const game = new Game(field, winState);
    this.assignGame(game, field);
    return game;
  }
  static assignGame(game: IGame, field: Tile[][]) {
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        field[y][x].currentGame = game;
      }
    }
  }
  static checkWin(field: Tile[][], doesEverythingHaveToBeDiscovered: boolean) {

    let returnCond = true;

    // tslint:disable-next-line:prefer-for-of
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[0].length; x++) {

        if (field[y][x].actualValue === ActualFieldValue.SHIP_PART) {
          returnCond = false;
        }
      }
    }

    if (doesEverythingHaveToBeDiscovered) {
      const isEverythingDiscovered = this.isEverythingDiscovered(field);
      if (isEverythingDiscovered) { return returnCond; } else { return false; }
    } else {
      return returnCond;
    }

  }

  static isEverythingDiscovered(field: Tile[][]): boolean {
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[0].length; x++) {


        if (field[y][x].value === FieldValue.UNKNOWN) {
          return false;
        }

      }
    }
    return true;
  }

}
