import React, { useState } from "react";
import { PriorityQueue } from "./utils/priorityQueue";
import { FaHospital, FaBed, FaUserInjured, FaTrash, FaSearch } from "react-icons/fa";
import PieChart from "./Chart";
import "./App.css";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [beds, setBeds] = useState(10); // Total available beds
  const [queue] = useState(new PriorityQueue());
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [patientName, setPatientName] = useState("");
  const [urgency, setUrgency] = useState(1);
  const [facility, setFacility] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");

  const addPatient = () => {
    if (!patientName || !facility || !age || !gender || !condition) {
      alert("Please fill all the fields.");
      return;
    }

    const patient = { name: patientName, urgency, facility, age, gender, condition };
    queue.enqueue(patient);
    setPatients(queue.getQueue());
    setPatientName("");
    setUrgency(1);
    setFacility("");
    setAge("");
    setGender("");
    setCondition("");
  };

  const allocateBed = () => {
    if (!queue.isEmpty() && beds > 0) {
      const patient = queue.dequeue();
      setPatients(queue.getQueue());
      setBeds(beds - 1);
      setHistory([...history, patient]);
      alert(`Bed allocated to ${patient.name} (Urgency: ${patient.urgency})`);
    } else {
      alert("No beds available or no patients in the queue.");
    }
  };

  const resetSystem = () => {
    setPatients([]);
    setBeds(10);
    setHistory([]);
    queue.clear();
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bedData = {
    labels: ["Available Beds", "Occupied Beds"],
    datasets: [
      {
        label: "Bed Allocation",
        data: [beds, 10 - beds],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div className="app">
      <h1>
        <FaHospital /> Hospital Bed Allocation System
      </h1>

      <div className="stats">
        <div className="bed-status">
          <FaBed /> Beds Available: {beds}
        </div>
        <div className="chart">
        <PieChart data={bedData} />
        </div>
      </div>

      <div className="form">
        <h2>Add Patient</h2>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Urgency (1-10)"
          value={urgency}
          min="1"
          max="10"
          onChange={(e) => setUrgency(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="Required Facility"
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <textarea
          placeholder="Condition Description"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        ></textarea>
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <div className="queue">
        <h2>Patient Queue</h2>
        <input
          type="text"
          placeholder="Search by name or facility"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch />
        {filteredPatients.length === 0 ? (
          <p>No patients in queue</p>
        ) : (
          filteredPatients.map((patient, index) => (
            <div key={index} className="patient">
              <FaUserInjured />
              <span>
                {patient.name} (Age: {patient.age}, Gender: {patient.gender}, 
                Urgency: {patient.urgency}, Facility: {patient.facility}, Condition: {patient.condition})
              </span>
            </div>
          ))
        )}
      </div>

      <button className="allocate-btn" onClick={allocateBed}>
        Allocate Bed
      </button>
      <button className="reset-btn" onClick={resetSystem}>
        Reset System <FaTrash />
      </button>

      <div className="history">
        <h2>Patient History</h2>
        {history.length === 0 ? (
          <p>No patients have been allocated beds yet.</p>
        ) : (
          history.map((patient, index) => (
            <div key={index} className="patient">
              <FaUserInjured />
              <span>
                {patient.name} (Age: {patient.age}, Gender: {patient.gender}, 
                Urgency: {patient.urgency}, Facility: {patient.facility}, Condition: {patient.condition})
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
