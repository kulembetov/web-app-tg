import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FoodCard from "@/components/FoodCard/FoodCard.tsx";
import Loader from "@/components/Loader/Loader.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  dragItem,
  loadMeals,
  removeSelected,
  selectCard,
  setHoverState,
  setPage,
  setScrollOpacity,
} from "@/store/foodSlice";
import { RootState } from "@/store";
import { useAppDispatch } from "@/store/hooks.ts";
import { Food } from "@/types";

const FoodList = () => {
  const dispatch = useAppDispatch();
  const {
    foods,
    positions,
    loading,
    error,
    currentPage,
    itemsPerPage,
    selectedCards,
    scrollOpacity,
    isHovered,
  } = useSelector((state: RootState) => state.foodList);

  const draggedItem = useRef<number | null>(null);

  useEffect(() => {
    dispatch(loadMeals());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0.5, 1 - scrollPosition / 300);
      if (!isHovered) {
        dispatch(setScrollOpacity(newOpacity));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHovered, dispatch]);

  const totalPages = Math.ceil(foods.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedFoods = [...foods].sort((a, b) => {
    const posA =
      positions.find((pos) => pos.idMeal === a.idMeal)?.position ?? 0;
    const posB =
      positions.find((pos) => pos.idMeal === b.idMeal)?.position ?? 0;
    return posA - posB;
  });

  const currentFoods = sortedFoods.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSelectCard = (id: number) => {
    dispatch(selectCard(id));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected());
  };

  const handleDragStart = (id: number) => {
    draggedItem.current = id;
  };

  const handleDrop = (id: number) => {
    if (draggedItem.current !== null) {
      dispatch(dragItem({ draggedId: draggedItem.current, droppedId: id }));
      draggedItem.current = null;
    }
  };

  const handleMouseEnter = () => {
    dispatch(setHoverState(true));
    dispatch(setScrollOpacity(1));
  };

  const handleMouseLeave = () => {
    dispatch(setHoverState(false));
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className="sticky top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 flex justify-center items-center gap-3 border-4 border-black-500 w-fit z-10 rounded-3xl transition-opacity duration-300"
            style={{ opacity: scrollOpacity }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button variant="default">Add</Button>
            <Button
              variant="default"
              onClick={handleRemoveSelected}
              disabled={selectedCards.length === 0}
            >
              Remove
            </Button>
            <Button variant="default" disabled={selectedCards.length === 0}>
              Checkout
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-5 my-20">
            {error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              currentFoods.map((food: Food) => (
                <FoodCard
                  key={food.idMeal}
                  id={food.idMeal}
                  name={food.strMeal}
                  description={food.strInstructions.substring(0, 100) + "..."}
                  price={`$9.99`}
                  selected={selectedCards.includes(food.idMeal)}
                  onSelect={handleSelectCard}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                />
              ))
            )}
          </div>

          <div
            className="sticky bottom-5 bg-background shadow-xl border-4 border-black-500 bg-opacity-90 flex justify-center items-center gap-2 py-4 rounded-3xl transition-opacity duration-300"
            style={{ opacity: scrollOpacity }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
