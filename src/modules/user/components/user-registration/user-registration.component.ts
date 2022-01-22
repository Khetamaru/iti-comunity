import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { UserQueries } from '../../services/user.queries';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {

      this.nzMessageService.error("Invalid password confirmation");
      return;
    }
    if (await this.userService.userNameExist(this.model.username)) {

      this.nzMessageService.error("Ce username est déjà pris")
      return;
    }
    this.userService.register(this.model.username, this.model.password);
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(["/splash/login"])
  }
}
