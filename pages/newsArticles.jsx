import * as contentful from "contentful";
import Link from "next/link";
import Image from "next/image";

const client = contentful.createClient({
  space: `${process.env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
});

export default function newsArticles({ articles }) {
  return (
    <div>
      <h1>News Articles</h1>
      <div>
        {articles.map((article) => (
          <div key={article.fields.articleId}>
            <a><Link href={`/newsArticles/${article.sys.id}`}><h2>{article.fields.title}</h2></Link></a>
            <Image 
              width={article.fields.thumbnail.fields.file.details.image.width} 
              height={article.fields.thumbnail.fields.file.details.image.height}
              src={'https:' + article.fields.thumbnail.fields.file.url}>
            </Image>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const resp = await client.getEntries();
  const articles = resp.items;

  articles.forEach( article => console.log(article.fields.thumbnail.fields.file));

  return {
    props: {
      articles: articles,
    },
    revalidate: 60
  };
}
