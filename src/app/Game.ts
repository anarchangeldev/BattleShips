import {IField, IGame} from './Assets.interface';

export class Game implements IGame{
  readonly didWin: boolean;
  readonly field: IField[][];

  constructor(field: IField[][], didWin: boolean) {
    this.field = field;
    this.didWin = didWin;
  }
}
