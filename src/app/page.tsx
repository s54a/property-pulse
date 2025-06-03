// import { Metadata } from "next";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "test",
// };

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Welcome to Property Pulse</h1>
      <Link href="/properties">Properties</Link>
    </div>
  );
};

export default HomePage;
