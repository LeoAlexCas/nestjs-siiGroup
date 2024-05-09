import axios, { AxiosInstance } from "axios";
import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IHttpAdapter } from "./http-adapter.interface";

@Injectable()
export class AxiosAdapter implements IHttpAdapter {

    private axios: AxiosInstance = axios;
    public async get<T>(url:string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch(error) {
            throw new ServiceUnavailableException();
        };
    };
};