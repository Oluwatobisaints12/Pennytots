import moment from 'moment';

export function timeAgo(time: string) {
  let timeNow = moment(time).fromNow();
  if (timeNow === 'a few seconds ago' || timeNow === 'a minute ago') {
    return 'Just now';
  } else {
    return timeNow;
  }
}
