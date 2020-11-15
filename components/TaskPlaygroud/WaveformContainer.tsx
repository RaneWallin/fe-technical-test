import React, { useEffect, useState, createRef, useRef }  from "react";

// components
import Waveform from "./Waveform";
import Annotation from "./Annotation";

// helpers
import { getAudioData } from "../../util/queryHelpers";
import { getWaveform, hasAnnotationConflict } from "../../util/waveformHelpers";

const WaveformContainer = () => {
    const { loading, error, data} = getAudioData("papercup");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [currentAnnotationPlaying, setCurrentAnnotationPlaying] = useState<String>("");
    const [currentAnnotationEndTime, setCurrentAnnotationEndTime] = useState<String>("");
    const [resumeTime, setResumeTime] = useState<String>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
    let wavesurfer = useRef(null);
    let waveContainer = createRef<HTMLDivElement>();
    let waveTimelineContainer = createRef<HTMLDivElement>();
  
    useEffect(() => {
      if (loading) return;
  
      wavesurfer.current = getWaveform(waveContainer, waveTimelineContainer);
      // @ts-ignore: Object is possibly 'null'.
      wavesurfer.current.load(data.audio.file);
  
      // @ts-ignore: Object is possibly 'null'.
      wavesurfer.current.on("pause", () => {
        // Reset state values when reaching the end of the annotation
        // @ts-ignore: Object is possibly 'null'.
        if(wavesurfer.current.getCurrentTime() === currentAnnotationEndTime) {
          setCurrentAnnotationEndTime("");
          setResumeTime("");
          setCurrentAnnotationPlaying("");
        }
        
        setIsPlaying(false);
      });
  
      setIsLoaded(true);
  
      // @ts-ignore: Object is possibly 'null'.
      return () => wavesurfer.current.destroy();
    }, [loading])
  
    const playPauseAnnotation = (startTime: String, endTime: String, annotationId: String) => {
      if(isPlaying) {
        if(annotationId === currentAnnotationPlaying) {
          // @ts-ignore: Object is possibly 'null'.
          setResumeTime(wavesurfer.current.getCurrentTime());
          // @ts-ignore: Object is possibly 'null'.
          wavesurfer.current.playPause();
          setIsPlaying(false);
        }
      } else {
        if(annotationId === currentAnnotationPlaying)
          // @ts-ignore: Object is possibly 'null'.
          wavesurfer.current.play(resumeTime);
        else 
          // @ts-ignore: Object is possibly 'null'.
          wavesurfer.current.play(startTime);
        
        // @ts-ignore: Object is possibly 'null'.
        wavesurfer.current.setPlayEnd(endTime);
        setCurrentAnnotationPlaying(annotationId);
        setIsPlaying(true);
      }
    }
  
    const getAnnotations = () => {
      let { annotations } = data.audio;

    return annotations.map((annotation: AnnotationObject, i: Number) => {
            const { startTime, endTime } = annotation;

            return <Annotation {...annotation} 
                    id={i} 
                    wavesurfer={wavesurfer} 
                    key={String(i)} 
                    playPauseAnnotation={playPauseAnnotation}
                    currentAnnotationPlaying={currentAnnotationPlaying}
                    isPlaying={isPlaying}
                    hasAnnotationConflict={hasAnnotationConflict(annotations, Number(startTime), Number(endTime))}
                />;
        });

    }
  
    return (
      <div>
        <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10">
          { loading && "Loading..." }
          { 
            <Waveform waveContainer={waveContainer} 
                      waveTimelineContainer={waveTimelineContainer}
            />  
          }
          { error && "Unable to load data." }
        </div>
        { isLoaded && getAnnotations() }
      </div>
    );
}

export default WaveformContainer;

interface AnnotationObject {
    startTime: String,
    endTime: String
}