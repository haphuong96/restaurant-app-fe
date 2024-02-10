import { ADMIN_API, API } from "../base";
import { handleApiError } from "../utils";

export const getOrderList = async() => {
    try {
        const res = await ADMIN_API.get("order/");

        return { error: null, data: res.data};
    } catch (error) {
        return handleApiError(error);
    }
}

export const getProductList = async() => {
    try {
        const res = await ADMIN_API.get("product/");

        return { error: null, data: res.data};
    } catch (error) {
        return handleApiError(error);
    }
}