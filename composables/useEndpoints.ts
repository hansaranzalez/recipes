export const useEndpoints = () => {
    const apiBaseUrl = 'https://themealdb.com/api/json/v1/1';
    return {
        login: `${apiBaseUrl}/auth/login`,
        register: `${apiBaseUrl}/users/register`,
        requestPasswordChange: `${apiBaseUrl}/auth/request-password-change`,
        changePassword: `${apiBaseUrl}/auth/change-password`,
        verifyPasswordResetCode: `${apiBaseUrl}/auth/verify-password-reset-code`,
        verifyActivationCode: `${apiBaseUrl}/auth/verify-activation-code`,
        getAllRecipes: (query: string) => `${apiBaseUrl}/search.php?s=${query}`,
        getMealById: (id: string) => `${apiBaseUrl}/lookup.php?i=${id}`,
    };
};