import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-edit-nutrition',
  templateUrl: './add-edit-nutrition.component.html',
  styleUrls: ['./add-edit-nutrition.component.css']
})
export class AddEditNutritionComponent implements OnInit {
  nutritionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<AddEditNutritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.nutritionForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.nutritionForm.valid) {
      if (this.data) {
        this._userService.updateNutrition(this.data.id, this.nutritionForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Nutrition updated!', 'Close', { duration: 2000 });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._userService.addNutrition(this.nutritionForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Nutrition updated!', 'Close', { duration: 2000 });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}

