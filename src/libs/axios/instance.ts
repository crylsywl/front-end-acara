import environment from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CuntomSession extends Session {
    accessToken?: string;
}

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000
})

instance.interceptors.request.use(
    async (request) => {
        const session : CuntomSession | null = await getSession();
        if (session && session.accessToken) {
            request.headers.Authorization = `Barer ${session.accessToken}`;
        }
        // You can add any request interceptors here
        return request;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) => {
        // You can add any response interceptors here
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
)

export default instance;