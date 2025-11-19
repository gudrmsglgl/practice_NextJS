import { ReactNode, useState, useEffect } from "react";
import SearchableLayout from "../../components/SearchableLayout";
import BookItem from "@/components/BookItem";
import fetchBooks from "@/libs/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import MetaHead from "@/components/MetaHead";

// export const getStaticProps = async (context: GetStaticPropsContext) => {

//     const { d: query }: { d?: string } = context.query;
//     const cleanQuery = query || "";

//     const searchBooks = await fetchBooks(cleanQuery);

//     return {
//         props: {
//             searchBooks
//         }
//     }
// }


export default function SearchPage() {
    const router = useRouter();
    const { d: query }: { d?: string } = router.query;

    const [searchBooks, setSearchBooks] = useState<BookData[]>([]);

    const fetchSearchBooks = async () => {

        const cleanQuery = query || "";

        const searchBooks = await fetchBooks(cleanQuery);
        setSearchBooks(searchBooks);
    }

    useEffect(() => {
        fetchSearchBooks();
    }, [query])

    return (
        <div>
            <MetaHead />
            {searchBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    )
}

SearchPage.applySearchableLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
