"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RiWhatsappLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Home() {
  const [number, setNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getUrl = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getUrl`);
      setNumber(response.data.whatsappNumber);
      setImageUrl(response.data.imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  if (loading) {
    return (
      <div className="flex bg-black text-white text-3xl items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={()=>router.push(`https://wa.me/${number}`) } className="relative w-screen h-screen overflow-hidden">
      {/* Background blurred image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: "blur(12px) brightness(0.5)",
          transform: "scale(1.1)",
          zIndex: -1
        }}
      />
      
      {/* Content container */}
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        <div className="w-full flex flex-col items-center">
          {/* Main image */}
          <div className="w-full mb-6">
            <img 
              src={imageUrl} 
              alt="Main Image" 
              className="w-full h-auto object-contain max-h-[80vh]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
              }}
            />
          </div>
          
          {/* WhatsApp button */}
          <a 
            href={`https://wa.me/${number}`}
            className="group transform transition-all duration-300 hover:scale-105 mb-6"
          >
            <button className="py-4 px-10 bg-green-600 hover:bg-green-700 text-white text-xl rounded-lg font-bold shadow-lg flex items-center gap-3 transition-all duration-300">
              <span className="text-sm">Message Us on WhatsApp</span> 
              <RiWhatsappLine className="size-7 group-hover:animate-pulse" />
            </button>
          </a>
        </div>
        
        {/* Optional footer */}
        <div className="absolute bottom-4 text-white text-opacity-80 text-sm">
          © {new Date().getFullYear()} - Connect with us
        </div>
      </div>
    </div>
  );
}