// shared-resume.service.ts
import { Injectable, signal } from '@angular/core';
import { File } from 'buffer';

export interface ResumeFileInfo {
  name: string;
  type: string;
  size: number;
  fileUrl: string; // Optional: URL for the file input
  content?: string; // Optional: base64 or plain text
  isUploaded: boolean
}

@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private _resumeFile = signal<ResumeFileInfo | null>(null);
  private _storedFile = signal<any>(null);
  private _resultText = signal<string>('');
  resumeFile = this._resumeFile.asReadonly();
  resultText = this._resultText.asReadonly();

  setResumeFile(file: ResumeFileInfo | null): void {
    this._resumeFile.set(file);
  }
  setStoredFile(file: any): void {
    this._storedFile.set(file);
  }
  setResultText(text: string): void {
    this._resultText.set(text);
  }
  getStoredFile(): any {
    return this._storedFile();
  }

  clearResumeFile(): void {
    this._resumeFile.set(null);
  }
}
