"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiWhatsappLine } from "react-icons/ri";

export default function Home() {
  const [number, setNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getUrl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getUrl");
      setNumber(response.data.whatsappNumber);
      setImageUrl(response.data.imageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  return (
    <>
      {loading && !number ? (
        <div className="flex bg-black text-white text-3xl items-center justify-center w-screen h-screen">
          Loading...
        </div>
      ) : (
        <a href={`https://wa.me/${number}`}>
          <div className=" flex flex-col w-full h-screen items-center justify-center">
            <img src={imageUrl} className="min-h-[70vh]" />
            <button className="py-4 px-14 mt-6 flex items-center gap-2 bg-green-600 text-xl rounded-lg font-bold">
              Whatsapp Us <RiWhatsappLine className="size-7" />
            </button>
          </div>
        </a>
      )}
    </>
  );
}
