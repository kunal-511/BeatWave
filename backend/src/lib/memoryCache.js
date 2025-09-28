// Simple in-memory cache
class MemoryCache {
    constructor() {
        this.cache = new Map();
        this.sets = new Map(); // For Redis sets
        this.hashes = new Map(); // For Redis hashes
        this.sortedSets = new Map(); // For Redis sorted sets
        this.lists = new Map(); // For Redis lists
        this.expirations = new Map();
    }

    // Basic key-value operations
    async get(key) {
        if (this.isExpired(key)) {
            this.del(key);
            return null;
        }
        return this.cache.get(key) || null;
    }

    async set(key, value) {
        this.cache.set(key, value);
        return 'OK';
    }

    async setEx(key, seconds, value) {
        this.cache.set(key, value);
        this.expirations.set(key, Date.now() + (seconds * 1000));
        return 'OK';
    }

    async del(key) {
        this.cache.delete(key);
        this.sets.delete(key);
        this.hashes.delete(key);
        this.sortedSets.delete(key);
        this.lists.delete(key);
        this.expirations.delete(key);
        return 1;
    }

    // Set operations
    async sAdd(key, member) {
        if (!this.sets.has(key)) {
            this.sets.set(key, new Set());
        }
        this.sets.get(key).add(member);
        return 1;
    }

    async sRem(key, member) {
        if (this.sets.has(key)) {
            this.sets.get(key).delete(member);
            return 1;
        }
        return 0;
    }

    async sMembers(key) {
        if (this.sets.has(key)) {
            return Array.from(this.sets.get(key));
        }
        return [];
    }

    // Hash operations
    async hSet(key, field, value) {
        if (!this.hashes.has(key)) {
            this.hashes.set(key, new Map());
        }
        this.hashes.get(key).set(field, value);
        return 1;
    }

    async hGet(key, field) {
        if (this.hashes.has(key)) {
            return this.hashes.get(key).get(field) || null;
        }
        return null;
    }

    async hGetAll(key) {
        if (this.hashes.has(key)) {
            return Object.fromEntries(this.hashes.get(key));
        }
        return {};
    }

    async hDel(key, field) {
        if (this.hashes.has(key)) {
            this.hashes.get(key).delete(field);
            return 1;
        }
        return 0;
    }

    // Sorted set operations
    async zIncrBy(key, increment, member) {
        if (!this.sortedSets.has(key)) {
            this.sortedSets.set(key, new Map());
        }
        const current = this.sortedSets.get(key).get(member) || 0;
        this.sortedSets.get(key).set(member, current + increment);
        return current + increment;
    }

    async zRange(key, start, stop) {
        if (this.sortedSets.has(key)) {
            const sorted = Array.from(this.sortedSets.get(key).entries())
                .sort((a, b) => b[1] - a[1]) 
                .map(entry => entry[0]);

            if (start < 0) start = sorted.length + start;
            if (stop < 0) stop = sorted.length + stop;

            return sorted.slice(start, stop + 1);
        }
        return [];
    }

    // List operations
    async lPush(key, value) {
        if (!this.lists.has(key)) {
            this.lists.set(key, []);
        }
        this.lists.get(key).unshift(value);
        return this.lists.get(key).length;
    }

    async lTrim(key, start, stop) {
        if (this.lists.has(key)) {
            const list = this.lists.get(key);
            this.lists.set(key, list.slice(start, stop + 1));
        }
        return 'OK';
    }

    // Utility methods
    isExpired(key) {
        const expiration = this.expirations.get(key);
        if (expiration && Date.now() > expiration) {
            return true;
        }
        return false;
    }

    async connect() {
        console.log('Using in-memory cache');
        return Promise.resolve();
    }

    on(event, callback) {
        // Stub for event listeners
        if (event === 'connect') {
            setTimeout(() => callback(), 10);
        }
    }
}

export default new MemoryCache();