import React, { useEffect, useRef } from "react";


const Waveform = ({ file }: Props) => {
    const waveContainer = useRef(null);
    const waveTimelineContainer = useRef(null);
    let wavesurfer = useRef(null);
    
      useEffect(() => {
        const WaveSurfer = require("wavesurfer.js");
        const TimelinePlugin = require("wavesurfer.js/dist/plugin/wavesurfer.timeline.min");
        wavesurfer.current = WaveSurfer.create({
          container: waveContainer.current,
          barWidth: 1,
          barHeight: 1,
          waveColor: "#fc4d36",
          progressColor: "#c83a22",
          plugins: [TimelinePlugin.create({
              container: waveTimelineContainer.current
          })]
        });

        wavesurfer.current.load(file);
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
    file: String
}