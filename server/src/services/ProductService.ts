
import ProductModel from "../models/ProductModel";
import FileService from "./FileService";

class ProductService{
async create(product: any, image: any) {
     
        if(image){
        const fileName = FileService.save(image)
        product= {...product, image: fileName}
        }
      
        const createProduct = await ProductModel.create(product)
        return createProduct
};

async getAll() {
    const products= await ProductModel.find();
    if(!products) {
        throw new Error("Products not found.");
    }
    return products
};

async getOne(id: string) {
    const getProduct= await ProductModel.findById(id);
    if(!getProduct) {
        throw new Error("Product not found.");
    }

    return getProduct
}; 

async update(params: any,product: any) {
    const { id } =params
    const { name, price, quantity, description, image } = product;
    const updateProduct= await ProductModel.findByIdAndUpdate( id,{ name, price, quantity, description, image },{ new: true });
    if(!updateProduct) {
        throw new Error("Product not found.");
    }
    return updateProduct
}; 

async delete(params: any) {
    const { id } = params
    const deleteProduct= await ProductModel.findByIdAndDelete(id);
    if(!deleteProduct) {
        throw new Error("Product not found.");
    }
    return deleteProduct
};
}


export  default new ProductService();