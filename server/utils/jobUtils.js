const isJobActive = (job) => {
  if (!job.isActive) return false;

  if (!job.deadline) return true;

  const today = new Date();
  const deadline = new Date(job.deadline);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  return deadline >= today;
};

module.exports = { isJobActive };