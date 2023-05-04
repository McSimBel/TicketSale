import { BlocksStyleDirective } from './blocks-style.directive';
import {ElementRef} from "@angular/core";

describe('BlocksStyleDirective', () => {
  it('should create an instance', () => {
    const tesEl: any  = '';
    const directive = new BlocksStyleDirective(tesEl);
    expect(directive).toBeTruthy();
  });
});
