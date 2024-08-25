import Image from "next/image";
import { useEffect, useState } from "react";

interface WebsiteCardProps {
  url: string;
}

interface WebsiteData {
  logo?: string;
  name?: string;
  title?: string;
  img?: string;
  description?: string;
}

export default function WebsiteCard({ url }: WebsiteCardProps) {
  const [data, setData] = useState<WebsiteData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/websites?url=${url}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch website data:", error);
      }
    };

    fetchData();
  }, [url]);
  return (
    <div className="p-4">
      {data ? (
        <div className="flex">
          <div className="bg-white w-[50rem] border-2 px-4 py-4 rounded-xl">
            <div className="flex items-center justify-center gap-2 rounded-xl">
              <Image
                height={0}
                width={30}
                src={data.logo ? data.logo : ""}
                alt={data.name ? data.name : ""}
              />
              <h1 className="font-semibold">{data.name ? data.name : ""}</h1>
            </div>
            <h1 className="my-4 border-2 p-3 rounded-xl font-semibold text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
              {data.title}
            </h1>
            <div className="flex gap-4 rounded-xl">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg h-72 w-80 object-cover"
                  src={
                    data.img
                      ? data.img
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gCpA9648HkRfJeqGdtRQaockL1jH-ai4IQ&s"
                  }
                  alt=""
                />
              </div>
              <div className="flex-grow flex flex-col gap-3">
                <div className="border-2 p-3 h-full rounded-xl flex-grow">
                  {data.description ? data.description : ""}
                </div>
                <div className="border-2 rounded-xl p-3">
                  Made with ❤️ by URLCard
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}