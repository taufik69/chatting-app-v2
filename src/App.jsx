import Registration from "./Pages/Registration/Index";
import Login from "./Pages/Login/Index";
import Home from "./Pages/Home/Index";
import Message from "./Pages/Message/Index";
import Group from "./Pages/GroupPage/Index";
import Friendpage from "./Pages/FriendPage/Index";
import Peoplepage from "./Pages/PeoplePage/Index";
import Settings from "./Pages/SettingPage/Index";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/message" element={<Message />}></Route>
      <Route path="/group" element={<Group />}></Route>
      <Route path="/friend" element={<Friendpage />}></Route>
      <Route path="/people" element={<Peoplepage />}></Route>
      <Route path="/setting" element={<Settings />}></Route>
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
