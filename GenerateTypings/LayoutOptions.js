import ElkConstructor from "../../lib/main.js";

export class GenerateTypesForApi {
    constructor() { }
    elk = new ElkConstructor({});

    getInterfaceName(baseInterface, specializedName) {
        return (
            baseInterface +
            specializedName.charAt(0) +
            specializedName.slice(1).toLowerCase()
        );
    }

    async GenerateLayoutOptionsTypes() {
        const elkKnownOptions = await this.elk.knownLayoutOptions();
        const layoutOptions_str = "LayoutOptions";

        const targets = new Set();
        elkKnownOptions.forEach((element) => {
            element.targets?.forEach((target) => targets.add(target));
        });

        let generatedCode = "";

        targets.forEach((target) => {
            generatedCode += `export interface ${this.getInterfaceName(
                layoutOptions_str,
                target
            )} {
        ${elkKnownOptions
                    .filter((value) => value.targets?.includes(target))
                    .map(
                        (val) =>
                            `/** ${val.name}: \n* ${val.description}\n*/\n"${val.id?.slice(
                                "org.eclipse.".length
                            )}"?: ${val.type == "STRING"
                                ? "string"
                                : val.type == "DOUBLE"
                                    ? "number"
                                    : val.type == "INT"
                                        ? "number"
                                        : val.type == "BOOLEAN"
                                            ? "boolean"
                                            : "any"
                            }`
                    )
                    .join("\n")}
          
        
        [key: string]: any
      }\n\n`;
        });

        generatedCode += `export interface ${layoutOptions_str} extends ${[...targets]
            .map < string > ((target) =>
                this.getInterfaceName(layoutOptions_str, target)).join(", ")
            } { }`;

        return generatedCode;
    }
}
