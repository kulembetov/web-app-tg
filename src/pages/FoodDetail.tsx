import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearFoodDetail, loadMealById } from "@/store/foodSlice"; // Redux action
import { RootState } from "@/store"; // Root state type
import { Button } from "@/components/ui/button.tsx";
import Loader from "@/components/Loader/Loader";
import { useAppDispatch } from "@/store/hooks";

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    foodDetail: food,
    loading,
    error,
  } = useSelector((state: RootState) => state.foodList);

  useEffect(() => {
    if (id) {
      dispatch(loadMealById(Number(id)));
    }

    return () => {
      dispatch(clearFoodDetail());
    };
  }, [dispatch, id]);

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
      {loading ? (
        <Loader />
      ) : (
        <img
          src={food.image_url}
          alt={food.name}
          className="w-full max-w-lg rounded-3xl object-cover"
        />
      )}
      <h1 className="text-3xl font-bold text-center my-5">{food.name}</h1>

      <p className="text-lg max-w-3xl text-center px-4">{food.description}</p>

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
