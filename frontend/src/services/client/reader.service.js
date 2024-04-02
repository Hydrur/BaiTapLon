import createApiClient from "./api.reader"

class ReaderService {
    constructor(baseUrl = "/api/reader"){
        this.apiClient = createApiClient(baseUrl)
    }

    async create(userData) {
        try {
            const response = await this.apiClient.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async retrieveReader(formData) {
        try {
            const { reader } = (await this.apiClient.get(`/user`, { headers: { Authorization: `Bearer ${formData.get("tokenUser")}` } })).data;
            return reader;
        } catch (error) {
            throw error;
        }
    }

    async addBook(data) {
        try {
            const response = await this.apiClient.post(`/addbook`, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteBook(id) {
        try {
            const response = await this.apiClient.delete(`/deletebook/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }


    // async updateCart(userId, cart) {
    //     try {
    //         const response = await this.apiClient.put(`/${userId}`, { cart });
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async deleteProductCart(userId, cart) {
    //     try {
    //         const response = await this.apiClient.put(`/${userId}`, { cart });
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async deleteUser(userId) {
    //     try {
    //         const response = await this.apiClient.delete(`/${userId}`);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async updateProductQuantity(userId, cart) {
    //     try {
    //         const response = await this.apiClient.put(`/${userId}`, { productId: productId, 
    //             quantity: quantity,
    //         });

    //         // Update local storage if the server request is successful
    //         const user = localStorage.getItem("user");
    //         if (user) {
    //             const userData = JSON.parse(user);
    //             const cartItem = userData.cart.find((item) => item.productId === productId);
    //             if (cartItem) {
    //                 cartItem.quantity = quantity;
    //                 localStorage.setItem("user", JSON.stringify(userData));
    //             }
    //         }

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error updating product quantity:", error);
    //         throw error;
    //     }
    // }
}

export default new ReaderService();
