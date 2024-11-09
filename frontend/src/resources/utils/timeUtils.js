export const formatTimeText = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  return `${minutes} min ${remainingSeconds} sec`;
};
