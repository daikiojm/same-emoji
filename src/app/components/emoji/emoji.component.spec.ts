import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GameEmoji } from '../../types';
import { EmojiComponent } from './emoji.component';

describe('EmojiComponent', () => {
  let component: EmojiComponent;
  let fixture: ComponentFixture<EmojiComponent>;

  const gameEmoji: GameEmoji = {
    emoji: {
      emoji: '🍧',
      key: 'shaved_ice',
    },
    selected: {
      primary: false,
      secondary: false,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmojiComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiComponent);
    component = fixture.componentInstance;
    // set initial input
    component.emoji = gameEmoji;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
