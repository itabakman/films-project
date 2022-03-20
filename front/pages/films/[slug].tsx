import React from "react";
import { useRouter, Router } from "next/router";
import { Wrapper } from "@components/Wrapper";
import { Author } from "interfaces/film";
import Link from "next/link";

import styles from "./styles.module.scss";

type Props = {
  name: string;
  duration: number;
  author: Author;
};

const Film = ({ name, duration, author }: Props) => {
  const {
    query: { slug },
  } = useRouter();
  return (
    <Wrapper>
      <div className={styles.links}>
        <Link href="/">
          <div className={styles.link}>Back to Main</div>
        </Link>
        <Link href="/films">
          <div className={styles.link}>Back to Films</div>
        </Link>
      </div>
      <div>film slug is : {slug}</div>
      <div>Film name: {name}</div>
      <div>Duration: {duration}</div>
      {author && (
        <div>
          Author: {author?.firstName} {author?.lastName}
        </div>
      )}
    </Wrapper>
  );
};

// TODO поправить контекст
export async function getServerSideProps(context: Router) {
  // Fetch data from external API
  const res = await fetch(
    `http://localhost:5001/api/film/${context.query.slug}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { ...data } };
}

export default Film;