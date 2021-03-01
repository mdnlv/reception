import { openDB } from 'idb';



const dbPromise = openDB('rbstore', 1, {
    upgrade(db) {
      db.createObjectStore('store');
    },
  });
  
  export async function get(key:string) {
    return (await dbPromise).get('store', key);
  }
  export async function set<T>(key:string, val:T){
    return (await dbPromise).put('store', val, key);
  }
  export async function del(key:string) {
    return (await dbPromise).delete('store', key);
  }
  export async function clear() {
    return (await dbPromise).clear('store');
  }
  export async function keys() {
    return (await dbPromise).getAllKeys('store');
  }
  