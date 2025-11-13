import { useRouter } from "next/router"
import { ReactNode } from "react";
import SearchableLayout from "../../components/SearchableLayout";
import books from "@/mock/books.json";
import BookItem from "@/components/BookItem";

export default function SearchPage() {
    const router = useRouter();

    return (
        <div>
            {books.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    )
}

SearchPage.applySearchableLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
