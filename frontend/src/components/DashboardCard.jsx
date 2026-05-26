function DashboardCard({
  title,
  value
}) {

  return (

    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">

      <h3 className="text-gray-400">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3 text-blue-400">
        {value}
      </p>

    </div>

  );
}

export default DashboardCard;