export const handleApiError = async (error: any) => {
    try {
        const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};
