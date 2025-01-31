import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const profesion = form.profesion.value;
    const email = form.email.value;
    const user = {
      name,
      profesion,
      email,
    };
    // alert(user.email)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      ) // Capture status
      .then(({ status, body }) => {
        if (status === 400) {
          alert(body.message); // Alert "Already have an account"
        } else {
          setUsers([...users, body.user]); // Correctly update the users list
          console.log(body);
          alert("User added successfully");
        }
      })
      .catch((error) => console.log(error));

    //const sameUser = users.some((user) => user.email === email)

    // if (!sameUser) {
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUsers(...users, data)
    //     setData(data.message)
    //   })
    //   .catch((error) => console.log(error));
    // console.log(data);

    // alert("ok.Done");
    // } else {
    //   alert("you alrady have a acount");
    // }
  };

  return (
    <>
      <h1 className="text-8xl text-red-600">users length:{users.length} </h1>
      <div className="grid grid-cols-3 gap-2">
        {users.map((user) => (
          <div>
            <div className="card bg-neutral text-neutral-content ">
              <div className="card-body items-center text-center">
                <h2 className="card-title">name:{user.name} </h2>
                <p>id:{user?.id}</p>
                <div className="card-actions">
                  <p className="p-5 text-green-500">
                    profesion:{user?.profesion}
                  </p>
                  <p className="p-5 text-green-300">age:{user.age} </p>
                  <p className="p-5 text-green-800">Email:{user.email} </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">profesion</span>
              </label>
              <input
                type="name"
                placeholder="profesion"
                className="input input-bordered"
                name="profesion"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
