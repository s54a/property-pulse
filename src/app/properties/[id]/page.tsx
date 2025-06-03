"use client";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PropertyPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const name = searchParams.get("name");

  return (
    <div>
      <h1 className="text-3xl">Welcome to Property Pulse</h1>
      <button className="bg-blue-600 p-3" onClick={() => router.push("/")}>
        Go Home {id}
      </button>
      <p>Name: {name}</p>
      <p>Pathname: {pathname}</p>
    </div>
  );
};

export default PropertyPage;
