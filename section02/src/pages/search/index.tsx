import { useRouter } from "next/router"

export default function Page() {
    const router = useRouter();

    const { d } = router.query;

    return (
        <div>
            <h1>Search Index: {d}</h1>
        </div>
    )
}