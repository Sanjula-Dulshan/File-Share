import { DropZone } from "@/components/DropZone";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl">Got a File? Share it with your friends!</h1>

      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
        <DropZone />
      </div>
    </div>
  );
}
