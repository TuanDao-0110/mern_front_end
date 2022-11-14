import { Routes, Route, Navigate } from 'react-router-dom'
import DashLayout from './component/DashLayout';
import Layout from './component/Layout';
import Login from './features/auth/Login';
import Public from './component/Public';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList.jsx'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote.jsx'
import NewNote from './features/notes/NewNote.jsx'
import Prefetch from './features/auth/Prefetch';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          {/* Route with index will shown up in Parent Outlet */}
          <Route index element={<Public></Public>} ></Route>
          <Route path='login' element={<Login></Login>}></Route>

          <Route element={<Prefetch></Prefetch>}>
            <Route path='dash' element={<DashLayout></DashLayout>}>
              <Route index element={<Welcome></Welcome>}></Route>
              <Route path='users'>
                <Route index element={<UsersList></UsersList>}></Route>
                <Route path=':id' element={<EditUser />}></Route>
                <Route path='new' element={<NewUserForm />}></Route>

              </Route>
              <Route path='notes'>
                <Route index element={<NotesList></NotesList>}></Route>
                <Route path=':id' element={<EditNote />}></Route>
                <Route path='new' element={<NewNote />}></Route>
              </Route>
            </Route> {/* End Dash route*/}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
