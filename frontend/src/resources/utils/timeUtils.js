export const formatTimeText = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600); 
  const minutes = Math.floor((seconds % 3600) / 60); 
  const remainingSeconds = Math.floor(seconds % 60);

  const daysText = days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : '';
  const hoursText = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''} ` : '';
  const minutesText = minutes > 0 ? `${minutes} min ` : '';
  const secondsText = `${remainingSeconds} sec`;

  return `${daysText}${hoursText}${minutesText}${secondsText}`.trim();
};