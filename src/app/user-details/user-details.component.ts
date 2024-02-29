import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddEditNutritionComponent } from '../add-edit-nutrition/add-edit-nutrition.component';
import { MatDialog } from '@angular/material/dialog';
import { PrehranaView } from '../core/modules/prehrana-view';
import { UserView } from '../core/modules/user-view';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userData!: UserView;
  nutritionData: PrehranaView[] = [];

  constructor(private route: ActivatedRoute, 
              private userService: UserService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getUserData();
    });
  }

  getUserData() {
    this.userService.getUserData(this.userId).subscribe(
      (user: UserView) => {
        this.userData = user;
      });

    this.userService.getNutritionData(this.userId).subscribe(
      (nutrition: PrehranaView[]) => {
        this.nutritionData = nutrition.sort((a, b) => Date.parse('01-01-2023 ' + a.vrijeme) -  Date.parse('01-01-2023 ' + b.vrijeme));
      });
  }

  openAddEditNutrition() {
    const dialogRef = this.dialog.open(AddEditNutritionComponent, {
      width: '500px',
      data: {
        userId: this.userId,
        nutritionData: this.nutritionData
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserData();
        }
      },
    });
  }
}



