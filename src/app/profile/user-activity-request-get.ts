export interface userActivity_show{
    id?: number;
    userActivityName?: string;
    picture_activity?: string;
    userId?: number[];
    userIdConfirmed?: number[];
    activityId?: number;
    date?: Date;
    is_started?: boolean;
    is_ended?: boolean;
    canceled?: boolean;
    createdAt?: string,
    updatedAt?: string,
    getEvent?: any[];
}