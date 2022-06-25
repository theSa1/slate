import { Button, Modal, TextInput } from "@mantine/core";
import { useState } from "react";

export const InitialSlateModel = ({
  isOpen,
  onSave,
}: {
  isOpen: boolean;
  onSave: (id: string) => void;
}) => {
  const [id, setId] = useState("");

  return (
    <Modal
      centered
      opened={isOpen}
      withCloseButton={false}
      onClose={() => {}}
      title="Enter Slate Id"
    >
      <TextInput
        label="Slate ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button
        fullWidth
        mt="sm"
        onClick={() => {
          onSave(id);
        }}
      >
        Save
      </Button>
    </Modal>
  );
};
