import { ReactNode } from "react";
import SearchableLayout from "../../components/SearchableLayout";
import BookItem from "@/components/BookItem";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/libs/fetch-books";


export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const { d: query }: { d?: string } = context.query;
    const cleanQuery = query || "";

    const searchBooks = await fetchBooks(cleanQuery);

    return {
        props: {
            searchBooks
        }
    }
}


export default function SearchPage(
    { searchBooks }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    console.log(searchBooks);
    return (
        <div>
            {searchBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    )
}

SearchPage.applySearchableLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
