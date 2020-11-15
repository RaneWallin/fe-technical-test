import React, { useEffect, useState } from "react";
import PlaySVG from "../assets/svg/play.svg"

const Annotation = ({ startTime, endTime, id, wavesurfer }: Props) => {
    const [error, setError] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const annotations = wavesurfer.current.regions.list;
        const myStart = Number(startTime);
        const myEnd = Number(endTime);

        for(let annotation in annotations) {
            const {start, end} = annotations[annotation];

            if(start < myStart && myStart < end ||
                myStart < end && myEnd > end ||
                myStart < start && myEnd > start ||
                start < myEnd && end > myEnd) {
                    setError("!");
            }
        }
    }, []);

    const handleClick = () => {
        wavesurfer.current.play(startTime, endTime);
    }

    return (
        <div className="flex flex-row container rounded-lg bg-gray-200 my-1 py-5 px-6 hover:bg-gray-400">
            <div className="flex flex-row justify-start items-center w-56 text-xs">
                <span className="mr-3">Annotation { id }</span>
                <PlaySVG className="w-3 h-3 mr-3 fill-current stroke-current" onClick={handleClick} />
                <span >{ startTime } - { endTime }</span>
            </div>
            <div className="text-red-600 font-bold text-md ml-3">{ error } Overlaps with another annotation</div>
        </div>
        
    );
}

export default Annotation;

interface Props {
    startTime: String,
    endTime: String,
    id: Number,
    wavesurfer: React.RefObject<Object>
}

interface AnnotationObject {
    start: Number,
    end: Number
}