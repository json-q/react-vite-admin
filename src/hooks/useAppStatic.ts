import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

/**
 * 解决 Antd 无法消费静态方法，antd 的提示类的方法不再使用 antd 的，而使用由此处导出 hooks
 * @returns
 */
export default function useAppStatic() {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return { message, modal, notification };
}

export { message, modal, notification };
