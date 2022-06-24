import * as contentful from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const client = contentful.createClient({
  space: `${process.env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
});

export default function Article({ title, body }) {
    return(
        <div>
            <h1>{title}</h1>
            <div>{documentToReactComponents(body)}</div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const resp = await client.getEntry(context.params.articleID);

    return {
        props: {
            title: resp.fields.title,
            body: resp.fields.body
        }
    }
}

