import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddEditNutritionComponent } from '../add-edit-nutrition/add-edit-nutrition.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userData: any;
  nutritionInfo: any;
  // showEditForm: boolean = false;
  // editMeal: any = {};

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
      (user: any) => {
        this.userData = user;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.userService.getNutritionData(this.userId).subscribe(
      (nutrition: any) => {
        this.nutritionInfo = nutrition;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching nutrition data:', error);
      }
    );
  }

  openAddEditNutrition() {
    const dialogRef = this.dialog.open(AddEditNutritionComponent, {
      width: '500px',
      data: {
        userId: this.userId,
        nutritionInfo: this.nutritionInfo
      }
    });
  }
}

