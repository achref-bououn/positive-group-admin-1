import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import Swal from "sweetalert2";
import { Admin } from "../../models/admin.model";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

  adminData: Admin;

  updateProfileForm = new FormGroup({
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
  });

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAdminData();
  }

  getAdminData() {
    this.adminService.getAdminData().subscribe((res: Admin) => {
      this.adminData = res;
      this.updateProfileForm.reset({
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        phoneNumber: res.phoneNumber,
      });
    });
  }

  onSubmit(): void {
    this.updateProfileForm.value.oldName = this.adminData.firstName;
    this.adminService
      .updateAdminData(this.updateProfileForm.value)
      .subscribe((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Done",
            text: `profil mise à jour`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: `Something went wrong `,
          });
        }
      });
  }
}
