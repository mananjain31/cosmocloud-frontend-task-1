import { Property } from "../components/PropertyInput";
import { PROPERTY_TYPES } from "./enums";

export const defaultRootProperty: Property = {
  id: 0,
  name: "root",
  type: PROPERTY_TYPES.OBJECT,
  properties: [
    {
      id: 1,
      name: "name",
      type: PROPERTY_TYPES.STRING,
      required: true,
      properties: [],
    },
    {
      id: 3,
      name: "address",
      type: PROPERTY_TYPES.OBJECT,
      required: true,
      properties: [
        {
          id: 4,
          name: "pincode",
          type: PROPERTY_TYPES.NUMBER,
          required: true,
          properties: [],
        },
        {
          id: 5,
          name: "city",
          type: PROPERTY_TYPES.STRING,
          required: true,
          properties: [],
        },
        {
          id: 6,
          name: "state",
          type: PROPERTY_TYPES.STRING,
          required: true,
          properties: [],
        },
      ],
    },
    {
      id: 2,
      name: "age",
      type: PROPERTY_TYPES.NUMBER,
      required: true,
      properties: [],
    },
  ],
};
