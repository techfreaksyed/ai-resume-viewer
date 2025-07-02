import { Component, inject } from '@angular/core';
import { ResumeFileInfo, SharedStateService } from '../../services/shared-state';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { Gemini } from '../../services/gemini';
import { BaseComponent } from '../../shared/baseComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  imports: [NgxDocViewerModule],
  templateUrl: './preview.html',
  styleUrl: './preview.scss'
})
export class Preview extends BaseComponent {
  resumeService = inject(SharedStateService)
  geminiService = inject(Gemini)
  router = inject(Router)

  resumeFile = this.resumeService.resumeFile

  submitData(text: string) {
    if (text === 'back') {
      this.resumeService.setResumeFile(null);
    } else {
      console.log('get stored file:', this.resumeService.getStoredFile());
      // this.resumeService.setResultText('xyz')
      //  this.router.navigate(['/results']);
      this.sendFileAndPrompt("Make a summary of the resume and provide feedback on how to improve it.");
    }
  }


  async sendFileAndPrompt(prompt: string) {
    this.utility.updateLoader(true);
    try {
      const response = await this.geminiService.generateContentWithFile(prompt, this.resumeService.getStoredFile());
      this.resumeService.setResultText(response ?? '');
      console.log('get stored text:', this.resumeService.resultText());
      this.utility.showSuccess('Response received from Gemini!', 'Success');
      this.router.navigate(['/results']);
    } catch (error) {
      this.utility.showError('Error generating content from Gemini.', 'Error');
      console.error('Error generating content from Gemini:', error);
      this.utility.updateLoader(false);
    } finally {
      this.utility.updateLoader(false);
    }
  }

}
