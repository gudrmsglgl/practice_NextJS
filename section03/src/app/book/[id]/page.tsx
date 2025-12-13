import { notFound } from "next/navigation";
import style from "./page.module.css";

import ReviewEditor from "@/components/review-editor";
import Reviewitem from "@/components/review-item";
import { ReviewData } from "@/types";
import Image from "next/image";
import { BookData } from "@/types";
import { Metadata } from "next";

//export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();
  return books.map((book) => ({ id: book.id.toString() }));
}

async function BookDetail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: "force-cache" }
  )
  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }

    return <div>도서 조회 실패</div>;
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title} 책 표지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return <div>{reviews.map((review) => <Reviewitem key={review.id} {...review} />)}</div>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }
    throw new Error(`Metadata fetch failed: ${response.statusText}`);
  }

  const book = await response.json();

  return {
    title: `${book.title} : 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  )
}
