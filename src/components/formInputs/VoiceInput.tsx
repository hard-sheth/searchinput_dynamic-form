import * as React from "react";
// import "regenerator-runtime/runtime";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";

function VoiceInput(props:any) {
  console.log(props, 'voice input props');
  
  const [record, setRecord] = React.useState(false);
  // const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    // useSpeechRecognition();
  // React.useEffect(() => {
  //   if (record) {
  //     //   setValue(prop_Name, transcript);
  //   }
  // }, [transcript]);
  const btnPressed = () => {
    // resetTranscript();
    // SpeechRecognition.startListening({ continuous: true });
    setRecord(true);
  };
  const btnReleased = () => {
    setRecord(false);
    // SpeechRecognition.stopListening();
  };
  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  return (
    <div className="position-relative">
      <input type="text" className="form-control rounded-pill py-2" />

      <div
        className="position-absolute end-0 top-0 bottom-0"
        onMouseDown={() => btnPressed()}
        onMouseUp={btnReleased}
      >
        <button type="button" className="btn btn-success rounded-circle">
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
}

export default VoiceInput;
