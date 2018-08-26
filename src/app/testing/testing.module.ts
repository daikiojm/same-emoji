import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { ToMinutesPipe } from '../pipes';
import { MockGameBoardComponent } from './testing.components';

@NgModule({
  declarations: [ToMinutesPipe, MockGameBoardComponent],
  imports: [MaterialModule],
  exports: [MaterialModule, ToMinutesPipe, MockGameBoardComponent],
})
export class TestingModule {}
