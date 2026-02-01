import type { AxiosError, AxiosResponse } from 'axios';
import type { ApiResponse, RequestError } from './request';

// SDK 成功响应类型
interface SdkSuccess<T> extends AxiosResponse<ApiResponse<T>> {
  error: undefined
}

// SDK 错误响应类型
interface SdkError<T> extends AxiosError<ApiResponse<T>> {
  data: undefined
  error: unknown
}

// SDK 返回的联合类型
type SdkResult<T> = SdkSuccess<T> | SdkError<T>;

/**
 * 从 SDK 响应中提取业务数据
 *
 * @example
 * ```ts
 * // 使用前
 * const response = await postApiUserLogin({ body: { email, password } });
 * const loginData = response.data.data;
 *
 * // 使用后
 * const loginData = await unwrap(postApiUserLogin({ body: { email, password } }));
 * ```
 */
export async function unwrap<T>(promise: Promise<SdkResult<T>>): Promise<T> {
  const result = await promise;

  // 处理错误情况
  if (result.error !== undefined) {
    throw result.error;
  }

  // 返回业务数据
  return result.data!.data as T;
}

/**
 * 从 SDK 响应中提取完整响应（包含 code, message, data）
 *
 * @example
 * ```ts
 * const response = await unwrapResponse(postApiUserLogin({ body: { email, password } }));
 * console.log(response.code, response.message, response.data);
 * ```
 */
export async function unwrapResponse<T>(promise: Promise<SdkResult<T>>): Promise<ApiResponse<T>> {
  const result = await promise;

  if (result.error !== undefined) {
    throw result.error;
  }

  return result.data!;
}

/**
 * 安全执行 SDK 请求，返回 [data, error] 元组
 * 不会抛出异常，适合需要手动处理错误的场景
 *
 * @example
 * ```ts
 * const [data, error] = await safeUnwrap(postApiUserLogin({ body: { email, password } }));
 * if (error) {
 *   console.error('登录失败:', error);
 *   return;
 * }
 * console.log('登录成功:', data);
 * ```
 */
export async function safeUnwrap<T>(
  promise: Promise<SdkResult<T>>,
): Promise<[T, null] | [null, RequestError | Error]> {
  try {
    const result = await promise;

    if (result.error !== undefined) {
      return [null, result.error as RequestError | Error];
    }

    return [result.data!.data as T, null];
  }
  catch (error) {
    return [null, error as RequestError | Error];
  }
}
