//Ceci c'est pour faire mon button Cliquez
"use client";
import styles from "./Button.module.css";
import { useRouter } from "next/navigation";

const MyComponent = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/users/new");
  };

  return (
    <button
      onClick={handleRedirect}
      style={{ margin: "20px" }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
    >
      Cliquez
    </button>
  );
};

export default MyComponent;
