import BookItem from "@/components/book-item";
import { Suspense } from "react";
import type { BookData } from "@/types";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

async function SearchBooks({ q }: { q: string }) {
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

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ q?: string }> }
): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || "";

  return {
    title: `${query} : 한입북스 검색`,
    description: `${query}의 검색 결과입니다`,
    openGraph: {
      title: `${query} : 한입북스 검색`,
      description: `${query}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q} fallback={<BookListSkeleton count={3} />}>
      <SearchBooks q={q || ""} />
    </Suspense>
  )
}
