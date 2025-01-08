export const useEndpoints = () => {
    const apiBaseUrl = 'https://themealdb.com/api/json/v1/1';
    return {
        getAllRecipes: (query: string) => `${apiBaseUrl}/search.php?s=${query}`,
        getMealById: (id: string) => `${apiBaseUrl}/lookup.php?i=${id}`,
    };
};