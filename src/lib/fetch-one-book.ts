import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = "https://onebite-books-server-gamma.vercel.app/book/" + id;

  try {
    const respsonse = await fetch(url);
    if (!respsonse.ok) {
      throw new Error();
    }

    return await respsonse.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
