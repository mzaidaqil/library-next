// app/(root)/page.tsx
import { Button } from '@/components/ui/button';
import BookOverview from '@/components/BookOverview';
import BookList from '@/components/BookList';
import { sampleBooks } from '@/app/constants';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';

const Home = async () => {

  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));

  return(
  <>
    <BookOverview {...sampleBooks[0]} />
    <section className="mt-10">
      <BookList title="Popular Books" books={sampleBooks} containerClassName="mt-10" />
    </section>
  </>
  )
};

export default Home;
