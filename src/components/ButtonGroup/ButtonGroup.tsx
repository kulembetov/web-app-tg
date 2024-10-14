import React from "react";
import { Button } from "@/components/ui/button.tsx";

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex gap-3">
      <Button variant="default">Add</Button>
      <Button variant="default">Remove</Button>
      <Button variant="default">Checkout</Button>
    </div>
  );
};

export default ButtonGroup;
