import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';

interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: User[] = [
    {
      id: '7583926a-1d0b-4a3b-bc75-fe3cd5024172',
      name: 'Khadijah Clayton'
    },
    {
      id: '9e9de557-a481-4289-8fd5-15f172fab2f8',
      name: 'Caroline Mayer'
    },
    {
      id: '9f75f8fc-3c1e-4b06-a966-f0a0a6fdc99d',
      name: 'Shane Thomson'
    },
    {
      id: '5e5a5e82-b2d9-4a4b-8f43-e74823aa187b',
      name: 'Saskia Hubbard'
    }
  ];
  sub!: Subscription;
  @ViewChild('userMenu') userMenu!: TemplateRef<any>;

  overlayRef!: OverlayRef | null;

  constructor(public overlay: Overlay, public vcr: ViewContainerRef) {}

  open({ x, y }: MouseEvent, user: User): void {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.vcr, {
        $implicit: user
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  close(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  delete(user: User): void {
    this.close();
  }
}
