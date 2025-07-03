import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ResumeFileInfo, SharedStateService } from '../../services/shared-state';
import { CommonUtilities } from '../../shared/commonUtilities';
import { BaseComponent } from '../../shared/baseComponent';
import { Http } from '../../services/http';
import { environment } from '../../../environments/environment';
import { Gemini } from '../../services/gemini';


@Component({
  selector: 'app-home',
  imports: [NgbNavModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home extends BaseComponent implements OnInit {

  resumeService = inject(SharedStateService)
  httpService = inject(Http)

  activeTab = 1
  resumeText: string = ''
  fileUrl: string | undefined;
  fileType: string | undefined;
  fileContent: string | undefined;
  fileUploadCount: number = parseInt(sessionStorage?.getItem('fileUploadCount')!) || 0; // Initialize file upload count from session storage

  triggerFileInput(): void {
    const fileInput = document.getElementById('resumeInput') as HTMLInputElement;
    fileInput?.click();
  }

  ngOnInit(): void { 
  }

  onFileSelected(event: Event): void {
    this.utility.updateLoader(true);
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
            // Once it is successfully uploaded then check the times user has uploaded the file
            sessionStorage?.setItem('fileUploadCount', this.resumeService.fileUploadCount() + '');
            this.resumeService.incrementFileUploadCount(); // Increment the file upload count
            this.utility.updateLoader(false);

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
            this.utility.updateLoader(false);
            console.error('Error uploading file:', error);
            this.utility.showError('Failed to upload file. Please try again.', 'Error');
          }
        }
      );
    }
  }


}
