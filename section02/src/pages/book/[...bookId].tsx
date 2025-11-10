
import { useRouter } from "next/router"
export default function Page() {
    const router = useRouter();

    return <h1>{`Book2 ${router.query.bookId}`}</h1>
}