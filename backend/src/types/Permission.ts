export interface Permission{
	readonly canEditRecords: boolean;
	readonly canViewAllRequests: boolean;
	readonly canChangeRequestStatus: boolean;
	readonly canManagePermissions: boolean;
}