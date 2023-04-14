import { message } from "antd";

import { storage } from "./storage";

const theRealFetch = window.fetch;
interface FetchOptions {
  method?: string;
  params?: BodyInit;
  // 请求头内容类型，不传时为json
  contentType?: HeaderContentEnum;
  [key: string | number | symbol]: unknown;
}

interface baseResponseData<B> {
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

enum HeaderContentEnum {
  json = "application/json;charset=utf-8",
  formdata = "multipart/form-data",
  urlencode = "application/x-www-form-urlencoded",
  text = "text/plain",
  octetstream = "application/octet-stream",
  img = "image/*",
  audio = "audio/*",
  video = "video/*",
}

enum statusCodeEnum {
  ServerInteralError = 500,
  LoginAgain = 401,
}

const handleLoginAgain = () => {
  storage.clear();
  window.location.href = "/login";
  message.error("登录失效，请重新登录！");
};

const handleServerInteralError = () => {
  message.error("服务器内部错误，请稍后再试！");
};

const statusCodeEnumMap: Record<statusCodeEnum, () => void> = {
  [statusCodeEnum.ServerInteralError]: handleServerInteralError,
  [statusCodeEnum.LoginAgain]: handleLoginAgain,
};

// 默认请求头的contentType定为formData
const baseRequestHeader = {
  "Content-Type": HeaderContentEnum.json,
};

// 超时时间
const timeout = 15000;

// const requestControllers: Map<string, AbortController> = new Map();

function fetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const { method = "GET", contentType, params, ...restOptions } = options;

  const newParams = contentType ? params : JSON.stringify(params);
  // 请求头类型处理
  const requestHeader = new Headers({ ...baseRequestHeader });

  if (url === "/login") {
    requestHeader["Content-Type"] = HeaderContentEnum.urlencode;
  }
  if (contentType) {
    requestHeader["Content-Type"] = contentType;
  }

  // 添加token
  const token = storage.get("token");
  requestHeader.append("Authorization", `Bearer ${token}`);

  //  监控当前请求
  const requestController = new AbortController();
  // // 将当前请求装入request
  // requestControllers.set(url, requestController);

  const signal = requestController.signal;

  // 发起请求
  const fetchPromise = theRealFetch(url, {
    method,
    headers: requestHeader,
    body: newParams,
    signal,
    ...restOptions,
  })
    .then((response: FetchResponse<T>) => {
      return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  // 超时逻辑
  const timeoutPromise = new Promise<FetchResponse<T>>((_, reject) => {
    setTimeout(() => {
      requestController.abort();
      reject(new Error("请求超时"));
    }, timeout);
  });

  return Promise.race([fetchPromise, timeoutPromise])
    .then((response) => {
      const { data: baseRes } = response;
      if (!baseRes) {
        // 如果有接口返回没有data的场景，则需要在这里做处理
        return;
      }
      const { code, ...rest } = baseRes;
      if (code === 500) {
        // 500且后端没拒绝该请求时前端进行reject
        return Promise.reject(rest);
      }
      return baseRes;
    })
    .catch((error) => {
      // 处理超时错误
      if (error.name === "AbortError") {
        return Promise.reject({ code: 408, message: "Request timed out" });
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
      return error;
    })
    .finally(() => {
      // 关闭fetch请求
      requestController.abort();
    });
}

export default fetch;
