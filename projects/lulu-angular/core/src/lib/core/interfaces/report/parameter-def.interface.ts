import { ParameterType } from "../../enums";

export interface ParameterDef {
    name: string;
    description?: string;
    type?: ParameterType;
    required?: boolean;
}
