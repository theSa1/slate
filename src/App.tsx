import { Loader, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { useIntervalWhen } from "rooks";
import { InitialSlateModel } from "./components/InitialSlateModel";
import { SettingsButton } from "./components/SettingsButton";
import { ChangeIdModel } from "./components/ChangeIdModel";
import { getData, saveData } from "./lib/functions";

function App() {
  const [text, setText] = useState("");
  const [changeIdModel, setChangeIdModel] = useState(false);
  const [isSaving, setLoading] = useState(false);
  const [loadingSlate, setLoadingSlate] = useState(true);
  const [shouldSave, setShouldSave] = useState(false);
  const [slateId, setSlateId] = useState("");
  const [enterSlateIdModel, setEnterSlateIdModel] = useState(false);
  const [textFromServer, setTextFromServer] = useState("");

  const onSave = async () => {
    setLoading(true);
    setShouldSave(false);
    await saveData(text, slateId);
    setLoading(false);
  };

  useIntervalWhen(onSave, 2000, shouldSave);

  useEffect(() => {
    if (text === textFromServer) {
      return;
    }
    setShouldSave(true);
  }, [text]);

  useEffect(() => {
    if (enterSlateIdModel === true) {
      setLoadingSlate(false);
    }
  }, [enterSlateIdModel]);

  useEffect(() => {
    if (!slateId) return;
    setLoadingSlate(true);
    localStorage.setItem("slateId", slateId);

    const unsubscribe = getData((text) => {
      setText(text);
      setTextFromServer(text);
      setLoadingSlate(false);
    }, slateId);

    return () => {
      unsubscribe();
    };
  }, [slateId]);

  useEffect(() => {
    const idOnLs = localStorage.getItem("slateId");
    if (!idOnLs) return setEnterSlateIdModel(true);
    setSlateId(idOnLs);
  }, []);

  return (
    <>
      <LoadingOverlay visible={loadingSlate} />
      <InitialSlateModel
        isOpen={enterSlateIdModel}
        onSave={(id) => {
          setSlateId(id);
          setEnterSlateIdModel(false);
        }}
      />
      <ChangeIdModel
        currentId={slateId}
        isOpen={changeIdModel}
        onClose={() => {
          setChangeIdModel(false);
        }}
        onSave={(id) => {
          setSlateId(id);
          setChangeIdModel(false);
        }}
      />
      <textarea
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          outline: "none",
          resize: "none",
          padding: "2rem",
          fontSize: "1.5rem",
          fontFamily: `'Greycliff-CF', sans-serif`,
          backgroundColor: "#121212",
          color: "#fff",
        }}
        placeholder="Start Typing..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <SettingsButton setOpen={setChangeIdModel} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        {isSaving && <Loader size="xs" color="gray" />}
      </div>
    </>
  );
}

export default App;
