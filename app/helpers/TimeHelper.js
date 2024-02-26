export function toHHMMSS(secs) {
  // toHHMMSS(129600) // 36:00:00
  // toHHMMSS(13545) // 03:45:45
  // toHHMMSS(180) // 03:00
  // toHHMMSS(18) // 00:18

  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}