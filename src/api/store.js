export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(storedType) {
    try {
      return JSON.parse(this._storage.getItem(`${this._storeKey}-${storedType}`)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(storedType, items) {
    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(items)
    );
  }

  setItem(storedType, key, value) {
    const store = this.getItems(storedType);

    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(storedType, key) {
    const store = this.getItems(storedType);

    delete store[key];

    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(store)
    );
  }
}
