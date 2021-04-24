import {IGame} from './Assets.interface';
import {Tile} from './Tile';

export class Game implements IGame{
  readonly didWin: boolean;
  readonly field: Tile[][];

  constructor(field: Tile[][], didWin: boolean) {
    this.field = field;
    this.didWin = didWin;
  }
}
