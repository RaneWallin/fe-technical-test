import React, { useEffect, useRef } from "react";


const Waveform = ({ file, annotations, wavesurfer }: Props) => {
    const waveContainer = useRef(null);
    const waveTimelineContainer = useRef(null);
    
      useEffect(() => {
        const WaveSurfer = require("wavesurfer.js");
        const TimelinePlugin = require("wavesurfer.js/dist/plugin/wavesurfer.timeline.min");
        const RegionsPlugin = require("wavesurfer.js/dist/plugin/wavesurfer.regions.min")
        wavesurfer.current = WaveSurfer.create({
          container: waveContainer.current,
          barWidth: 1,
          barHeight: 1,
          waveColor: "#fc4d36",
          progressColor: "#c83a22", 
          plugins: [
            TimelinePlugin.create({
              container: waveTimelineContainer.current
            }),
            RegionsPlugin.create()
        ]
        });

        wavesurfer.current.load(file);

        annotations.forEach(({ startTime, endTime }: Annotation, i) => {
            wavesurfer.current.addRegion({
                start: startTime,
                end: endTime,
                drag: false,
                resize: false,
                color: "rgba(0, 0, 0, 0.1)"
            });
        });

        return () => wavesurfer.current.destroy();
      },[file]);

      return (
          <div>
            <div className="w-full" ref={ waveContainer }></div>  
            <div ref={ waveTimelineContainer }></div>  
          </div>

      );
}

export default Waveform;

interface Props {
    file: String,
    annotations: Array<Annotation>,
    wavesurfer: React.RefObject<Object>
}

interface Annotation {
    startTime: String,
    endTime: String
}