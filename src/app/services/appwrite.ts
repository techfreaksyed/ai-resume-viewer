import { Injectable } from '@angular/core';
import { Client, Storage } from 'appwrite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Appwrite {
  private client: Client;
  private storage: Storage;
  private bucketId = environment.appwriteBucketId; // replace with your actual bucket ID

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwriteEndpoint) // or your self-hosted Appwrite endpoint
      .setProject(environment.appwriteProjectId); // replace with your project ID

    this.storage = new Storage(this.client);
  }

  uploadFile(file: File) {
    return this.storage.createFile(this.bucketId, 'unique()', file);
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(this.bucketId, fileId);
  }

  getFileUrl(fileId: string) {
    return this.storage.getFileView(this.bucketId, fileId);
  }
}
