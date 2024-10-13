import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function Verify() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !message) {
      setLoading(false);
      return;
    }
    console.table({ email, message });
    setLoading(false);
  };

  return (
    <>
   
    
    <div className="app">
      <h2 className="app">Email Sending Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailInput">Email:</label> <br />
          <input
            id="emailInput"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="message">Message:</label> <br />
          <textarea
            id="message"
            cols={30}
            rows={10}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button>{loading ? "Loading..." : "Send Email 🚀"}</button>
      </form>
    </div>
   
    </>
  );
}

export default Verify;
