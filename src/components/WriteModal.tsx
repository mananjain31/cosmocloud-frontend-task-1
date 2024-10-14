import { FC, useEffect, useState } from "react";
import Paper from "./Paper";
import { Button, IconButton } from "./Buttons";
import { Property } from "./PropertyInput";
import interfaceStringToProperty from "../utils/interfaceStringToProperty";

interface WriteModalProps {
  open: boolean;
  onClose: () => void;
  setProperty: (property: Property) => void;
}

const WriteModal: FC<WriteModalProps> = ({ open, onClose, setProperty }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const validateAndImport = () => {
    try {
      const property: Property = interfaceStringToProperty(value);
      setProperty(property);
      onClose();
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, [value]);

  return open ? (
    <div className="absolute inset-0 bg-slate-100 flex justify-center items-start py-10">
      <Paper className="md:w-[800px]">
        <header className="flex justify-between items-center py-4">
          <label className="text-gray-800 font-bold mr-auto">
            Write your Interface
          </label>
          <IconButton icon={"❌"} onClick={onClose} />
        </header>
        <main>
          <textarea
            style={error ? { border: "1px solid #ff999c" } : {}}
            className="w-full h-96 bg-gray-50 p-4 rounded-md border focus:shadow-md outline-none"
            placeholder="Write your interface here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </main>
        <footer>
          <Button onClick={validateAndImport}>Submit</Button>
        </footer>
      </Paper>
    </div>
  ) : null;
};

export default WriteModal;
