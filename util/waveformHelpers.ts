import React from "react";

export const getWaveform = (waveContainer: React.RefObject<HTMLDivElement>, 
                            waveTimelineContainer: React.RefObject<HTMLDivElement>) => {
    const WaveSurfer = require("wavesurfer.js");
    const TimelinePlugin = require("wavesurfer.js/dist/plugin/wavesurfer.timeline.min");
    const RegionsPlugin = require("wavesurfer.js/dist/plugin/wavesurfer.regions.min");

    const wavesurfer = WaveSurfer.create({
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

    return wavesurfer;
}

export const addRegion = (wavesurfer: React.RefObject<Object>, 
                          startTime: String,
                          endTime: String) => {
    // @ts-ignore: Object is possibly 'null'.
    let regionData = wavesurfer.current.addRegion({
        start: startTime,
        end: endTime,
        drag: false,
        resize: false,
        color: "rgba(0, 0, 0, 0.1)"
    });

    return regionData.id;
}

export const hasAnnotationConflict = (annotations: Array<Annotation>, startTime: Number, endTime: Number) => {
    for(let annotation in annotations) {
        const checkStart = Number(annotations[annotation].startTime);
        const checkEnd = Number(annotations[annotation].endTime);

        if(checkStart < startTime && startTime < checkEnd ||
            startTime < checkEnd && endTime > checkEnd ||
            startTime < checkStart && endTime > checkStart ||
            checkStart < endTime && checkEnd > endTime) {
          return true;      
        }
    }

    return false;
}

interface Annotation {
    startTime: String,
    endTime: String
}