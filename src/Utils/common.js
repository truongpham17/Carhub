import { Linking, Platform } from 'react-native';

const defaultFunction = () => {};

function openUrl(url: string): Promise<any> {
  return Linking.openURL(url);
}
export function openSmsUrl(phone: string, body: string): Promise<any> {
  return openUrl(`sms:${phone}${getSMSDivider()}`);
}
function getSMSDivider(): string {
  return Platform.OS === 'ios' ? '&' : '?';
}

export { defaultFunction };
