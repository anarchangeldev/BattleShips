import { Game } from './Game';
import { Grid } from './Grid';
import {FieldValue, IGame} from './Assets.interface';

export class Logic {
  static readonly gridSize = 6;

 /* tslint:disable */

  static generate(): IGame {
    return this.createGame(this.createField(), false);
  }

  static createField(): Grid[][] {
    let grid: Grid[][] = [];

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {

        let value;
        if(Math.round(Math.random()) != 0) value = FieldValue.WATER; else value = FieldValue.SHIP_PART;
        const element: Grid = new Grid(value, FieldValue.UNKNOWN);
        const column = grid[x] = grid[x] || [];
        column[y] = element;
      }
    }

    return grid;
  }

  static createGame(grid: Grid[][], winState: boolean) {
    let game = new Game(grid, winState);
    this.assignGame(game, grid);
    return game;
  }

  static assignGame(game: IGame, grid: Grid[][]) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x].currentGame = game;
      }
    }
  }

  static checkWin(grid: Grid[][], doesEverythingHaveToBeDiscovered: boolean) {

    let returnCond = true;

    // tslint:disable-next-line:prefer-for-of
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {

        if(grid[y][x].actualValue == FieldValue.SHIP_PART) {
          returnCond = false;
        }
      }
    }

    if(doesEverythingHaveToBeDiscovered) {
      let isEverythingDiscovered = this.isEverythingDiscovered(grid);

      if(isEverythingDiscovered) return returnCond; else return false;
    } else {
      return returnCond;
    }

  }

  static isEverythingDiscovered(grid: Grid[][]): boolean {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {


        if(grid[y][x].value == FieldValue.UNKNOWN) {
          return false;
        }

      }
    }
    return true;
  }

}
