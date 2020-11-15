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
    <div>
      <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10">
        { loading && "Loading..." }
        { data && <Waveform {...data.audio} wavesurfer={wavesurfer} />  }
        { error && "Unable to load data." }
      </div>
      { data && getAnnotations(data.audio.annotations, wavesurfer) }
    </div>
  );
};

export default TaskPlayground;

const getAnnotations = (annotations: Array<AnnotationObject>, wavesurfer: React.RefObject<Function>) => {
  return annotations.map((annotation: AnnotationObject, i) => 
                            <Annotation {...annotation} id={i} wavesurfer={wavesurfer} key={i} />)
}

interface AnnotationObject {
  startTime: String,
  endTime: String
}
