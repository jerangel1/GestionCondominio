import { axiosPrivate } from "../axiosPrivate";

type Category = {
    id?: number;
    name: string;
    description: string;
};

// Función para crear una categoría
export const createCategory = async (category: Category) => {
    const response = await axiosPrivate.post("/api/v1/models/inventory/category", category);
    return response.data;
};

// Función para actualizar una categoría
export const updateCategory = async (category: Category) => {
    if (!category.id) {
        throw new Error("El ID de la categoría es requerido para actualizar");
    }
    const response = await axiosPrivate.put("/api/v1/models/inventory/category", category);
    return response.data;
};

// Función para eliminar una categoría
export const deleteCategory = async (id: number) => {
    const response = await axiosPrivate.delete("/api/v1/models/inventory/category", { data: { id } });
    return response.data;
};

type CategoryType = {
    id: number,
    nombre: string,
    descripcion: string
}

export const getCategoryList = async () => {
    const apiUrl = "/api/v1/models/inventory/category/list";
    const response = await axiosPrivate.post<CategoryType[]>(apiUrl, {});
    return response.data;
};

// Definir el tipo de producto
interface Product {
    id: number;
    status_id: number;
    description: string;
}

// Función para crear un producto
export const createProduct = async (product: Product) => {
    const response = await axiosPrivate.post("/api/v1/models/inventory/product", product);

    if (response.status !== 200) {
        throw new Error(`Error al crear el producto: ${response.statusText}`);
    }

    return response.data;
};

// Función para actualizar un producto
export const updateProduct = async (product: Product) => {
    const response = await axiosPrivate.put("/api/v1/models/inventory/product", product);

    if (response.status !== 200) {
        throw new Error(`Error al actualizar el producto: ${response.statusText}`);
    }

    return response.data;
};

// Función para eliminar un producto
export const deleteProduct = async (id: number) => {
    const response = await axiosPrivate.delete("/api/v1/models/inventory/product", { data: { id } });

    if (response.status !== 200) {
        throw new Error(`Error al eliminar el producto: ${response.statusText}`);
    }

    return response.data;
};