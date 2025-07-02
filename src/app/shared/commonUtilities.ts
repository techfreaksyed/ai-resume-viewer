import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class CommonUtilities {
    constructor(private toastr: ToastrService, private spinner: NgxSpinnerService
    ) { }
    loaderCount = 0

    showSuccess(message: string, title: string) {
        this.toastr.success(message, title);
    }

    showError(message: string, title: string) {
        this.toastr.error(message, title);
    }

    updateLoader(isLoading: boolean) {
        if (isLoading) {
            this.loaderCount++;
        } else if (this.loaderCount > 0) {
            this.loaderCount--;
        }

        if (this.loaderCount === 0) {
            this.spinner.hide();
        } else {
            this.spinner.show();
        }
    }
}