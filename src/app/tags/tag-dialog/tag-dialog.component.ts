import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Tag } from "../../interfaces/tag";

interface TagDialogData {
  action: string;
  tags: Tag[];
  dataToEdit?: Tag;
}

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
    this.form = this.formBuilder.group({
      name: ["", this.uniqueNameValidator.bind(this)]
    });
    this.form.controls.name.valueChanges.subscribe(() =>
      this.form.controls.name.markAsTouched()
    );
  }

  submit(form: any) {
    this.matDialogRef.close(form.value);
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
