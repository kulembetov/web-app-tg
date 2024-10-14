import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Link, useNavigate } from "react-router-dom";

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  description,
  price,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/food/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="flex flex-col h-full justify-between cursor-pointer"
    >
      <CardHeader className="font-bold">
        <Link to={`/food/${id}`}>{name}</Link>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="font-bold mt-auto">{price}</CardFooter>
    </Card>
  );
};

export default FoodCard;
