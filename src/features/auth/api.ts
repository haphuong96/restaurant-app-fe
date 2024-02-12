import { AxiosResponse } from "axios";
import { PUBLIC_API } from "../base";
import { SignInForm } from "./types";
import { handleApiError } from "../utils";

export const signIn = async(credential: SignInForm) => {
    try {
        const res : AxiosResponse = await PUBLIC_API.post("auth/login/", credential);
        localStorage.setItem("profile", JSON.stringify(res.data));

        return { error: null, data: res.data};
    } catch (error) {
        console.log('error', error);
        return handleApiError(error);
    }
}

export const refreshToken = async(refresh: string) => {
    try {
        const res : AxiosResponse = await PUBLIC_API.post("auth/refresh/", { refresh });

        localStorage.setItem("profile", JSON.stringify(res.data));

        return { error: null, data: res.data};
    } catch (error) {
        return handleApiError(error);
    }
}