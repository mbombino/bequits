import http from "../common-http";

class UploadFileService {
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getFiles() {
    return http.get("/files");
  }
  getFile(filename) {
    return http.get("/files/" + filename, {
      responseType: "blob",
    });
  }
}
export default new UploadFileService();
