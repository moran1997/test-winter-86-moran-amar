"use client";

import { useState } from "react";

export default function CompaniesPage() {
  // 1. Defining the state for our company list (The local DB)
  const [list, setList] = useState([]);
  
  // 2. Simple counter for IDs to ensure each item has a unique key
  const [nextId, setNextId] = useState(1);

  // 3. States for the input fields to capture user data
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");

  // 4. Function to add a new company to the list
  function handleAdd() {
    // 5. Basic validation to ensure fields are not empty
    if (name === "" || size === "") return;

    // 6. Creating a new object with the provided data
    const newItem = {
      id: nextId,
      name: name,
      size: Number(size),
      industry: industry,
      budget: Number(budget)
    };

    // 7. Updating the list and incrementing the ID counter
    setList([...list, newItem]);
    setNextId(nextId + 1);
    
    // 8. Clearing the input fields after successful addition
    setName("");
    setSize("");
    setIndustry("");
    setBudget("");
  }

  // 9. Function to remove a company based on its unique ID
  function removeItem(id) {
    const filtered = list.filter(item => item.id !== id);
    setList(filtered);
  }

  // 10. Logic to find the largest company using a basic loop
  let topCompany = null;
  if (list.length > 0) {
    topCompany = list[0];
    for (let i = 1; i < list.length; i++) {
      if (list[i].size > topCompany.size) {
        topCompany = list[i];
      }
    }
  }

  // 11. Helper variable to store the display for the largest company
  let largestCompanyDisplay = null;
  if (topCompany !== null) {
    largestCompanyDisplay = (
      <div style={{ marginTop: '20px', borderTop: '1px solid gray' }}>
        <p>
          The Largest Company is: <strong>{topCompany.name}</strong> from the <strong>{topCompany.industry}</strong> section.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      {/* 12. Main page heading */}
      <h1>Leading Market Companies</h1>

      {/* 13. Interface for adding new data */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Employees" type="number" value={size} onChange={(e) => setSize(e.target.value)} />
        <input placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        <input placeholder="Budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <button onClick={handleAdd}>Add Company</button>
      </div>

      {/* 14. Rendering the list of companies using paragraph tags */}
      <div>
        {list.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Name:</strong> {item.name} </p>
            <p>Size: {item.size} employees</p>
            <p>Industry: {item.industry}</p>
            <p>Budget: {item.budget} USD</p>
            
            {/* 15. Delete button for each company */}
            <button onClick={() => removeItem(item.id)}>Remove Company</button>
          </div>
        ))}
      </div>

      {/* Displaying the result of the logic from section G */}
      {largestCompanyDisplay}
    </div>
  );
}