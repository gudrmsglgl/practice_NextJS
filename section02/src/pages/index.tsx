import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "../components/SearchableLayout";

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스  dd</h1>
      <h2 className={style.h2}>인덱스 2</h2>
    </>
  );
}


Home.applySearchableLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}