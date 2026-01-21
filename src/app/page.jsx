"use client";

import { useState, useEffect } from "react";

export default function CompaniesPage() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");

  // Load data from DB when page starts
  useEffect(function() {
    fetch('/api/companies')
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setList(data);
      });
  }, []);

  // Function to add new company
  async function handleAdd() {
    if (name === "" || size === "") {
      alert("Please fill name and size");
      return;
    }

    const myNewObject = {
      name: name,
      size: Number(size),
      industry: industry,
      budget: Number(budget)
    };

    const res = await fetch('/api/companies', {
      method: 'POST',
      body: JSON.stringify(myNewObject)
    });

    if (res.ok === true) {
      const resultFromServer = await res.json();
      setList([...list, resultFromServer]);
      
      setName("");
      setSize("");
      setIndustry("");
      setBudget("");
    }
  }

  // Function to delete from DB
  async function removeItem(id) {
    const res = await fetch('/api/companies?id=' + id, {
      method: 'DELETE'
    });

    if (res.ok === true) {
      const newList = list.filter(function(item) {
        return item._id !== id;
      });
      setList(newList);
    }
  }

  // LOGIC SECTION: Find the biggest company and create the UI element
  let summarySection = null;
  if (list.length > 0) {
    let biggest = list[0];
    for (let i = 1; i < list.length; i++) {
      if (list[i].size > biggest.size) {
        biggest = list[i];
      }
    }
    
    // Building the summary UI inside a simple variable
    summarySection = (
      <div className="p-3 bg-dark text-white rounded mt-4">
        The Largest Company is {biggest.name} from the {biggest.industry} section.
      </div>
    );
  }

  return (
    <div className="container mt-5" dir="ltr">
      <h2 className="mb-4">Leading Market Companies</h2>

      {/* Input Form */}
      <div className="card bg-light p-4 mb-4 border-0 shadow-sm">
        <div className="row g-2">
          <div className="col-sm-3">
            <input className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-sm-3">
            <input className="form-control" placeholder="Size" type="number" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
          <div className="col-sm-2">
            <input className="form-control" placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
          <div className="col-sm-2">
            <input className="form-control" placeholder="Budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div className="col-sm-2">
            <button className="btn btn-success w-100" onClick={handleAdd}>Add Company</button>
          </div>
        </div>
      </div>

      {/* List display */}
      <div className="mb-4">
        {list.map(function(item) {
          return (
            <div key={item._id} className="p-3 mb-2 bg-white border rounded d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold text-primary">{item.name}</div>
                <div className="text-muted small">
                   Size: {item.size} employees | Industry: {item.industry} | Budget: {item.budget.toLocaleString()} ILS
                </div>
              </div>
              <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Displaying the summary variable only if it has content */}
      {summarySection}

    </div>
  );
}