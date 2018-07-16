import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  template: `

    <nz-tag
      [nzMode]="mode"
      [nzChecked]="checked"
      [nzColor]="color"
      [class.checked]="checked"
      [class.disabled]="mode=='default'"
      (nzCheckedChange)="onChange($event)"
    >

      <fa-icon [icon]="['far', icon]" *ngIf="icon"></fa-icon> {{ text }}
    </nz-tag>

  `,
  styles: [`

    ::ng-deep .ant-tag {
      height: 28px;
      padding: 3px 12px;
      cursor: pointer;
      font-size: 14px;
      user-select: none;
    }
    
    ::ng-deep .ant-tag-checkable:not(.checked) {
      border: 1px solid #d9d9d9;
    }

    ::ng-deep .disabled .ant-tag {
      cursor: not-allowed
    }

  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    }
  ]
})
export class ToggleButtonComponent implements ControlValueAccessor {

  @Input() text: string;
  @Input() icon: string;
  @Input() color: string;

  mode: string = "checkable";
  checked: boolean = false;

  // this is the initial value set to the component
  public writeValue(obj: any) {
    if (obj) {
      this.checked = obj;
    }
  }

  onChange(value: boolean) {
    this.checked = value;
    this.propagateChange(this.checked);
  }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  
  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };
  registerOnTouched(fn: any) {}

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.mode = "default";
    } else {
      this.mode = "checkable";
    }
  }

}
