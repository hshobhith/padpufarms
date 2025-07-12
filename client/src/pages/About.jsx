import lingappaImg from "../assets/images/Lingappa Gowda.jpeg"; // Update the path as needed

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-green-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Padpu Farms</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg">
          Pioneers of natural honey cultivation in the heart of the Western Ghats since 1983.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed mb-8">
          Padpu Farms is a team of independent beekeepers from Sullia Taluk, Dakshina Kannada District, Karnataka.
          Since 1983, we have been cultivating and extracting Multi-Floral Natural Honey from the Apis Cerena species.
          Our practices are rooted in the pristine Western Ghats, including the Pushpagiri Reserve Forest and coastal regions,
          ensuring sustainable and eco-friendly honey production.
        </p>
      </div>

      {/* Founder Section */}
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src={lingappaImg}
            alt="Lingappa Gowda Padpu"
            className="w-64 h-64 object-cover rounded-full border-4 border-green-700 shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-green-800">Lingappa Gowda Padpu</h2>
            <p className="mt-2 text-gray-700">Founder, 40+ years in Apiculture</p>
            <ul className="list-disc ml-5 mt-4 text-gray-600 space-y-1">
              <li>District-level Best Agriculturist (2014–15)</li>
              <li>Kempegowda Jayanti Taluk-level Award (2024)</li>
              <li>Best Agriculturist of the Year (2023–24)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Meet Our Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "Vivek Padpu",
              role: "Trainer & Developer",
              details: "15+ years experience • Modern Youth Apiculturist 2022",
            },
            {
              name: "Keerthan Pare",
              role: "Trainer",
              details: "10+ years experience",
            },
            {
              name: "Astik Chithadka",
              role: "Trainer",
              details: "10+ years experience",
            },
            {
              name: "Vineeth Tanteppady",
              role: "Trainer",
              details: "10+ years experience",
            },
            {
              name: "Akshay Kumar Madabhakilu",
              role: "Trainer",
              details: "3+ years experience",
            },
            {
              name: "Kaushik Kolpe",
              role: "Business Promoter",
              details: "",
            },
          ].map((member, i) => (
            <div key={i} className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-green-700">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="text-sm text-gray-500 mt-2">{member.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

