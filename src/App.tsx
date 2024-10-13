import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen mx-auto my-10">
      <div className="flex gap-3">
        <Button className="rounded-xl bg-black text-white hover:bg-gray-900">
          Add
        </Button>
        <Button className="rounded-xl bg-black text-white hover:bg-gray-900">
          Remove
        </Button>
        <Button className="rounded-xl bg-black text-white hover:bg-gray-900">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default App;
