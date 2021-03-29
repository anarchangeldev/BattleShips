import {FieldValue, IField, IGame} from './Assets.interface';
import {Logic} from './Logic';
import {Game} from './Game';
/*tslint:disable*/
export class Tile implements IField{
  readonly actualValue: FieldValue;
  readonly value: FieldValue;
  currentGame!: IGame | undefined;

  shoot(): IGame {

    const newBattleField: Tile[][] = [];

    // @ts-ignore
    const xSize = this.currentGame.field   .length;
    // @ts-ignore
    const ySize = this.currentGame.field[0].length;

    for (let y = 0; y < xSize; y++) {
      for (let x = 0; x < ySize; x++) {

        // @ts-ignore
        const element: Tile = this.currentGame.field[x][y];


        let value: FieldValue = element.value;
        let actualValue: FieldValue = element.actualValue;

        if (element === this) {

          if (actualValue === FieldValue.SHIP_PART) {

            value = actualValue = FieldValue.PART_OF_DESTROYED_SHIP;
          } else {

            value = actualValue;
          }

        }


        const newField = new Tile(actualValue, value);


        const column = newBattleField[x] = newBattleField[x] || [];
        column[y] = newField;

      }
    }
    let newGame: IGame;
    newGame = new Game(newBattleField, Logic.checkWin(newBattleField, true));
    Logic.assignGame(newGame, newBattleField);
    return newGame;
  }

  constructor(actualValue: FieldValue, value: FieldValue) {
    this.actualValue = actualValue;
    this.value = value;
  }
}
