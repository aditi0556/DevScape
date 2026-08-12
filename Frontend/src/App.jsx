import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // GET /users
  const fetchUsers = () => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  // Fetch users when page loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // POST /users
  const addUser = () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    fetch(
      `http://localhost:8080/users?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
      {
        method: "POST",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Clear form
        setName("");
        setEmail("");

        // Get updated users
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div>
      <h1>DevScape Users</h1>

      <h2>Add User</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
