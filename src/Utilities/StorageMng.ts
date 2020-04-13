class Storage {
  public store(name: string, entity: any) {
    try {
      const serializedData = JSON.stringify(entity);
      localStorage.setItem(name, serializedData);
    } catch {
      // tslint:disable-next-line: no-console
      console.log("can not save in storage");
    }
  }

  public retrieve(name: string) {
    try {
      const serializedData = localStorage.getItem(name);
      if (serializedData === null) {
        return undefined;
      }
      return JSON.parse(serializedData);
    } catch {
      return undefined;
    }
  }

  public delete(name: string) {
    try {
      localStorage.removeItem(name);
    } catch {
      // tslint:disable-next-line: no-console
      console.log("delete storage error");
    }
  }
}

export const storage = new Storage();
