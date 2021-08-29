import { ReportMenu } from "./report-menu.interface";
import { LookupParameter } from "./lookup-parameter.interface";

export interface Report {
    id: string;
    name: string;
    objectId: string;
    fileName: string;
    ownerDomain: string;
    ownerService: string;
    resourceName?: string;
    resourceCreated?: boolean;
    enabled?: boolean;
    tags?: string[];
    menuItems?: ReportMenu[];
    ttl?: number;
    creationUser?: string;
    creationTime?: Date;
    updateUser?: string;
    upDate?: Date;
    lookupParameters?: LookupParameter[];
    baseUrl?: string;
}
