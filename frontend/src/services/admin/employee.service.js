import createApiAdmin from "./api.service";

class EmployeeService {
    constructor(baseUrl = "/api/admin/employee") {
        this.api = createApiAdmin(baseUrl);
    }

    async getInfor() {
        return (await this.api.get("/infor")).data;
    }

}
export default new EmployeeService();