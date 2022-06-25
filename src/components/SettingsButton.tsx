import { Settings as SettingsIcon } from "tabler-icons-react";
import { ActionIcon } from "@mantine/core";

export const SettingsButton = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
      }}
    >
      <ActionIcon
        variant="filled"
        radius={40}
        size={40}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </ActionIcon>
    </div>
  );
};
