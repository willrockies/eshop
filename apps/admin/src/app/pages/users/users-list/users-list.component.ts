import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: "admin-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }


  ngOnInit(): void {
    this._getUsers();

  }

  updateUser(userId: User) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  deleteUser(usersId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.usersService.deleteuser(usersId)
          .subscribe(
            (response) => {
              this._getUsers();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is deleted!'
              }),
                (error: any) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not deleted!'
                  });
                }
            }
          )
      },
    });
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    } else {
      return 0;
    }
  }
  private _getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }


}
