export interface StoreRelevance {
  userId: string;
  timestamp: number;
}

export function newRelevance(userId: string): StoreRelevance {
  return {
    userId,
    timestamp: new Date().getTime()
  };
}
