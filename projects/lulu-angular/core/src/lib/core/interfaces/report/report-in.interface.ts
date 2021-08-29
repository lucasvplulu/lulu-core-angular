import { ReportFormat } from "../../enums";
import { ParameterValue } from "./parameter-value.interface";

export interface ReportIn {
    id: string;
    format: ReportFormat;
    parameters?: ParameterValue[];
    timeToLive: number;
}
