import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div>
            <Modal>
                <BookPage params={params} />
            </Modal>
        </div>
    )
}