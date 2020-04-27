import ApolloClient, { gql } from "apollo-boost";
import DirectoryItem from "../types/DirectoryItem";
import File from "../types/File";

const client = new ApolloClient({
  uri: "https://react-test.atlasconsulting.cz/",
});

const QUERIES = {
  listFolder: (id?: string) => gql`
    {
      getList(id: ${id ? `"${id}"` : "null"}) {
        id
        name
        type
      }
    }
  `,

  getFile: (id: string) => gql`
    {
      getFile(id: "${id}") {
        id
        name
        text
      }
    }
  `,
};

const getFolderContent = async (id?: string): Promise<DirectoryItem[]> => {
  const result = await client.query({
    query: QUERIES.listFolder(id),
  });
  return result.data.getList as DirectoryItem[];
};

const getFileDetails = async (id: string): Promise<File | null> => {
  const result = await client.query({
    query: QUERIES.getFile(id),
  });
  return result.data.getFile as File;
};

export default {
  getFolderContent,
  getFileDetails,
};
