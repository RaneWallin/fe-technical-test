import React, { useRef } from "react";
import { gql, useQuery } from "@apollo/client";

import Waveform from "./Waveform";
import Annotation from "./Annotation";

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
  const { loading, error, data} = useQuery(GET_AUDIO, {
    variables: { id: "papercup"}
  });
  let wavesurfer = React.createRef<Function>();

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full my-10">
      <div className="container">
        { loading && "Loading..." }
        { data && <Waveform {...data.audio} wavesurfer={wavesurfer} />  }
        { data && getAnnotations(data.audio.annotations, wavesurfer) }
        { error && "Unable to load data." }
      </div>
    </div>
  );
};

export default TaskPlayground;

const getAnnotations = (annotations: Array<Object>, wavesurfer: React.RefObject<Function>) => {
  return annotations.map((annotation, i) => 
                            <Annotation {...annotation} id={i} wavesurfer={wavesurfer} key={i} />)
}

interface Annotation {
  startTime: String,
  endTime: String
}
