import { ReportStage } from "../../enums";
import { ReportHeader } from "./report-header.interface";

export interface GenerationStatus {
    ticketId: string;
    report: ReportHeader;
    user: string;
    startTime: Date;
    stage: ReportStage;
}
