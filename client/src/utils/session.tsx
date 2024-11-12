export const storeInSession = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const lookInSession = (key: string) => {
  return sessionStorage.getItem(key);
};
export const removeFromSession = (key: string) => {
  return sessionStorage.removeItem(key);
};
export const logOutUser = () => {
  return sessionStorage.clear();
};
