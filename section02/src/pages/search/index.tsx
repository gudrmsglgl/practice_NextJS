import { useRouter } from "next/router"
import { ReactNode } from "react";
import SearchableLayout from "../../components/SearchableLayout";

export default function SearchPage() {
    const router = useRouter();

    const { d } = router.query;

    return (
        <div>
            <h1>Search Index: {d}</h1>
        </div>
    )
}

SearchPage.applySearchableLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}
