import "@/assets/styles/globals.css";
import { title } from "process";

export const metadata = {
  title: "Property Pulse | Find The Perfect Rental",
  description:
    "Property Pulse is a platform that helps you find the perfect rental property.",
  keywords:
    "property, rental, real estate, apartment, flat, house, home, find properties, find rentals, property search, property rental, property finder, apartment search, apartment rental, apartment finder, flat search, flat rental, flat finder, house search, house rental, house finder",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
export default layout;
