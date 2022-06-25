import { Button, Modal, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export const ChangeIdModel = ({
  isOpen,
  currentId,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  currentId: string;
  onClose: () => void;
  onSave: (id: string) => void;
}) => {
  const [id, setId] = useState(currentId);

  useEffect(() => {
    setId(currentId);
  }, [currentId, isOpen]);

  return (
    <Modal centered opened={isOpen} onClose={onClose} title="Change Slate">
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
