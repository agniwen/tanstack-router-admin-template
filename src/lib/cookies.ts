import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, options?: Cookies.CookieAttributes) {
  return Cookies.set(name, value, options);
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string, options?: Cookies.CookieAttributes) {
  return Cookies.remove(name, options);
}
