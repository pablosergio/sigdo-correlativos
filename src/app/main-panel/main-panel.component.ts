import { Component, OnInit, Input } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  @Input() tieneSideMenu: boolean;
  sidemenu: boolean;
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.sidemenu = this.tieneSideMenu;
    this.items = [
            {
                label: 'Correspondencia',
                icon: 'fa-envelope',
                items: [
                        {
                          label: 'Correlativos',
                          icon: 'fa-plus',
                          routerLink: ['/main/correlativos']
                        },
                        { label: 'Open' },
                        { label: 'Quit' }
                ]
            },
            {
                label: 'Configuracion',
                icon: 'fa-cog',
                items: [
                    { label: 'Oficinas', icon: 'fa-building-o', routerLink: ['/main/oficinas'] },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            }
        ];
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
