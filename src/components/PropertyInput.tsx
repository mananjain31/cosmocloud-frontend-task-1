import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { PROPERTY_TYPES, PROPERTY_TYPES_VALUES } from "../constants/enums";
import useToggle from "../hooks/useToggle";
import Toggle from "./Toggle";
import { IconButton } from "./Buttons";
import TrashIcon from "../assets/trashicon.svg";
import { hasErrorContext } from "../contexts/HasErrorContext";
export interface Property {
  id: number;
  name: string;
  type: PROPERTY_TYPES;
  required?: boolean;
  properties: Property[];
}
export interface ObjectProperty extends Property {
  properties: Property[];
}

export interface PropertyInputProps {
  propertyNames: string[];
  property: Property;
  update: (property: Property) => void;
  remove: (id: number) => void;
  addProperty?: () => void;
}

const PropertyInput: FC<PropertyInputProps> = ({
  propertyNames,
  property,
  update,
  remove,
  addProperty,
}) => {
  const [editing, toggleEditing] = useToggle(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setHasError } = useContext(hasErrorContext);

  const updatePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (
      (newName !== property.name && propertyNames.includes(newName)) ||
      newName.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    update({
      ...property,
      name: newName,
    });

    toggleEditing();
  };

  const checkReturnKeyToUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updatePropertyName(e as any);
    }
  };

  const toggleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...property,
      required: ev.target.checked,
    });
  };

  const typeChanged = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    update({
      ...property,
      type: ev.target.value as PROPERTY_TYPES,
    });
  };

  const removeProperty = () => {
    remove(property.id);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return (
    <div className="group flex-1 px-2 py-2 border-b flex items-center gap-4 hover:bg-gray-200 rounded-sm">
      {editing ? (
        <input
          className="outline-none rounded px-1 w-28"
          ref={inputRef}
          defaultValue={property.name}
          onBlur={updatePropertyName}
          onKeyDown={checkReturnKeyToUpdate}
          style={error ? { border: "1px solid red" } : {}}
        />
      ) : (
        <div className="p-0" onClick={toggleEditing}>
          {property.name}
        </div>
      )}
      <select
        value={property.type}
        className="bg-gray-200 p-1 font-bold text-gray-700 rounded text-sm"
        onChange={typeChanged}
      >
        {PROPERTY_TYPES_VALUES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {/* actions */}
      <div
        className={`group-hover:flex ml-auto 
      items-center gap-3 hidden`}
      >
        <Toggle
          checked={property.required}
          onChange={toggleChange}
          label="Required"
        />
        {property.type === PROPERTY_TYPES.OBJECT && (
          <IconButton icon="+" onClick={addProperty} />
        )}
        <IconButton
          icon={<img alt="trash" className="w-full h-full" src={TrashIcon} />}
          transparent
          onClick={removeProperty}
        />
      </div>
    </div>
  );
};

export default PropertyInput;
