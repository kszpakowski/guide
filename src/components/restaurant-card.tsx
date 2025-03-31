interface RestaurantCardProps {
    restaurant: {
        id: string;
        name: string;
        address: string;
        review: string;
        tags: string[];
        distance: number;
    }

}


export const RestaurantCard = (props: RestaurantCardProps) => {
    const { name, address, review, tags } = props.restaurant;

    return (
        <div className="bg-stone-100 dark:bg-stone-900 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm">{address}</p>
            <p className="text-base">{review}</p>
            {tags.map(tag =>{
                return (
                    <span key={tag} className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {tag}
                    </span>
                )
            })}
            <p className="text-sm text-gray-500">
                {props.restaurant.distance > 0 ? `Distance: ${props.restaurant.distance.toFixed(2)} km` : "Distance: Unknown"}
            </p>
        </div>
    );
}