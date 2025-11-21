import { ReactNode } from "react";
import Searchbar from "./searchbar";

export default function Layout(
    { children }: { children: ReactNode }
) {
    return (
        <div>
            <h1>Searchable Layout</h1>
            <Searchbar />
            {children}
        </div>
    )
}
