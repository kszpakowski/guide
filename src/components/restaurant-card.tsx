interface RestaurantCardProps {
    restaurant: {
        id: string;
        name: string;
        address: string;
        review: string;
        tags: string[];
        distance: number;
    }
    onClick?: (id: string) => void;

}


export const RestaurantCard = (props: RestaurantCardProps) => {
    const { onClick } = props;
    const { id, name, address, review, tags, distance } = props.restaurant;

    return (
        <div onClick={() => onClick && onClick(id)} className="bg-stone-100 dark:bg-stone-900 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm">{address}</p>
            <p className="text-base">{review}</p>
            {tags.map(tag => {
                return (
                    <span key={tag} className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {tag}
                    </span>
                )
            })}
            {
                distance > 0 && (
                    <p className="text-sm text-gray-500">
                        Distance: {distance.toFixed(2)} km
                    </p>
                )
            }
        </div>
    );
}