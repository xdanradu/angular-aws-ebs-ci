export const STORAGE_APP = 'covid-app';

export class StorageApp {
  private static get appStore(): Object {
    return JSON.parse(
      localStorage.getItem(STORAGE_APP)
        ? localStorage.getItem(STORAGE_APP)
        : '{}'
    );
  }

  private static set appStore(object: Object) {
    localStorage.setItem(STORAGE_APP, JSON.stringify(object));
  }

  public static set(name: string, value: any) {
    const appStore = this.appStore;
    appStore[name] = value;
    localStorage.setItem(STORAGE_APP, JSON.stringify(appStore));
  }

  public static remove(name: string) {
    const appStore = this.appStore;
    delete appStore[name];
    localStorage.setItem(STORAGE_APP, JSON.stringify(appStore));
  }

  public static clear() {
    const appStore = this.appStore;
    delete appStore[name];
    localStorage.removeItem(STORAGE_APP);
  }

  public static get(name: string): any {
    const appStore = this.appStore;
    return !!appStore[name] ? appStore[name] : undefined;
  }
}
