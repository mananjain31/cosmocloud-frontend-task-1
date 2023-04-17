import React, { FC, useEffect, useRef } from "react";
import { PROPERTY_TYPES, PROPERTY_TYPES_VALUES } from "../constants/enums";
import useToggle from "../hooks/useToggle";
import Toggle from "./Toggle";
import { IconButton } from "./Buttons";
import TrashIcon from "../assets/trashicon.svg";

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
  property: Property;
  update: (property: Property) => void;
  remove: (id: number) => void;
  addProperty?: () => void;
}

const PropertyInput: FC<PropertyInputProps> = ({
  property,
  update,
  remove,
  addProperty,
}) => {
  const [editing, toggleEditing] = useToggle(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updatePropertyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...property,
      name: e.target.value,
    });

    toggleEditing();
  };
  const checkReturnKeyToUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

  return (
    <div className="group flex-1 px-2 py-2 border-b flex gap-4 hover:bg-gray-200 rounded-sm">
      {editing ? (
        <input
          className="outline-none rounded px-2 w-32"
          ref={inputRef}
          defaultValue={property.name}
          onBlur={updatePropertyName}
          onKeyDown={checkReturnKeyToUpdate}
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
          <option value={type}>{type}</option>
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
