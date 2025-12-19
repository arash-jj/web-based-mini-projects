// Card State
export const CardState = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    IN_REVIEW: 'in-review',
    DONE: 'done',
} as const;
export type CardState = typeof CardState[keyof typeof CardState];
// State order for progression
export const STATE_PROGRESSION: CardState[] = [
    CardState.TODO,
    CardState.IN_PROGRESS,
    CardState.IN_REVIEW,
    CardState.DONE,
];
// State styling configuration
export const STATE_CONFIG: Record<CardState, { label: string; color: string; bgColor: string }> = {
    [CardState.TODO]: {
        label: 'To Do',
        color: '#666',
        bgColor: '#f0f0f0',
    },
    [CardState.IN_PROGRESS]: {
        label: 'In Progress',
        color: '#ff9800',
        bgColor: '#fff3e0',
    },
    [CardState.IN_REVIEW]: {
        label: 'In Review',
        color: '#2196f3',
        bgColor: '#e3f2fd',
    },
    [CardState.DONE]: {
        label: 'Done',
        color: '#4caf50',
        bgColor: '#e8f5e9',
    },
};
// Sample cards data
export const INITIAL_CARDS = [
    { id: 1, title: 'Setup project', state: CardState.TODO, blocked: false },
    { id: 2, title: 'Design UI', state: CardState.IN_PROGRESS, blocked: true },
    { id: 3, title: 'Implement logic', state: CardState.IN_PROGRESS, blocked: false },
    { id: 4, title: 'Testing', state: CardState.IN_REVIEW, blocked: true },
    { id: 5, title: 'Deployment', state: CardState.TODO, blocked: false },
];
