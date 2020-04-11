import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public uploadResultMessage;

  constructor(private httpClient: HttpClient) {}

  upload(htmlInput: HTMLInputElement) {
    const localFile: File = htmlInput.files[0];
    this.postFile(localFile).subscribe(response => {
      this.uploadResultMessage = response.message;
    });
  }
  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://localhost:5000/file-upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData, { headers: null });
  }
  fileSelected(file: HTMLInputElement) {
    console.log((file.files[0] as File).name);
  }
}
