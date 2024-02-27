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
  nutritionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<AddEditNutritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nutritionForm = this.fb.group({
      dorucakVrijeme: this.data.nutritionInfo[0]?.dorucak[0]?.vrijeme ?? '',
      dorucakHrana: this.data.nutritionInfo[0]?.dorucak[0]?.hrana ?? '',
      rucakVrijeme: this.data.nutritionInfo[0]?.rucak[0]?.vrijeme ?? '',
      rucakHrana: this.data.nutritionInfo[0]?.rucak[0]?.hrana ?? '',
      veceraVrijeme: this.data.nutritionInfo[0]?.vecera[0]?.vrijeme ?? '',
      veceraHrana: this.data.nutritionInfo[0]?.vecera[0]?.hrana ?? '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.nutritionForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.nutritionForm.valid) {

      const updatedData = {
        userId: this.data.userId,
        dorucak: [
          {
            vrijeme: this.nutritionForm.value.dorucakVrijeme,
            hrana:  this.nutritionForm.value.dorucakHrana,
          }
        ],
        rucak: [
          {
            vrijeme: this.nutritionForm.value.rucakVrijeme,
            hrana:  this.nutritionForm.value.rucakHrana,
          }
        ],
        vecera: [
          {
            vrijeme: this.nutritionForm.value.veceraVrijeme,
            hrana:  this.nutritionForm.value.veceraHrana,
          }
        ]

      }
      if (this.data.nutritionInfo[0]?.dorucak[0]?.vrijeme) {
        this._userService.updateNutrition(this.data.userId, updatedData).subscribe({
          next: (val: any) => {
            this._snackBar.open('Nutrition updated!', 'Close', { duration: 2000 });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._userService.addNutrition(updatedData).subscribe({
          next: (val: any) => {
            this._snackBar.open('Nutrition added!', 'Close', { duration: 2000 });
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

