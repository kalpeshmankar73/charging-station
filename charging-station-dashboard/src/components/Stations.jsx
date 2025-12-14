import { useEffect, useState } from "react";

function Stations() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStationId, setEditingStationId] = useState(null);

  const [formData, setFormData] = useState({
    station_name: "",
    location_address: "",
    pin_code: "",
    connector_type: "",
    status: "Operational",
    image_url: "",
    location_link: "",
  });

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/stations");
    const res = await response.json();
    setData(res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createStation = async () => {
    const response = await fetch("http://localhost:3000/stations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setShowForm(false);
      setFormData({
        station_name: "",
        location_address: "",
        pin_code: "",
        connector_type: "",
        status: "Operational",
        image_url: "",
        location_link: "",
      });
      fetchData(); // refresh list
    }
  };

  const saveStation = async () => {
    if (editingStationId) {
      // Update existing station
      const response = await fetch(
        `http://localhost:3000/stations/${editingStationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setEditingStationId(null);
        setShowForm(false);
        setFormData({
          station_name: "",
          location_address: "",
          pin_code: "",
          connector_type: "",
          status: "Operational",
          image_url: "",
          location_link: "",
        });
        fetchData(); // refresh list
      }
    } else {
      // Create new station
      createStation();
    }
  };

  const deleteStation = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this station?"
    );
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/stations/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchData(); // refresh the list after deletion
    } else {
      alert("Failed to delete station");
    }
  };

  return (
    <div className="p-4">
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full h-full sm:h-auto sm:max-w-3xl bg-white sm:rounded-xl p-6 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="mb-6 text-xl font-semibold">
              {editingStationId
                ? "Edit Charging Station"
                : "Add Charging Station"}
            </h2>

            {/* Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="station_name"
                placeholder="Station Name"
                value={formData.station_name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="location_address"
                placeholder="Location Address"
                value={formData.location_address}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="pin_code"
                placeholder="Pin Code"
                value={formData.pin_code}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="connector_type"
                placeholder="Connector Type (CCS)"
                value={formData.connector_type}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="image_url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="location_link"
                placeholder="Google Maps Link"
                value={formData.location_link}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                className="border p-2 rounded"
              >
                <option value="Operational">Operational</option>
                <option value="Maintainance">Maintainance</option>
                <option value="Inactive">Inactive</option>
                <option value="Limited Availabiltiy">
                  Limited Availabiltiy
                </option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded bg-gray-200 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={saveStation}
                className="rounded bg-sky-600 px-5 py-2 text-white hover:bg-sky-700"
              >
                {editingStationId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {data.length === 0 && !showForm && (
  <div className="flex flex-col items-center justify-center py-20">
    <p className="mb-4 text-gray-500">
      No charging stations available
    </p>

    <button
      onClick={() => {
        setEditingStationId(null);
        setFormData({
          station_name: "",
          location_address: "",
          pin_code: "",
          connector_type: "",
          status: "Operational",
          image_url: "",
          location_link: "",
        });
        setShowForm(true);
      }}
      className="rounded-lg bg-sky-600 px-6 py-2 text-white hover:bg-sky-700"
    >
      ➕ Create Station
    </button>
  </div>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((station) => (
          <div
            key={station.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src={station.image_url}
                alt={station.station_name}
              />
            </div>

            {/* Content */}
            <div className="mt-4">
              <h2 className="text-base font-semibold text-gray-800">
                {station.station_name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {station.location_address}, {station.pin_code}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  🔌 {station.connector_type}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded-full flex items-center justify-center text-center ${
                    station.status === "Operational"
                      ? "bg-green-100 text-green-700"
                      : station.status === "Maintainance"
                      ? "bg-orange-100 text-orange-700"
                      : station.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : station.status === "Limited Availability"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {station.status}
                </span>
              </div>
              <a
                href={station.location_link}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-sm text-sky-600 font-medium hover:underline"
              >
                View Map →
              </a>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                title="Add"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
                onClick={() => setShowForm(true)}
              >
                ➕
              </button>

              <button
                title="Edit"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
                onClick={() => {
                  setShowForm(true);
                  setEditingStationId(station.id); // save id of station being edited
                  setFormData({
                    station_name: station.station_name,
                    location_address: station.location_address,
                    pin_code: station.pin_code,
                    connector_type: station.connector_type,
                    status: station.status,
                    image_url: station.image_url,
                    location_link: station.location_link,
                  });
                }}
              >
                ✏️
              </button>

              <button
                title="Delete"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-red-100"
                onClick={() => deleteStation(station.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stations;