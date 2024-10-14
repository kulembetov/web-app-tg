import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMealById } from "@/api/foodApi.ts";
import { Meal } from "@/api/foodApi";
import { Button } from "@/components/ui/button.tsx";
import Loader from "@/components/Loader/Loader";

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const meal = await fetchMealById(id!);
        setFood(meal);
      } catch (e) {
        console.error(e);
        setError("Failed to load meal details.");
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [id]);

  const handleGetBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (!food) {
    return <div className="text-center">Food not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen mx-auto my-10">
      <img
        src={food.strMealThumb}
        alt={food.strMeal}
        className="w-full max-w-lg rounded-3xl object-cover"
      />

      <h1 className="text-3xl font-bold text-center my-5">{food.strMeal}</h1>

      <p className="text-lg max-w-3xl text-center px-4">
        {food.strInstructions}
      </p>

      <Button
        variant="default"
        className="mt-5 px-4 py-2"
        onClick={handleGetBack}
      >
        Get Back
      </Button>
    </div>
  );
};

export default FoodDetail;
