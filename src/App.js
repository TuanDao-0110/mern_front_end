import { Routes, Route } from 'react-router-dom'
import DashLayout from './component/DashLayout';
import Layout from './component/Layout';
import Login from './features/auth/Login';
import Public from './component/Public';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList.jsx'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          {/* Route with index will shown up in Parent Outlet */}
          <Route index element={<Public></Public>} ></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='dash' element={<DashLayout></DashLayout>}>
            <Route index element={<Welcome></Welcome>}></Route>
            <Route path='notes'>
              <Route index element={<NotesList></NotesList>}></Route>
            </Route>
            <Route path='users'>
              <Route index element={<UsersList></UsersList>}></Route>
            </Route>
          </Route> {/* End Dash route*/}
        </Route>
      </Routes>
    </>
  );
}

export default App;
