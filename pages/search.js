import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { API_KEY, CONTEXT_KEY } from "../Keys";
import Response from "../Response";
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults";

function Search(results) {
  const Router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>{Router.query.term} - google search</title>
      </Head>
      <Header />
      {/* search result */}
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || "0";

  const data = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
  ).then((res) => res.json());

  //AFTER SRR will done, pass the result to the client
  return {
    props: {
      results: data,
    },
  };
}
