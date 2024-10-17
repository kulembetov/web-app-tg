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
    const posA = positions.find((pos) => pos.idMeal === a.id)?.position ?? 0;
    const posB = positions.find((pos) => pos.idMeal === b.id)?.position ?? 0;
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
    <div className="max-w-3xl md:lg:max-w-7xl lg:max-w-full mx-auto flex flex-col items-center h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className="sticky w-fit mx-auto top-5 bg-white shadow-lg p-4 flex justify-center items-center gap-3 border-4 border-black-500 z-10 rounded-3xl transition-opacity duration-300"
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

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 lg:my-20 md:m-20 sm:m-20">
            {error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              currentFoods.map((food: Food) => (
                <FoodCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  description={food.description.substring(0, 100) + "..."}
                  price={`$${food.price}`}
                  selected={selectedCards.includes(food.id)}
                  onSelect={handleSelectCard}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                />
              ))
            )}
          </div>

          <div
            className="w-fit mx-auto mt-auto sticky bottom-5 bg-background shadow-xl border-4 border-black-500 bg-opacity-90 flex justify-center items-center gap-3 p-4 rounded-3xl transition-opacity duration-300"
            style={{ opacity: scrollOpacity }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant="default"
              className={`p-4 sm:p-4 rounded-3xl text-xs lg:text-base ${
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
                className={`p-4 lg:p-4 rounded-full text-xs lg:text-base ${
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
              className={`p-4 lg:p-4 rounded-3xl text-xs sm:text-base ${
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
