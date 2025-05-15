import * as moment from 'moment-timezone';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function displayTime(needMs: boolean = false): string {
  let format: string = 'YYYY-MM-DD_HH:mm:ss';
  if (true === needMs) {
    format = `${format}.SSS`;
  }
  return moment().tz('Asia/Shanghai').format(format);
}