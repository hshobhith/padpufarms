// pages/admin/Dashboard.jsx
export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/admin/products" className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p>View, Add, or Update products</p>
        </a>
        <a href="/admin/trainings" className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Manage Training</h2>
          <p>Create and edit training programs</p>
        </a>
        <a href="/admin/requests" className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Orders & Training Requests</h2>
          <p>View recent user actions</p>
        </a>
        <a href="/admin/faqs" className="p-4 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">User Questions</h2>
          <p>View user Questions and answers</p>
        </a>
      </div>
    </div>
  );
}
