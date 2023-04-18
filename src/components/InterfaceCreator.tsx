import { FC, useContext, useMemo, useState } from "react";
import Paper from "./Paper";
import { Button, IconButton } from "./Buttons";
import { Property } from "./PropertyInput";
import { PROPERTY_TYPES } from "../constants/enums";
import { IDContext } from "../contexts/IdContext";
import InterfaceObject from "./InterfaceObject";
import { HasErrorContextProvider } from "../contexts/HasErrorContext";
import propertyToInterfaceString from "../utils/propertyToInterfaceString";
import pencilIcon from "../assets/pencil.svg";
import useToggle from "../hooks/useToggle";
import WriteModal from "./WriteModal";

interface InterfaceCreatorProps {
  fullWidth?: boolean;
}

const InterfaceCreator: FC<InterfaceCreatorProps> = ({ fullWidth }) => {
  const getId = useContext(IDContext);

  const [property, setProperty] = useState<Property>({
    id: 0,
    name: "root",
    type: PROPERTY_TYPES.OBJECT,
    properties: [],
  });
  const [writeModal, toggleWriteModal] = useToggle(false);

  const generatedInterface = useMemo(() => {
    return propertyToInterfaceString(property);
  }, [property]);

  const setProperties = (properties: Property[]) => {
    setProperty({
      ...property,
      properties,
    });
  };

  const addProperty = () => {
    const nextId = getId!();
    const uniqueName = `addName${nextId}`;
    setProperties([
      ...property.properties,
      {
        id: nextId,
        name: uniqueName,
        type: PROPERTY_TYPES.STRING,
        required: true,
        properties: [],
      },
    ]);
  };

  // uncomment this to see how i am using the state structure :
  // console.log(property);

  return (
    <div
      className="flex items-center gap-3 flex-col px-2 md:text-base text-sm w-full"
      style={fullWidth ? { width: "100%" } : {}}
    >
      <Paper className="md:w-[800px] w-full">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full bg-gray-50 p-1"
        >
          <header className="flex gap-2 items-center px-8 py-2">
            <label className="text-gray-500 font-bold mr-auto">
              Field name and type
            </label>
            <IconButton
              icon={<img src={pencilIcon} alt="edit" />}
              onClick={toggleWriteModal}
              title="Write your interface"
            />
            <IconButton icon="+" onClick={addProperty} title="Add new Field" />
          </header>
          <main>
            <InterfaceObject
              rootObject
              properties={property?.properties}
              setProperties={setProperties}
              // addProperty={addProperty}
            />
          </main>
        </form>
      </Paper>
      <Paper className="md:w-[800px] w-full px-10">
        <header className="flex items-center gap-2">
          <label className="text-gray-500 font-bold py-2 mr-auto">
            Generated Interface
          </label>
          <Button onClick={() => console.log(generatedInterface)}>Save</Button>
        </header>
        <div>
          <pre>{generatedInterface}</pre>
        </div>
      </Paper>
      <WriteModal
        open={writeModal}
        onClose={toggleWriteModal}
        setProperty={setProperty}
      />
    </div>
  );
};

export default function InterfaceCreatorProviderWrapped() {
  return (
    <HasErrorContextProvider>
      <InterfaceCreator />
    </HasErrorContextProvider>
  );
}
