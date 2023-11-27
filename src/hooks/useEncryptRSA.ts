import { getPublickKey } from '@/apis/mock';
import JSEncrypt from 'jsencrypt';

/**
 * 信息加密工具，使用后端回传的公钥进行加密，主要用于密码加密
 * @param text 加密文本
 * @returns
 */
const useEncryptRSA = async (text?: string) => {
  if (!text) return '';
  const encrypt = new JSEncrypt();
  const { data } = await getPublickKey();
  encrypt.setPublicKey(data);
  const excrypted = encrypt.encrypt(text);
  if (!excrypted) return '';
  return excrypted;
};

export default useEncryptRSA;
