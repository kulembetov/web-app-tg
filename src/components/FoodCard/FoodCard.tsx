import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

export interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  selected: boolean;
  onSelect: (id: number) => void;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  description,
  price,
  selected,
  onSelect,
  onDragStart,
  onDrop,
}) => {
  const navigate = useNavigate();
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`food/${id}`);
  };

  return (
    <Card
      onClick={handleSelect}
      className={clsx(
        "flex flex-col h-full justify-between cursor-pointer w-full",
        selected ? "border-4 border-black" : "border-4 border-black-500",
        "w-[350px] md:w-[400px] lg:w-[400px] sm:p-2",
        "p-4"
      )}
      draggable
      onDragStart={() => onDragStart(id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(id)}
    >
      <CardHeader
        onClick={handleClick}
        className={clsx("font-bold", "text-sm", "md:text-lg")}
      >
        <Link to={`/food/${id}`}>{name}</Link>
      </CardHeader>
      <CardContent
        onClick={handleClick}
        className={clsx("text-sm", "md:text-lg")}
      >
        {description}
      </CardContent>
      <CardFooter
        className={clsx("font-bold mt-auto", "text-sm", "md:text-lg")}
      >
        {price}
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
