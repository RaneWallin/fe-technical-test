import React, { RefObject } from "react";


const Waveform = ({ waveContainer, waveTimelineContainer }: Props) => {
  return (
      <div>
        <div className="w-full" ref={ waveContainer }></div>  
        <div ref={ waveTimelineContainer }></div>  
      </div>

  );
}

export default Waveform;

interface Props {
    waveContainer: RefObject<HTMLDivElement>,
    waveTimelineContainer: RefObject<HTMLDivElement>
}

interface Annotation {
    startTime: String,
    endTime: String
}