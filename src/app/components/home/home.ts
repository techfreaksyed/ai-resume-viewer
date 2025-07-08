import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '../../services/http';
import { SharedStateService } from '../../services/shared-state';
import { BaseComponent } from '../../shared/baseComponent';
import { Appwrite } from '../../services/appwrite';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [NgbNavModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home extends BaseComponent implements OnInit {

  resumeService = inject(SharedStateService)
  httpService = inject(Http)
  router = inject(Router)
  appwriteService = inject(Appwrite) // Assuming you have an Appwrite service for file uploads

  activeTab = 1
  resumeText: string = ''
  fileUrl: string | undefined;
  fileType: string | undefined;
  fileContent: string | undefined;
  fileUploadCount: number = 0; // Initialize file upload count

  ngOnInit(): void {
    this.fileUploadCount = parseInt(sessionStorage?.getItem('fileUploadCount') ?? '0')// Initialize file upload count from session storage
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById('resumeInput') as HTMLInputElement;
    fileInput?.click();
  }


  onFileSelected(event: Event): void {
    this.utility.updateLoader(true);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.resumeService.setStoredFile(file); // Store the file in shared state
      const formData = new FormData();
      formData.append('file', file);
      console.log(file)

      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.utility.updateLoader(false);
        this.utility.showError('Please upload PDF file.', 'Invalid File Type');
        return
      }

      this.appwriteService.uploadFile(file).then(
        (res: any) => {
          this.utility.updateLoader(false);
          this.utility.showSuccess('File uploaded successfully!', 'Success');
          this.fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${res.bucketId}/files/${res.$id}/view?project=YOUR_PROJECT_ID`;
          this.resumeService.setResumeFile({
            name: file.name,
            type: file.type,
            size: file.size,
            fileUrl: this.appwriteService.getFileUrl(res.$id), // Get the file URL from Appwrite
            content: '', // Optional: you can set the content if needed
            isUploaded: true // Indicate that the file has been uploaded
          });
          this.resumeService.incrementFileUploadCount();
          this.router.navigate(['/preview']);
        },
        (err) => {
          this.utility.updateLoader(false);
          this.utility.showError('Failed to upload file. Please try again.', 'Error');
        }
      );


      // Example: send formData to a service or API endpoint
      // this.httpService.uploadFile(environment.uploadFileUrl, formData).subscribe(
      //   {
      //     next: (response) => {
      //       console.log('File uploaded successfully:', response);
      //       // Once it is successfully uploaded then check the times user has uploaded the file
      //       sessionStorage?.setItem('fileUploadCount', this.resumeService.fileUploadCount() + '');
      //       this.resumeService.incrementFileUploadCount(); // Increment the file upload count
      //       this.utility.updateLoader(false);

      //       const fileInfo: ResumeFileInfo = {
      //         name: file.name,
      //         type: file.type,
      //         size: file.size,
      //         fileUrl: response.url,
      //         content: '', // Optional: you can set the content if needed 
      //         isUploaded: true // Indicate that the file has been uploaded
      //       };
      //       this.resumeService.setResumeFile(fileInfo);
      //       this.utility.showSuccess('File uploaded successfully!', 'Success');
      //     },
      //     error: (error) => {
      //       this.utility.updateLoader(false);
      //       console.error('Error uploading file:', error);
      //       this.utility.showError('Failed to upload file. Please try again.', 'Error');
      //     }
      //   }
      // );
    }
  }


}
