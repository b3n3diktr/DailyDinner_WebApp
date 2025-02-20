import axios from 'axios';

// API client configuration
const apiClient = axios.create({
    //baseURL: 'http://localhost:3000/api/recipes',
    baseURL: "https://daily-dinner.com/api/recipes",
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// Define TypeScript interface for API responses
interface ApiResponse<T> {
    message: string;
    data: T;
    nextCursor?: string | null;
}

interface Tag {
    id: number;
    name: string;
    tag: string;
}

interface Category {
    id: number;
    name: string;
    category: string;
}


export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    cookingTime: number;
    preparationTime: number;
    servings: number;
    rating: number;
    image_filename: string | null;
    created_at: string;
    user_id: string;
    source: string | null;
    tags: Tag[];
    categories: Category[];
}

export class ApiRecipe {
    private static readonly BASE_URL = 'http://localhost:3000/api/recipes';

    static async getRandomRecipes(count: number) {
        const response = await apiClient.post('/getrandomrecipes', { count });
        return response.data;
    }

    static async getPaginatedRecipes(page: number, pageSize: number) {
        const response = await apiClient.get(`/paginated?page=${page}&size=${pageSize}`);
        return response.data as ApiResponse<Recipe[]>;
    }

    static async getRecipeById(id: string) {
        const response = await apiClient.get(`/${id}`);
        return response.data;
    }

    static async createRecipe(recipeData: any) {
        const response = await apiClient.post('/', recipeData);
        return response.data;
    }

    static async updateRecipe(id: string, recipeData: any) {
        const response = await apiClient.put(`/${id}`, recipeData);
        return response.data;
    }

    static async deleteRecipe(id: string) {
        const response = await apiClient.delete(`/${id}`);
        return response.data;
    }

    static getImageUrl(filename: string | null): string {
        if (!filename) {
            return `${this.BASE_URL}/image/default-recipe.jpg`;
        }
        return `${this.BASE_URL}/image/${encodeURIComponent(filename)}`;
    }

}