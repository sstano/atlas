import ApolloClient, { gql } from "apollo-boost";
import DirectoryItem from "../types/DirectoryItem";
import File from "../types/File";

const client = new ApolloClient({
  uri: "https://react-test.atlasconsulting.cz/",
});

const QUERIES = {
  LIST_FOLDER: gql`
    {
      getList(id: null) {
        id
        name
        type
      }
    }
  `,

  GET_FILE: gql`
    {
      getFile(id: null) {
        id
        name
        text
      }
    }
  `,
};

const getFolderContent = async (id?: string): Promise<DirectoryItem[]> => {
  const result = await client.query({
    query: QUERIES.LIST_FOLDER,
    variables: { id },
  });
  return result.data.getList as DirectoryItem[];
};

const getFileDetails = async (id: string): Promise<File> => {
  const result = await client.query({
    query: QUERIES.GET_FILE,
    variables: { id },
  });

  return result.data.getFile as File;
};

export default {
  getFolderContent,
  getFileDetails,
};
