import { FC, useContext, useState } from "react";
import Paper from "./Paper";
import { IconButton } from "./Buttons";
import { ObjectProperty, Property } from "./PropertyInput";
import { PROPERTY_TYPES } from "../constants/enums";
import { IDContext } from "../contexts/IdContext";
import InterfaceObject from "./InterfaceObject";

interface InterfaceCreatorProps {
  fullWidth?: boolean;
}

const InterfaceCreator: FC<InterfaceCreatorProps> = ({ fullWidth }) => {
  const getId = useContext(IDContext);
  const [property, setProperty] = useState<ObjectProperty>({
    id: 0,
    name: "name",
    type: PROPERTY_TYPES.OBJECT,
    properties: [],
  });

  const setProperties = (properties: Property[]) => {
    setProperty({
      ...property,
      properties,
    });
  };

  const addProperty = () => {
    const nextId = getId!();
    setProperties([
      ...property.properties,
      {
        id: nextId,
        name: "addName",
        type: PROPERTY_TYPES.STRING,
        properties: [],
      },
    ]);
  };

  console.log(property);
  return (
    <Paper className="md:w-[800px] w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        style={fullWidth ? { width: "100%" } : {}}
        className="w-full bg-gray-50 p-1"
      >
        <header className="flex justify-between items-center px-8 py-2">
          <label className="text-gray-500 font-bold ">
            Field name and type
          </label>
          <IconButton icon="+" onClick={addProperty} />
        </header>
        <main>
          <InterfaceObject
            rootObject
            properties={property?.properties}
            setProperties={setProperties}
            addProperty={addProperty}
          />
        </main>
      </form>
    </Paper>
  );
};

export default InterfaceCreator;
