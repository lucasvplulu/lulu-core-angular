import { ParameterDef } from "./parameter-def.interface";

export interface GetParametersOut {
    parameters: ParameterDef[];
    systemDefinedParameters: string[];
}
