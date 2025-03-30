"use client"

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { RestaurantCard } from "@/components/restaurant-card";
const firebaseConfig = {
  apiKey: "AIzaSyBSBr64-l7LyEB7_L7mb8sOYg4VRrxQQTQ",
  authDomain: "restaurants-a9658.firebaseapp.com",
  projectId: "restaurants-a9658",
  storageBucket: "restaurants-a9658.firebasestorage.app",
  messagingSenderId: "720735233401",
  appId: "1:720735233401:web:c45078a02876530d577ba8",
  measurementId: "G-6XQX9XC2FX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export default function Home() {
  // const analytics = getAnalytics(app);

  const [restaurants, setRestaurants] = useState<{
    id: string;
    tags: string[];
    name: string;
    address: string;
    review: string;
  }[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const onTagClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const tag = (e.target as HTMLSpanElement).innerText;
    console.log(tag)

    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    }
    else {
      setTags([...tags, tag]);
    }
  }

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const q = query(collection(db, "restaurants"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        setRestaurants(querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          address: doc.data().address,
          review: doc.data().review,
          tags: doc.data().tags,
        })));

      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    }
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => {
    if (tags.length === 0) {
      return true;
    } else {
      return tags.every(tag => r.tags.includes(tag));
    }

  }
  );


  return (
    <div className="p-4">
      <div className="p-4">{Array.from(new Set(filteredRestaurants.flatMap(r => r.tags))).map(t => {
        return (
          <span key={t} onClick={onTagClick} className={
            "inline-block cursor-pointer text-xs font-semibold m-1 px-4 py-2 rounded" +
            (tags.includes(t) ? " bg-blue-500 text-white" : " bg-blue-200 text-blue-800")
          }>
            {t}
          </span>
        )
      })}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRestaurants.map(r => (
          <RestaurantCard restaurant={r} key={r.id} />
        ))}
        {filteredRestaurants.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <p className="text-center text-gray-500">No restaurants found</p>
          </div>
        )}

      </div>

    </div>
  );
}
