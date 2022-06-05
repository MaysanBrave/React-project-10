import http from "./http-common";
class DataServices{
    async getAllUsers(){
        return http.get("/users");
    }
    async getAllProducts(){
        return http.get("/products");
    }
    async getAllOrders(){
        return http.get("/orders");
    }
    async createOrder(order){
        return http.post("/order",order);
    }
    async createProduct(product){
        return http.post("/product",product);
    }
    async updateProduct(product){
        return http.put("/product",product);
    }
    async updateOrder(order){
        return http.put("/order",order);
    }
    async deleteOrder(id){
        return http.delete(`/order/${id}`);
    }
    async deleteProduct(id){
        return http.delete(`/product/${id}`);
    }

}

export default new DataServices();