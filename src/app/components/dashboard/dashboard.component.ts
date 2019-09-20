import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user'
import { UserService, AuthenticationService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  users: User[];
  constructor(private UserService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.UserService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;

    }, error => {
      console.log(error);
      // this.alertService.error(error)
      // this.error = error.error.message;
      // this.loading = false;
      // setTimeout(() => { this.error = ''; }, 5000)
    });
  }

}
