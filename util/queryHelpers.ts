import { gql, useQuery } from "@apollo/client";

const GET_AUDIO = gql`
  query($id: ID!) {
    audio(id: $id) {
      id
      title
      file
      annotations {
        startTime
        endTime
      }
  }
}
`;

export const getAudioData = (id: String) => {
    return useQuery(GET_AUDIO, {variables: { id }});
}

