import { CIPHER_IV, CIPHER_KEY } from '@/constants';
import { AesEncryption } from './cipher';

type Key = string;

// 约束 stroage class 的方法
interface StorageCls {
  /**
   * 设置存储 localStorage 内容
   * @param key 存储 key
   * @param value 存储值
   * @returns
   */
  set: <T>(key: Key, value: T) => void;
  /**
   * 获取存储 localStorage 某项
   * @param key
   */
  get: <T>(key: Key, remove?: boolean) => T | null;
  remove: (key: Key) => void;
  clear: () => void;
}

const prefixKey = 'my_';
const key = CIPHER_KEY;
const iv = CIPHER_IV;

const encryption = new AesEncryption({ key, iv });

class LocalCacha implements StorageCls {
  private prefixKey?: string;
  private encryption: AesEncryption;
  constructor() {
    this.prefixKey = prefixKey;
    this.encryption = encryption;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set<T = any>(key: Key, value: T) {
    const stringData = JSON.stringify(value);
    const stringfiyValue = this.encryption.encryptByAES(stringData);
    localStorage.setItem(this.getKey(key), stringfiyValue);
  }

  get<T = any>(key: Key): T | null {
    const val = localStorage.getItem(this.getKey(key));
    if (!val) return null;
    try {
      const decVal = this.encryption.decryptByAES(val);
      const data = JSON.parse(decVal);
      return data;
    } catch (error) {
      return null;
    }
  }

  remove(key: Key) {
    localStorage.removeItem(this.getKey(key));
  }

  clear() {
    localStorage.clear();
  }
}

const localCacha = new LocalCacha();

export default localCacha;
