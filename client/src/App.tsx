import { useAppViewModel } from './app.vm';
import './App.css';

function App() {
  const {
    users,
    user,
    userId,
    userId2,
    userId3,
    email,
    email2,
    age,
    age2,
    isSubscribed,
    setUserId,
    setUserId2,
    setUserId3,
    setEmail,
    setEmail2,
    setAge,
    setAge2,
    setIsSubscribed,
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
  } = useAppViewModel();

  return (
    <div className="App">
      <div className="container">
        <form>
          <button onClick={getAllUsers}>Get All Users</button>
        </form>
        <form>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={event => setUserId(event.target.value)}
          />
          <button onClick={getOneUser}>Get One User</button>
        </form>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={event => setAge(event.target.value)}
          />
          <button onClick={createNewUser}>Create User</button>
        </form>
        <form>
          <input
            type="text"
            placeholder="User ID"
            value={userId2}
            onChange={event => setUserId2(event.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email2}
            onChange={event => setEmail2(event.target.value)}
          />
          <input
            type="text"
            placeholder="Age"
            value={age2}
            onChange={event => setAge2(event.target.value)}
          />
          <label>
            Is Subscribed
            <input
              type="checkbox"
              name="IsSubscribed"
              checked={isSubscribed}
              onChange={event => setIsSubscribed(Boolean(event.target.checked))}
            />
          </label>

          <button onClick={updateUser}>Update User</button>
        </form>
        <form>
          <input
            type="text"
            placeholder="User ID"
            value={userId3}
            onChange={event => setUserId3(event.target.value)}
          />
          <button onClick={deleteUser}>Delete User</button>
        </form>
        <form></form>
      </div>
      <div className="container2">
        <ul>
          <h2>All Users:</h2>
          {users.map(({ id, email, age }) => (
            <li key={id}>
              <div>User ID: {id}</div>
              <div>Email: {email}</div>
              <div>Age: {age}</div>
            </li>
          ))}
        </ul>
        {user && (
          <div>
            <h2>One user:</h2>
            <div>
              <div>User ID: {user.id}</div>
              <div>Email: {user.email}</div>
              <div>Age: {user.age}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
