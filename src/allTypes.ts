export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Todo = {
    title: string;
    description: string;
    completed: boolean;
    created_at: number;
    important: boolean;
    due_by: number | null;
    categories: Category[];
    cart: boolean;
    user_id: number;
    id: number;
};
export type TodoRequest = {
    title: string;
    description: string;
    completed: boolean;
    created_at: number;
    important: boolean;
    due_by: number | null;
    category_ids: string;
    cart: boolean;
};
export type Filters = {
    completion?: "completed" | "uncompleted" | "all";
    importance?: "important" | "all";
    dueBy?: Array<"overdue" | "dueToday" | "upcoming" | "unscheduled">;
    search?: string;
};
export type Category = {
    id: number;
    name: string;
    user_id: number;
    description: string | null;
};
export type CategoryRequest = {
    name: string;
    description: string | null;
};
export type User = {
    id: number;
    email: string;
    password_digest: string;
    created_at: string;
    updated_at?: string;
};

export type UserRequest = {
    email: string;
    password: string;
};
export type Alert = {
    id: number;
    msg: string;
    alertType: string;
};
export type PomoSetting = {
    pomodoroTime: number;
    breakTime: number;
    volume: number;
};
