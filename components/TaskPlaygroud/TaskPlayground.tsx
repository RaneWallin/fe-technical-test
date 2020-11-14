import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import Waveform from "./Waveform";

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

const TaskPlayground = () => {
  const { loading, error, data } = useQuery(GET_AUDIO, {
    variables: { id: "papercup"}
  });

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full my-10">
      <div className="container">
                  <span>Waveform</span>
        { data && <Waveform file={data.audio.file} />  }
      </div>
    </div>
  );
};

export default TaskPlayground;
