import BookItem from "@/components/book-item";
import { Suspense } from "react";
import type { BookData } from "@/types";
import delay from "@/util/delay";

async function SearchBooks({ q }: { q: string }) {
  await delay(2000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>도서 검색 실패</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q} fallback={<div>Loading...</div>}>
      <SearchBooks q={q || ""} />
    </Suspense>
  )
}
