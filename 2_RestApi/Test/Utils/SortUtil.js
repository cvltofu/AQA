export default class SortUtil {
    constructor() {}

    static async checkIsSortedById(postsData) {
        let id;
        let isSorted = false;

        for (const elem of postsData) {
            if (elem.id === 1) {
                id = elem.id;
                continue;
            }
            id < elem.id ? (isSorted = true) : (isSorted = false);
            id = elem.id;
        }

        return isSorted;
    }
}
