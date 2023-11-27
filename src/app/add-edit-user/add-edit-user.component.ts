import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  addUser: FormGroup

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService, 
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
  ) {
    this.addUser = this._fb.group({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
  }

  ngOnInit(): void {
    this.addUser.patchValue(this.data);
  }

  onSubmit() {
    if (this.addUser.valid) {
      if(this.data) {
        this._userService.updateUser(this.data.id, this.addUser.value).subscribe({
          next: (val: any) => {
            alert('User updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._userService.addUser(this.addUser.value).subscribe({
          next: (val: any) => {
            alert('User added!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}