import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import "rxjs/add/operator/first";

import { TagDialogData } from "./tag-dialog-data.interface";
import { Tag } from "../../interfaces/tag.interface";

@Component({
  selector: "app-tag-dialog",
  templateUrl: "./tag-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class TagDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TagDialogData
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const dataToEdit = this.data.dataToEdit;
    let dataToEditName = "";
    if (dataToEdit) {
      dataToEditName = dataToEdit.name;
    }
    this.form = this.formBuilder.group({
      name: [dataToEditName, this.uniqueNameValidator.bind(this)]
    });
    this.form.controls.name.valueChanges
      .first()
      .subscribe(() => this.form.controls.name.markAsTouched());
  }

  submit(form: any) {
    const val = form.value;
    let id = "";
    if (this.data.dataToEdit) {
      id = this.data.dataToEdit.id;
    }

    const tag: Tag = {
      id: id,
      name: val.name
    };
    this.matDialogRef.close(tag);
  }

  uniqueNameValidator(control: AbstractControl) {
    if (
      !this.isDataToEdit(control.value) &&
      this.isExistingName(control.value)
    ) {
      return { existingName: { value: control.value } };
    }
  }

  isDataToEdit(value: string) {
    return (
      this.data.dataToEdit &&
      value.toLowerCase() === this.data.dataToEdit.name.toLowerCase()
    );
  }

  isExistingName(value: string) {
    const index = this.data.tags.findIndex(
      tag => tag.name.toLowerCase() === value.toLowerCase()
    );
    return index >= 0;
  }
}
