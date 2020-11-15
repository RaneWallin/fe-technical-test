import React, { useEffect, useState } from "react";

import { addRegion } from "../../util/waveformHelpers";

// assets
import PlaySVG from "../assets/svg/play.svg";
import PauseSVG from "../assets/svg/pause.svg";

const Annotation = ({ startTime, 
                    endTime, 
                    id, 
                    wavesurfer, 
                    currentAnnotationPlaying, 
                    playPauseAnnotation, 
                    isPlaying,
                    hasAnnotationConflict
                   }: Props) => {
    const [annotationId, setAnnotationId] = useState(null);

    useEffect(() => {
        setAnnotationId(addRegion(wavesurfer, startTime, endTime));
    }, []);

    const handleClick = () => {
        playPauseAnnotation(startTime, endTime, annotationId);
    }

    return (
        <div className="flex flex-row container rounded-lg bg-gray-200 my-1 py-4 px-6 hover:bg-gray-400">
            <div className="flex flex-row justify-start items-center w-56 text-xs">
                <span className="mr-3">Annotation { id }</span>
                {
                    (isPlaying && annotationId === currentAnnotationPlaying) ?
                    <PauseSVG className="w-3 h-3 mr-3 fill-current stroke-current" onClick={handleClick} />:
                    <PlaySVG className="w-3 h-3 mr-3 fill-current stroke-current" onClick={handleClick} />
                }
                <span >{ startTime } - { endTime }</span>
            </div>
            <div className="text-red-600 font-bold text-sm float-right">
                <span className="text-md">{ hasAnnotationConflict && "🔺 Overlaps with another annotation" }</span> 
            </div>
        </div>
        
    );
}

export default Annotation;

interface Props {
    startTime: String,
    endTime: String,
    id: Number,
    wavesurfer: React.RefObject<Object>,
    currentAnnotationPlaying: String,
    playPauseAnnotation: Function,
    isPlaying: boolean,
    hasAnnotationConflict: boolean
}

interface AnnotationObject {
    start: Number,
    end: Number
}