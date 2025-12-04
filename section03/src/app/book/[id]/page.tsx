import { notFound } from "next/navigation";
import style from "./page.module.css";
import createReviewAction from "@/app/actions/create-review.action";

//export const dynamic = 'force-static';
export const dynamicParams = true;

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

async function BookDetail({ id }: { id: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`)
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
        <img src={coverImgUrl} />
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

function ReviewEditor({ bookId }: { bookId: string }) {

  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" type="hidden" value={bookId} readOnly />
        <input name="content" placeholder="리뷰를 입력해주세요." />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
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
    </div>
  )
}
