import { useNavigate } from "react-router";
import { message } from "antd";

import { delay as delayFn, storage } from "@/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
enum HeaderContentEnum {
  json = "application/json;charset=utf-8",
  formdata = "multipart/form-data;charset=utf-8",
  urlencode = "application/x-www-form-urlencoded;charset=utf-8",
  text = "text/plain;charset=utf-8",
  octetstream = "application/octet-stream;charset=utf-8",
  img = "image/*;charset=utf-8",
  audio = "audio/*;charset=utf-8",
  video = "video/*;charset=utf-8",
}

interface FetchOptions {
  method?: string;
  params?: BodyInit;
  // 请求头内容类型，不传时为json
  contentType?: HeaderContentEnum;
  [key: string | number | symbol]: unknown;
}

export interface HttpRequsetConfig {
  /** 请求头的content-type，默认状态下为 application/json */
  contentType?: keyof typeof HeaderContentEnum;
  /**
   * 请求header设置
   * 包含content-type，字段，默认为application/json
   */
  header?: { [x: string]: any };
  /**
   * 响应的数据类型
   */
  responseType?: "" | "arraybuffer" | "blob" | "document" | "json" | "text";
  /** 是否需要登录授权，默认为true */
  needLogin?: boolean;
  /** 报错时是否需要弹出弹窗提示，默认为true */
  showErrorMsg?: boolean;
  /**接口是否需要延迟返回数据，默认为0 */
  delay?: number;
  /** 超时限制 */
  timeout?: number;
}

export const HTTP_REQUEST_DEFAULT_CONFIG: HttpRequsetConfig = {
  /** 请求头类型默认为json */
  contentType: "json",
  /** 是否需要注册权限， 默认为true */
  needLogin: true,
  /** 是否将错误信息以msgbox的形式进行提示，默认为true */
  showErrorMsg: true,
  /** 接口是否需要延迟返回数据，默认为0 */
  delay: 0,
  /** 超时限制, 默认为15秒*/
  timeout: 15000,
};

interface baseResponseData<B = any> {
  code: number;
  message: string;
  access_token?: string;
  data?: B;
}

interface FetchResponse<T> {
  ok: boolean;
  status: number;
  statusText: string;
  data?: baseResponseData<T>;
}

const baseUrl = import.meta.env.VITE_BASE_URL as string;

const handleLoginAgain = () => {
  storage.clear();
  window.location.href = "/login";
  message.error("登录失效，请重新登录！");
};

const handleServerInteralError = () => {
  message.error("服务器内部错误，请稍后再试！");
};

enum statusCodeEnum {
  ServerInteralError = 500,
  LoginAgain = 401,
}
const statusCodeEnumMap: Record<statusCodeEnum, () => void> = {
  [statusCodeEnum.ServerInteralError]: handleServerInteralError,
  [statusCodeEnum.LoginAgain]: handleLoginAgain,
};

const getFullUrl = (url: string) => {
  return `${baseUrl}${url}`;
};

const fetchApi = (method: FetchOptions["method"] = "GET") => {
  return <T = any>(
    url: string,
    params: any = {},
    config?: HttpRequsetConfig
  ) => {
    params = params || {};
    config = { ...HTTP_REQUEST_DEFAULT_CONFIG, ...config };

    const {
      contentType,
      header,
      needLogin,
      responseType,
      showErrorMsg,
      delay,
      timeout,
    } = config;

    // 超时重发逻辑
    const controller = new AbortController();
    const signal = controller.signal;

    return new Promise<T>(async (resolve, reject) => {
      try {
        const userToken = storage.get("token");
        const navigate = useNavigate();
        if (needLogin && !userToken) {
          navigate("/login");
          return;
        }
        const fetchPromise: Promise<FetchResponse<T>> = fetch(getFullUrl(url), {
          method,
          body: params,
          signal,
          headers: {
            Accept: "application/json",
            "Content-Type": HeaderContentEnum[contentType || "json"],
            ...(needLogin ? { Authorization: `Bearer ${userToken}` } : {}),
            ...header,
          },
        });

        const timeoutPromise = new Promise<FetchResponse<T>>((_, reject) => {
          setTimeout(() => {
            controller.abort();
            reject(new Error("请求超时"));
          }, timeout);
        });

        const response = await Promise.race([fetchPromise, timeoutPromise]);
        const { data: baseRes } = response;
        if (delay) {
          await delayFn(delay);
        }
        if (!baseRes) {
          resolve({} as T);
          return;
        }

        const { code, ...rest } = baseRes;
        if (code >= 200 && code < 300) {
          resolve(rest as T);
        } else {
          if (code === 500) {
            // 500且后端没拒绝该请求时前端进行reject
            return reject(rest);
          }
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          return reject({ code: 408, message: "Request timed out" });
        }
        // 处理其他类型错误
        const {
          response: { status },
        } = error;
        if (
          status === statusCodeEnum.ServerInteralError ||
          status === statusCodeEnum.LoginAgain
        ) {
          statusCodeEnumMap[status]();
        }

        // 这个返回值需要重新配置。类型不通过的话可以进行断言
        reject(error);
      } finally {
        controller.abort();
      }
    });
  };
};

export const request = {
  get: fetchApi("GET"),
  post: fetchApi("POST"),
  put: fetchApi("PUT"),
  delete: fetchApi("DELETE"),
  option: fetchApi("OPTION"),
};
