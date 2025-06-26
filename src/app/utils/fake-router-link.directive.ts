import { Directive, input, Input, InputSignal } from '@angular/core';


@Directive({
    selector: '[routerLink]',
    standalone: true
})
export class FakeRouterLinkDirective {
    public readonly routerLink: InputSignal<string[]> = input.required<string[]>();
}
