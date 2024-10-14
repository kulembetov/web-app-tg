import { useEffect, useState } from "react";
import FoodCard from "@/components/FoodCard/FoodCard.tsx";
import { fetchMeals } from "@/api/foodApi.ts";
import { Meal } from "@/api/foodApi.ts";
import { Button } from "@/components/ui/button.tsx";
import Loader from "@/components/Loader/Loader.tsx";

const FoodList = () => {
  const [foods, setFoods] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const meals = await fetchMeals();
        setFoods(meals);
      } catch (error) {
        console.error("Error loading meals:", error);
        setError("Failed to load meals.");
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, []);

  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
            {error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              currentFoods.map((food) => (
                <FoodCard
                  key={food.idMeal}
                  id={food.idMeal}
                  name={food.strMeal}
                  description={food.strInstructions.substring(0, 100) + "..."}
                  price={`$${(Math.random() * 20 + 5).toFixed(2)}`}
                />
              ))
            )}
          </div>

          <div className="flex justify-center items-center gap-2 mt-auto mb-5">
            <Button
              variant="default"
              className={`px-4 py-2 rounded-3xl ${
                currentPage === 1
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-black hover:bg-gray-900"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                variant="default"
                key={index + 1}
                className={`px-4 py-2 rounded-3xl ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="default"
              className={`px-4 py-2 rounded-3xl ${
                currentPage === totalPages
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-black hover:bg-gray-900"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodList;
