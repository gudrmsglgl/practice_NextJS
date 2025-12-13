import style from "./book-skeleton.module.css";

export default function BookSkeleton() {
  return (
    <div className={style.container}>
      <section>
        {/* 책 커버 이미지 영역 */}
        <div className={style.cover_img_skeleton}>
          <div className={style.img_placeholder} />
        </div>

        {/* 제목 */}
        <div className={`${style.skeleton_text} ${style.title}`} />

        {/* 부제목 */}
        <div className={`${style.skeleton_text} ${style.subTitle}`} />

        {/* 저자/출판사 */}
        <div className={`${style.skeleton_text} ${style.author}`} />

        {/* 설명 */}
        <div className={style.description}>
          {new Array(10).fill(0).map((_, index) => (
            <div className={style.skeleton_text} key={index} />
          ))}

          <div className={`${style.skeleton_text} ${style.short}`} />
        </div>
      </section>
    </div>
  );
}
