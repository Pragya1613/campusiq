import PublicLayout from "../layouts/PublicLayout";

function HomePage() {
  return (
    <PublicLayout>
      <div className="p-10">
        <h1 className="text-5xl font-bold text-blue-600">
          CampusIQ
        </h1>
      </div>
    </PublicLayout>
  );
}

export default HomePage;