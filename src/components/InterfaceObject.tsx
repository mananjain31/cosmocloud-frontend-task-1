import { FC, useContext } from "react";
import PropertyInput, { Property } from "./PropertyInput";
import { IDContext } from "../contexts/IdContext";
import { PROPERTY_TYPES } from "../constants/enums";

interface InterfaceObjectProps {
  rootObject?: boolean;
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  addProperty?: () => void;
}

const InterfaceObject: FC<InterfaceObjectProps> = ({
  rootObject,
  properties,
  setProperties,
  addProperty,
}) => {
  const nextId = useContext(IDContext)!();
  const updateProperty = (property: Property) => {
    const index = properties.findIndex((p) => p.id === property.id);
    const newProperties = [...properties];
    newProperties[index] = property;
    setProperties(newProperties);
  };
  const removeProperty = (id: number) => {
    const newProperties = properties.filter((p) => p.id !== id);
    setProperties(newProperties);
  };
  const addPropertyOfObject = (id: number) => {
    const index = properties.findIndex((p) => p.id === id);
    const newProperties = [...properties];
    newProperties[index] = {
      ...newProperties[index],
      properties: [
        ...newProperties[index].properties,
        {
          id: nextId,
          name: "addName",
          type: PROPERTY_TYPES.STRING,
          properties: [],
        },
      ],
    };
    setProperties(newProperties);
  };

  return (
    <>
      {properties.map((property, index) => (
        <span className="flex">
          {rootObject && (
            <span className="w-6 h-10 flex items-center justify-center text-gray-400">
              {index + 1}.
            </span>
          )}
          {property.type === PROPERTY_TYPES.OBJECT ? (
            <div className="w-full">
              <PropertyInput
                update={updateProperty}
                property={property}
                key={index}
                remove={removeProperty}
                addProperty={() => addPropertyOfObject(property.id)}
              />
              <div className="pl-8">
                <InterfaceObject
                  properties={property.properties}
                  setProperties={(properties) => {
                    updateProperty({
                      ...property,
                      properties,
                    });
                  }}
                />
              </div>
            </div>
          ) : (
            <PropertyInput
              update={updateProperty}
              property={property}
              key={index}
              remove={removeProperty}
            />
          )}
        </span>
      ))}
    </>
  );
};

export default InterfaceObject;
