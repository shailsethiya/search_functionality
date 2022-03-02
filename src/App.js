import * as React from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [value, setValue] = React.useState("");

  const f = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();

    setUsers(json.data);
  };

  const handleSearch = (e) => {
    const data = users.filter((user) =>
      user.first_name.includes(e.target.value)
    );
    setValue(e.target.value);
    setUsers(data);
  };

  React.useEffect(() => {
    f();
  }, []);

  return (
    <div className="App">
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        <input
          type="text"
          name="search"
          value={value}
          placeholder="search"
          onChange={handleSearch}
        />
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img
                  key={user.avatar}
                  src={user.avatar}
                  alt={user.first_name}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
