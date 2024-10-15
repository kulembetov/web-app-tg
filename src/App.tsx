import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoodDetail from "@/pages/FoodDetail.tsx";
import FoodList from "@/components/FoodList/FoodList.tsx";
import { Provider } from "react-redux";
import store from "@/store";
import Footer from "@/components/Footer/Footer.tsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col justify-center items-center gap-5 min-h-screen mx-auto my-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FoodList />
                </>
              }
            />
            <Route path="/food/:id" element={<FoodDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
