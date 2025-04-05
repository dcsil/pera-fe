export interface DashboardStats {
    overall: number;
    fluency_rating: number;
    count: number;
    streak: number;
    week_fluency: number;
    week_accuracy: number;
    week_pronunciation: number;
    percentile: number;
    week_reading_exercises: number;
    week_conversation_exercises: number;
    week_pronunciation_exercises: number;
}

export interface DashboardDataPoint {
    date: string;
    accuracy: number;
    fluency: number;
    pronunciation: number;
}

export interface DashboardApiResponse {
    stats: DashboardStats;
    data: DashboardDataPoint[];
}
