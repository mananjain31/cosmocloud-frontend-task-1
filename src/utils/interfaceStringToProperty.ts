import { Property } from "../components/PropertyInput";
import { PROPERTY_TYPES } from "../constants/enums";

function turnIntoJSON(a: string): Record<string, any> {
  const splits = [];
  a = a.trim().slice(1, -1).replaceAll("\n", "").replaceAll('"', "");
  let start = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === ";") {
      splits.push(a.substring(start, i).trim());
      start = i + 1;
      i = start;
    }
    if (a[i] === "{") {
      let count = 1;
      while (count !== 0 && i < a.length) {
        i++;
        if (a[i] === "{") {
          count++;
        } else if (a[i] === "}") {
          count--;
        }
      }
      splits.push(a.substring(start, i + 1).trim());
      start = i + 2;
      i = start;
    }
  }
  const json: Record<string, any> = {};
  splits.forEach((x) => {
    const colonIndex = x.indexOf(":");
    let [key, value]: [string, string | Record<string, any>] = [
      x.substring(0, colonIndex),
      x.substring(colonIndex + 1, x.length),
    ];

    key = key.trim();

    value = value.trim();

    if (value.startsWith("{")) {
      value = turnIntoJSON(value);
    }
    json[key] = value;
  });
  return json;
}

function jsonToProperties(
  json: Record<string, any>,
  nextId: () => number
): Property[] {
  const returningProperties: Property[] = [];
  for (const key in json) {
    const id = nextId();
    const value = json[key];
    const required = !key.endsWith("?");
    const name = key.replace("?", "");
    const properties =
      typeof value === "string" ? [] : jsonToProperties(value, nextId);
    const type: PROPERTY_TYPES =
      typeof value === "string"
        ? (value.toUpperCase() as PROPERTY_TYPES)
        : ("OBJECT" as PROPERTY_TYPES);
    const property: Property = {
      id,
      name,
      type,
      required,
      properties,
    };

    returningProperties.push(property);
  }
  return returningProperties;
}

const idGenerator = () => {
  let id = 2;
  return () => id++;
};

const interfaceStringToProperty = (value: string): Property => {
  let val = value.trim();
  if (
    !(val.startsWith("{") || val.startsWith("interface")) ||
    !val.endsWith("}")
  )
    throw new Error("Invalid interface string");
  val = val.substring(val.indexOf("{"), val.lastIndexOf("}") + 1);
  const json: Record<string, any> = turnIntoJSON(val);
  const nextId = idGenerator();
  const property: Property = {
    id: nextId(),
    name: "root",
    type: "OBJECT" as PROPERTY_TYPES,
    required: true,
    properties: jsonToProperties(json, nextId),
  };
  return property;
};

export default interfaceStringToProperty;
