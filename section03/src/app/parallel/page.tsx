import Link from "next/link";

export default function Page() {
    return (
        <div>
            parallel page
            <div>
                <Link href={"/parallel"}>parallel</Link>
                &nbsp;
                <Link href={"/parallel/setting"}>setting</Link>
            </div>
        </div>
    )
}