"use client";

import { useState } from "react";

export default function Searchbar() {

    const [search, setSearch] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <input type="text" placeholder="책 검색" onChange={onChange} value={search} />
            <button>검색</button>
        </div>
    )
}