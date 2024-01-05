import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if(!response.ok){
        return false;
      }
      const data = await response.json();
      console.log(data)
    } catch (err) {}
  };

  return (
    <form onSubmit={handleForm}>
      <input
        onChange={handleChange}
        name="user"
        placeholder="username"
        value={formData.user}
      />
      <input
        onChange={handleChange}
        name="pwd"
        placeholder="password"
        value={formData.pwd}
      />
      <input type="submit" value="submit" />
    </form>
  );
}

export default App;
