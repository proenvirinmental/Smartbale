import React, { useState } from "react";

export default function SmartBaleAI() {
  const [supplier, setSupplier] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const analyzeBale = () => {
    setResult({
      composition: {
        HDPE_Natural: 30,
        HDPE_Coloured: 15,
        PET_Clear: 22,
        PP_Rigid: 10,
        Contaminants: 18,
        Other: 5,
      },
      valuePerTonne: 218,
      confidence: 89,
      recommendation: "Accept – High-value load from trusted supplier"
    });
  };

  const handleLogin = () => {
    if (password === "ProE5%") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 40, maxWidth: 400, margin: 'auto' }}>
        <h2>Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>SmartBale AI Analysis</h2>

      <div>
        <label>Supplier:</label>
        <input value={supplier} onChange={(e) => setSupplier(e.target.value)} />
      </div>

      <div>
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div>
        <label>Notes:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div>
        <label>Bale Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="preview" style={{ width: 200, marginTop: 10 }} />}
      </div>

      <button onClick={analyzeBale}>Analyze Bale</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>AI Results</h3>
          <ul>
            {Object.entries(result.composition).map(([key, val]) => (
              <li key={key}>{key.replace(/_/g, ' ')}: {val}%</li>
            ))}
          </ul>
          <p><strong>Estimated Bale Value:</strong> £{result.valuePerTonne} / tonne</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>
        </div>
      )}
    </div>
  );
}
