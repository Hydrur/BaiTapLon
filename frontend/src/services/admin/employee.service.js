import createApiAdmin from "./api.auth.service";

class EmployeeService {
    constructor(baseUrl = "/api/admin/employee") {
        this.api = createApiAdmin(baseUrl);
    }

    async getInfor() {
        return (await this.api.get("/infor")).data;
    }

    
    async retrieveAllReaders() {
        try {
            return (await this.api.get("/retrieveallreaders")).data;
        } catch (error) {
            throw error;
        }
    }
    async changeStatus(readerId, bookId, status) {
        try {
            // Gọi đến ReaderService để thay đổi trạng thái của sách
            const response = await this.api.post(`/changestatus/${readerId}/${bookId}`, { status });

            // Trả về dữ liệu phản hồi từ server
            return response.data;
        } catch (error) {
            throw error;
        }
    }


}
export default new EmployeeService();