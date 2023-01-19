// import "./App.css";
import DropzoneComponent from "./components/DropzoneComponent";
import CustomPaginationActionsTable from "./components/Table";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { StoreProvider } from "./context/store";
// import ProtectedRoute from "./middleware/ProtectedNavigation";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DropzoneComponent />,
    },

    {
      path: "/2",
      element: <CustomPaginationActionsTable />,
    },

    // {
    //   path: "/3",
    //   element: <StepThree />,
    // },

    // {
    //   path: "/",
    //   element: <Start />,
    // },

    // {
    //   path: "/4",
    //   element: <Game />,
    // },
  ]);
  return (
    <>
      {/* <StoreProvider> */}
        <RouterProvider router={router} />
   
      {/* </StoreProvider> */}
    </>
  );
}

export default App;
