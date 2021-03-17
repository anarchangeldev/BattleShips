import { Component } from '@angular/core';
import {FieldValue, IField, IGame} from './Assets.interface';
import { Logic } from './Logic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BattleShits';
  game: IGame;

  readonly unknownValue = FieldValue.UNKNOWN;
  readonly partValue = FieldValue.SHIP_PART;
  readonly waterValue = FieldValue.WATER;
  readonly partOfDestroyedShipValue = FieldValue.PART_OF_DESTROYED_SHIP;

  constructor() {
    this.game = Logic.generate();
  }

  shoot(grid: IField): void {
    this.game = grid.shoot();
  }

  restart(): void {
    this.game = Logic.generate();
  }

}
