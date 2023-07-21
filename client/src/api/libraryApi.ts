import { ConfigApi } from "./configApi";


export class LibraryApi {
    // PARTS API
    public static async getParts(): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().get('parts').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async getPart(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().get(`parts/${id}`).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async createPart(part: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().post('parts', part).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async updatePart(part: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().put(`parts/${part.id}`, part).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    // SHELFS API
    public static async getShelves(): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().get('shelves').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async getShelf(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().get(`shelves/${id}`).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async createShelf(shelf: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().post('shelves', shelf).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async updateShelf(shelf: any): Promise<any> {
        return new Promise((resolve, reject) => {
            ConfigApi.LibraryApi().put(`shelves/${shelf.id}`, shelf).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}