import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-tag-dialog",
  templateUrl: "./tag-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class TagDialogComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({ tag: "" });
  }

  submit(form: any) {
    this.matDialogRef.close(form.value);
  }
}
