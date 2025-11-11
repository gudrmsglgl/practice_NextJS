import { ReactNode, useState, useEffect } from "react";
import style from "./SearchableLayout.module.css";
import { useRouter } from "next/router";


export default function SearchableLayout(
    { children }: { children: ReactNode }
) {
    const router = useRouter();
    const { d: query }: { d?: string } = router.query;

    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(query || "");
    }, [query]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const onSubmit = () => {
        if (!search || query === search) return;
        router.push(`/search?d=${search}`)
    };

    return (
        <div>
            <div className={style.search_container}>
                <input
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    type="text"
                    placeholder="책 제목을 입력해주세요." />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}