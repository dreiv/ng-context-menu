import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users = [
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
}
