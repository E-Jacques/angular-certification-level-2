/**
 * In-memory implementation of the Storage interface. This can be used be used to simplify test around local storage.
 * 
 * @see Storage 
 */
export class InMemoryStorage implements Storage {
    [name: string]: any;

    get length(): number {
        return Object.keys(this.store).length;
    }

    private store: { [name: string]: string } = {};

    clear(): void {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] ?? null;
    }

    key(index: number): string | null {
        try {
            const key = Object.keys(this.store)[index];
            return this.getItem(key);
        } catch {
            return null;
        }
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }
}