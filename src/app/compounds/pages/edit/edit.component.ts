import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../_service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  compoundForm: any;
  matcher = new MyErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: HttpService,
    private _snackBar: MatSnackBar
  ) {
    console.log(data)
  }

  ngOnInit(): void {
    this.dialogRef._containerInstance._config.width = '480px';
    this.dialogRef._containerInstance._config.autoFocus = false;
    this.createForm();
  }

  createForm() {
    this.compoundForm = new FormGroup({
      CompoundName: new FormControl(this.data?.CompoundName, [Validators.required, Validators.pattern(/^[a-z\ -]+$/i),Validators.maxLength(100)]),
      CompounrDescription: new FormControl(this.data?.CompounrDescription, [Validators.required,Validators.maxLength(5000)]),
      strImageAttribution: new FormControl(this.data?.strImageAttribution), // optional
      strImageSource: new FormControl(this.data?.strImageSource)
    })
  }

  get frmCtrl() {
    return this.compoundForm.controls;
  }

  closeDialog(val: any) {
    this.dialogRef.close(val)
  }

  compoundHandler() {
    if (this.compoundForm.invalid) {
      return;
    }
    this._service.updateCompound(this.compoundForm.value, {id: this.data.id}).subscribe((res: any) => {
      console.log(res);
      this.showToast(res.message)
      if (res.statusCode == 200) {
        this.closeDialog(res.data);
      } else {
        this.closeDialog(null);
      }
    }, error => {
      console.log(error);
      this.showToast(error.message);
      this.closeDialog(null);
    })
  }

  showToast(msg: string) {
    this._snackBar.open(msg, '', {duration:2500, verticalPosition: 'top'})
  }

}
