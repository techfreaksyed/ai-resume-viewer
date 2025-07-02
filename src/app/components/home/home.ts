import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ResumeFileInfo, SharedStateService } from '../../services/shared-state';
import { CommonUtilities } from '../../shared/commonUtilities';
import { BaseComponent } from '../../shared/baseComponent';
import { Http } from '../../services/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  imports: [NgbNavModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home extends BaseComponent {

  resumeService = inject(SharedStateService)
  httpService = inject(Http)

  activeTab = 1
  resumeText: string = ''
  fileUrl: string | undefined;
  fileType: string | undefined;
  fileContent: string | undefined;

  triggerFileInput(): void {
    const fileInput = document.getElementById('resumeInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.resumeService.setStoredFile(file); // Store the file in shared state
      const formData = new FormData();
      formData.append('file', file);

      // Example: send formData to a service or API endpoint
      this.httpService.uploadFile(environment.uploadFileUrl, formData).subscribe(
        {
          next: (response) => {
            console.log('File uploaded successfully:', response);
            const fileInfo: ResumeFileInfo = {
              name: file.name,
              type: file.type,
              size: file.size,
              fileUrl: response.url,
              content: '', // Optional: you can set the content if needed 
              isUploaded: true // Indicate that the file has been uploaded
            };
            this.resumeService.setResumeFile(fileInfo);
            this.utility.showSuccess('File uploaded successfully!', 'Success');
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            this.utility.showError('Failed to upload file. Please try again.', 'Error');
          }
        }
      );
    }
  }


}
