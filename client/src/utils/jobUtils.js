// Check if job is active
export const isJobActive = (job) => {
  if (!job) return false;

  if (!job.isActive) return false;

  if (!job.deadline) return true;

  const today = new Date();
  const deadline = new Date(job.deadline);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  return deadline >= today;
};

// Check if job is expired
export const isJobExpired = (job) => {
  if (!job?.deadline) return false;

  const today = new Date();
  const deadline = new Date(job.deadline);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  return deadline < today;
};

// Format date (DD/MM/YYYY)
export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB");
};

// Format package
export const formatPackage = (pkg) => {
  return pkg ? `${pkg} LPA` : "N/A";
};