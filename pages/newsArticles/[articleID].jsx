import * as contentful from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const client = contentful.createClient({
  space: `${process.env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
});

export default function Article(props) {
    if(props.error) {
        return(
            <div>
                <h1>No article found</h1>
            </div>
        )
    }
    
    return(
        <div>
            <h1>{props.title}</h1>
            <div>{documentToReactComponents(props.body)}</div>
        </div>
    )
}

export async function getStaticPaths() {
    const articles = await client.getEntries();

    console.log(articles.items);

    const paths = articles.items.map( article => ({
        params: {
            articleID: article.sys.id
        }
    }))
    return {
        fallback: false,
        paths,
    }
}

export async function getStaticProps(context) {
    let resp;
    let errorMessage;
    try {
        resp = await client.getEntry(context.params.articleID);
    } catch(err) {
        errorMessage = err;
    }
    
    if(resp) {
        return {
            props: {
                title: resp.fields.title,
                body: resp.fields.body
            },
        }
    }
    else {
        return {
            props: {
                error: `Error: ${errorMessage}`
            },
        }
    }
    
}

