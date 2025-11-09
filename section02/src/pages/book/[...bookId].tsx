
import { useRouter } from "next/router"
export default function Page() {
    const router = useRouter();
    console.log(router.query);

    return <h1>{`Book2 ${router.query.bookId}`}</h1>
}