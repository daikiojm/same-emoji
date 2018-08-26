import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { MockGameBoardComponent } from './testing.components';

@NgModule({
  declarations: [MockGameBoardComponent],
  imports: [MaterialModule],
  exports: [MaterialModule, MockGameBoardComponent],
})
export class TestingModule {}
