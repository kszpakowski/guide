"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";

export default function RestaurantPage() {

    const { id } = useParams();

    const [restaurant, setRestaurant] = useState<{
        id: string;
        name: string;
        tags: string[];
    } | null>(null);

    const { user } = useAuth();

    const [tag, setTag] = useState<string>("");

    const setTagValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }

    useEffect(() => {
        if (!id || typeof id !== "string") {
            return;
        }

        getDoc(doc(db, "restaurants", id)).then((restaurant) => {
            if (!restaurant.exists()) {
                console.error("No restaurant found");
                return;
            }

            setRestaurant({
                id: restaurant.id,
                name: restaurant.data().name,
                tags: restaurant.data().tags,
            });
        });
    }, [id, tag]);






    const onNewTag = async () => {

        if (!id || typeof id !== "string") {
            console.error("No restaurant id found");
            return;
        }

        const restaurant = await getDoc(doc(db, "restaurants", id));

        if (!restaurant.exists()) {
            console.error("No restaurant found");
            return;
        }
        console.log(restaurant.data());

        console.log(restaurant.data());
        const update = await updateDoc(doc(db, "restaurants", id), {
            tags: restaurant.data()?.tags?.concat(tag)
        });

        console.log("Restaurant updated", update);

        setTag("");

    }

    const removeTag = async (tag: string) => {
        if (!id || typeof id !== "string") {
            console.error("No restaurant id found");
            return;
        }
        const restaurant = await getDoc(doc(db, "restaurants", id));
        if (!restaurant.exists()) {
            console.error("No restaurant found");
            return;
        }
        const tags = restaurant.data()?.tags?.filter((t: string) => t !== tag);
        const update = await updateDoc(doc(db, "restaurants", id), {
            tags
        });
        console.log("Restaurant updated", update);
        setRestaurant({
            id: restaurant.id,
            name: restaurant.data().name,
            tags
        });
    }


    return (
        <div className="container mx-auto p-4">
            <p className="text-sm">Details about the restaurant will go here.</p>

            {restaurant && (
                <>
                    <h1 className="text-2xl font-bold mb-4">{restaurant?.name}</h1>

                    <p className="text-sm mb-4">Tags:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant?.tags.map((tag) => {
                            return (
                                <span key={tag} onClick={() => removeTag(tag)} className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                    {tag}
                                </span>
                            )
                        })}
                    </div>


                    {user && (
                        <>
                            <input type="text" onChange={setTagValue} placeholder="Tag" className="border border-gray-300 rounded p-2 mb-4" />

                            {tag && (
                                <div onClick={onNewTag} className="bg-stone-100 dark:bg-stone-900 shadow-md rounded-lg p-4">
                                    Add new tag
                                </div>
                            )}

                        </>
                    )}

                </>
            )}






        </div>
    );
}