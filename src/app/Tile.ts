import {ActualFieldValue, FieldValue, IField, IGame} from './Assets.interface';
import {Logic} from './Logic';
import {Game} from './Game';

/*tslint:disable*/
export class Tile implements IField{
  readonly actualValue: ActualFieldValue;
  readonly value: FieldValue;
  currentGame!: Game;

  shoot(): IGame {

    const newBattleField: Tile[][] = [];
    const field = this.currentGame.field;

    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {

        const element: Tile = this.currentGame.field[x][y];


        let value: FieldValue = element.value;
        let actualValue: ActualFieldValue = element.actualValue;

        if (element === this) {

          if (actualValue === ActualFieldValue.SHIP_PART) {

            actualValue = ActualFieldValue.PART_OF_DESTROYED_SHIP;
            value = FieldValue.PART_OF_DESTROYED_SHIP;

          } else {
            switch (actualValue) {
              case ActualFieldValue.PART_OF_DESTROYED_SHIP:
                value = FieldValue.PART_OF_DESTROYED_SHIP;
                break;
              case ActualFieldValue.WATER:
                value = FieldValue.WATER;
                break;
            }

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

  constructor(actualValue: ActualFieldValue, value: FieldValue) {
    this.actualValue = actualValue;
    this.value = value;
  }
}
