import {
  useEffect,
  useState,
} from "react";

import {
  getStudentDashboard,
} from "../services/dashboardService";

function DashboardPage() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const data =
            await getStudentDashboard();

          setStats(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchDashboard();
  }, []);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Student Dashboard
      </h1>

      <h3>
        Applied:
        {stats.applied}
      </h3>

      <h3>
        Shortlisted:
        {stats.shortlisted}
      </h3>

      <h3>
        Interviews:
        {stats.interviews}
      </h3>

      <h3>
        Selected:
        {stats.selected}
      </h3>

      <h3>
        Rejected:
        {stats.rejected}
      </h3>
    </div>
  );
}

export default DashboardPage;