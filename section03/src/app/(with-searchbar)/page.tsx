import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import type { BookData } from "@/types";

async function Allbooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'no-store' }
  );
  if (!response.ok) {
    return <div>모든 도서 조회 실패</div>;
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

async function RecommandedBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`);
  if (!response.ok) {
    return <div>추천 도서 조회 실패</div>;
  }

  const recommandedBooks: BookData[] = await response.json();
  return (
    <div>
      {recommandedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommandedBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Allbooks />
      </section>
    </div>
  );
}
