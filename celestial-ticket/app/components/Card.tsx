import { FlatList, Image, Text, View } from "react-native";

type IMovie = {
    id: number;
    title: string;
    genre: string;
    duration: string;
    description: string;
    thumbnail: string;
    cast: string[];
    ageRating: string;
};

const movies: IMovie[] = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        duration: "148 min",
        description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        thumbnail: "https://static.vecteezy.com/system/resources/thumbnails/024/646/930/small/ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        ageRating: "PG-13",
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        duration: "152 min",
        description:
            "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        thumbnail: "https://example.com/dark_knight.jpg",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        ageRating: "PG-13",
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "Adventure",
        duration: "169 min",
        description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        thumbnail: "https://example.com/interstellar.jpg",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        ageRating: "PG-13",
    },
    {
        id: 4,
        title: "The Matrix",
        genre: "Sci-Fi",
        duration: "136 min",
        description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        thumbnail: "https://example.com/matrix.jpg",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        ageRating: "R",
    },
    {
        id: 5,
        title: "The Godfather",
        genre: "Crime",
        duration: "175 min",
        description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        thumbnail: "https://example.com/godfather.jpg",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        ageRating: "R",
    },
    {
        id: 6,
        title: "Forrest Gump",
        genre: "Drama",
        duration: "142 min",
        description:
            "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        thumbnail: "https://example.com/forrest_gump.jpg",
        cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
        ageRating: "PG-13",
    },
    {
        id: 7,
        title: "The Shawshank Redemption",
        genre: "Drama",
        duration: "142 min",
        description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        thumbnail: "https://example.com/shawshank.jpg",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        ageRating: "R",
    },
    {
        id: 8,
        title: "Pulp Fiction",
        genre: "Crime",
        duration: "154 min",
        description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        thumbnail: "https://example.com/pulp_fiction.jpg",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
        ageRating: "R",
    },
    {
        id: 9,
        title: "Fight Club",
        genre: "Drama",
        duration: "139 min",
        description:
            "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        thumbnail: "https://example.com/fight_club.jpg",
        cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
        ageRating: "R",
    },
    {
        id: 10,
        title: "Avatar",
        genre: "Adventure",
        duration: "162 min",
        description:
            "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fcat&psig=AOvVaw0jNrupM1qjTVWKeEvJ7qxb&ust=1735879453770000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCgrYWd1ooDFQAAAAAdAAAAABAE",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        ageRating: "PG-13",
    },
];

export default function Card() {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 gap-y-4"
            // data={[...new Array(10)]}
            data={movies}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View className="w-[45%] m-2 bg-white rounded-lg shadow-md">
                        <Image 
                        className="h-24"
                        src={item.thumbnail}
                        />
                        {/* <View className="h-24 bg-gray-300" /> */}
                        <Text className="p-2 text-center">{item.title}</Text>
                    </View>
                );
            }}
        />
        // <View className="w-[45%] m-2 bg-white rounded-lg shadow-md">
        //     <View className="h-24 bg-gray-300" />
        //     <Text className="p-2 text-center"></Text>
        // </View>
    );
}
