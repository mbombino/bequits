import http from "../common-http";

class UploadFileService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      onUploadProgress,
    });
  }
}
export default new UploadFileService();
