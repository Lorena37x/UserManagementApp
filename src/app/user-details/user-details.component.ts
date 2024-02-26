import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userData: any;
  nutritionInfo: any;

  constructor(private route: ActivatedRoute, 
              private userService: UserService) {}

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
}
