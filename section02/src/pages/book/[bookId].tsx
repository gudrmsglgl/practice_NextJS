import { useRouter } from "next/router"

export default function Page() {
    const router = useRouter();
    const { bookId } = router.query;
    console.log(router.query);
    return <h1>Book {bookId}</h1>
}