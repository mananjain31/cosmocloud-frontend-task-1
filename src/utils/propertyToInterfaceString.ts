import { Property } from "../components/PropertyInput";
import { PROPERTY_TYPES_VALUES } from "../constants/enums";

export default function propertyToInterfaceString(
  propertyState: Property
): string {
  function recur(properties: Property[]) {
    const json: Record<string, any> = {};
    for (const property of properties) {
      const propertyName = `${property.name}${property.required ? "" : "?"}`;
      if (property.type === "OBJECT") {
        json[propertyName] = recur(property.properties);
      } else {
        json[propertyName] = property.type.toLocaleLowerCase();
      }
    }
    return json;
  }

  function removeQuotesFromTypes(text: string) {
    const propertyTypesValuesLowerCase = PROPERTY_TYPES_VALUES.map((value) =>
      value.toLowerCase()
    );
    let res = text;

    for (const propertyTypeValue of propertyTypesValuesLowerCase) {
      res = res.replaceAll(`"${propertyTypeValue}"`, propertyTypeValue);
    }
    return res;
  }

  const text = "interface MyInterface\n";
  const result = recur(propertyState.properties);
  const splits = JSON.stringify(result, null, 2).split("\n");
  const newSplits = splits.map((split) => {
    if (split.endsWith("{")) return split;
    if (split.endsWith(",") || split.endsWith("}"))
      return split.endsWith(",") ? (split = split.slice(0, -1) + ";") : split;
    else return split + ";";
  });
  const newResult = newSplits.join("\n");
  return text + removeQuotesFromTypes(newResult);
}
