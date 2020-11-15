import React from "react";

const Annotation = ({ startTime, endTime, id, wavesurfer }: Props) => {
    return <div onClick={() => wavesurfer.current.play(startTime, endTime)}>Annotation</div>;
}

export default Annotation;

interface Props {
    startTime: String,
    endTime: String,
    id: Number,
    wavesurfer: React.RefObject<Function>
}