import { NgModule, Component, OnInit, Input, Output, OnChanges, EventEmitter,
  trigger, state, style, animate, transition, OnDestroy,  ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ModalCommunicationService, toBoolean } from './api';


@Component({
  selector: 'app-window-dialog',
  template: `
  	<div [@dialog] *ngIf="visible" class="dialog">
	  <header class="modal-header fixed modal__header" [hidden]="!header"><h2 class="text-heading">{{title}}</h2></header>
		<div  class="modal__content">
	  	  <ng-content></ng-content>
	  	</div>
	    <button *ngIf="closable" (click)="close()" aria-label="Close" class="dialog__close-btn">X</button>
	  <footer class="modal-footer fixed modal__footer" [hidden]="!footer">
	  	<button class="slds-button slds-button--neutral" (click)="cancel()">Cancel</button>
	    <button class="slds-button slds-button--brand" (click)="save()">Save</button>
	  </footer>
	</div>
	<div *ngIf="visible" class="overlay"></div>
  `,
  styles: [`
	.overlay {
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  background-color: rgba(0, 0, 0, 0.5);
	  z-index: 999;
	}

	.dialog {
	  z-index: 1000;
	  position: fixed;
	  right: 0;
	  left: 0;
	  top: 20px;
	  margin-right: auto;
	  margin-left: auto;
	  min-height: 200px;
	  width: 90%;
	  max-width: 520px;
	  background-color: #fff;
	  padding: 0px;
	  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
	  margin-top:0%; /* Ajuste personal */
	}

	@media (min-width: 768px) {
	  .dialog {
	    top: 40px;
	  }
	}

	.dialog__close-btn {
	  border: 0;
	  background: none;
	  color: #2d2d2d;
	  position: absolute;
	  top: 8px;
	  right: 8px;
	  font-size: 1.2em;
	}

	.modal__header {
	  position: relative;
	  border-top-right-radius: .25rem;
	  border-top-left-radius: .25rem;
	  border-bottom: 2px solid #d8dde6;
	  padding: 1rem;
	  text-align: center;
	  background-color: #f4f6f9;
	}

	.modal__content {
	  overflow: auto;
	  max-height: 70vh;
	  padding: 20px;
	}

	.modal__footer {
	  border-top: 2px solid #d8dde6;
	  border-bottom-right-radius: .25rem;
	  border-bottom-left-radius: .25rem;
	  padding: .75rem 1rem;
	  background-color: #f4f6f9;
	  text-align: right;
	}

	.text-heading {
	    font-weight: 300;
	    font-size: 1.25rem;
	    line-height: 1.25;
	}
  `],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class DialogComponent implements OnInit, OnDestroy {
  @Input() closable = false;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: string;
  @Input() header: boolean;
  @Input() footer: boolean;
  subscriptionCancel: Subscription;
  subscriptionSave: Subscription;
  constructor(private modalCommunication: ModalCommunicationService) {
    this.subscriptionCancel = modalCommunication.btnCancel$.subscribe();
    this.subscriptionSave = modalCommunication.btnSave$.subscribe();
    this.header = false;
    this.footer = false;
  }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  cancel() {
     this.modalCommunication.btnCancel();
  }

  save() {
    this.modalCommunication.btnSave();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscriptionCancel.unsubscribe();
    this.subscriptionSave.unsubscribe();
  }

}


@Component({
  selector: 'ngl-spinner',
  template: `
  	<div class="loading"><img src="../../images/_loading.gif" width="40" height="40" /></div>
  `,
  styles: [`
  	.loading {
	  padding:20px;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  margin-left: -32px; /* -1 * image width / 2 */
	  margin-top: -32px;  /* -1 * image height / 2 */
	  display: block;
	  z-index:1000;
	}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglSpinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'brand' |  'inverse';

  private _container = false;
  @HostBinding('class.slds-spinner_container') get hasContainer() {
    return this._container;
  }
  @Input() set container(container: string | boolean) {
    this._container = toBoolean(container);
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ DialogComponent, NglSpinner ],
  declarations: [ DialogComponent, NglSpinner ]
})
export class SharedModule { }
