import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoodDetail from "@/pages/FoodDetail.tsx";
import FoodList from "@/components/FoodList/FoodList.tsx";
import ButtonGroup from "@/components/ButtonGroup/ButtonGroup.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-center items-center gap-5 min-h-full mx-auto my-10">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ButtonGroup />
                <FoodList />
              </>
            }
          />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
