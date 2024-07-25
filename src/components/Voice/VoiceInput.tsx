"use client";
import 'regenerator-runtime/runtime';
import * as React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function VoiceInput(props: ControllerRenderProps<FieldValues, string>) {
  const [value, setValue] = React.useState("");
  const [record, setRecord] = React.useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  React.useEffect(() => {
    console.log(transcript, "transcript");
    if (record) {
      setValue(transcript);
      props.onChange(transcript);
    }
  }, [transcript]);
  const btnPressed = () => {
    resetTranscript();
    setRecord(true);
    SpeechRecognition.startListening({ continuous: true });
    console.log('speech recognition start');
  };
  const btnReleased = () => {
    setRecord(false);
    console.log('speech recognition stop');
    SpeechRecognition.stopListening();
  };
  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    props.onChange(e.target.value);
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div>
      <div className="input-group mb-3 border rounded-pill z-2 has-validation">
        <input
          type="text"
          className={`form-control  border-0 shadow-none rounded-end rounded-pill z-1 `}
          value={value}
          onChange={onchange}
          />
        <button
          onMouseDown={btnPressed}
          onMouseUp={btnReleased}
          type="button"
          className="btn btn-success rounded-circle  input-group-text z-2 m-1"
        >
          <FaMicrophone />
        </button>
      </div>
      <div className="form-text text-danger">Please choose a username.</div>
    </div>
  );
}
