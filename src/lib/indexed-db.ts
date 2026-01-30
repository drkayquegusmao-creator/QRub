import { Question } from './data-mock'

const DB_NAME = 'qrub-database'
const DB_VERSION = 1
const STORE_NAME = 'questions'

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('IndexedDB not available in this environment'))
            return
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result

            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
                objectStore.createIndex('specialty', 'specialtyId', { unique: false })
                objectStore.createIndex('difficulty', 'difficulty', { unique: false })
            }
        }
    })
}

// Get all questions from IndexedDB
export const getAllQuestions = async (): Promise<Question[]> => {
    try {
        const db = await initDB()
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly')
            const objectStore = transaction.objectStore(STORE_NAME)
            const request = objectStore.getAll()

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result || [])
        })
    } catch (error) {
        console.error('Error getting questions from IndexedDB:', error)
        return []
    }
}

// Add a single question
export const addQuestion = async (question: Question): Promise<void> => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)
        const request = objectStore.add(question)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
    })
}

// Add multiple questions (batch)
export const addQuestions = async (questions: Question[]): Promise<void> => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)

        let completedCount = 0
        const totalCount = questions.length

        questions.forEach(question => {
            const request = objectStore.put(question) // Use 'put' to update if exists

            request.onsuccess = () => {
                completedCount++
                if (completedCount === totalCount) {
                    resolve()
                }
            }

            request.onerror = () => {
                console.error('Error adding question:', request.error)
                completedCount++
                if (completedCount === totalCount) {
                    resolve() // Continue even if some fail
                }
            }
        })

        // Handle case where no questions provided
        if (totalCount === 0) {
            resolve()
        }
    })
}

// Remove a question
export const removeQuestion = async (id: string): Promise<void> => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)
        const request = objectStore.delete(id)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
    })
}

// Update a question
export const updateQuestion = async (id: string, updates: Partial<Question>): Promise<void> => {
    const db = await initDB()
    return new Promise(async (resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)

        // First get the existing question
        const getRequest = objectStore.get(id)

        getRequest.onsuccess = () => {
            const existingQuestion = getRequest.result
            if (existingQuestion) {
                const updatedQuestion = { ...existingQuestion, ...updates }
                const putRequest = objectStore.put(updatedQuestion)

                putRequest.onerror = () => reject(putRequest.error)
                putRequest.onsuccess = () => resolve()
            } else {
                reject(new Error('Question not found'))
            }
        }

        getRequest.onerror = () => reject(getRequest.error)
    })
}

// Clear all questions
export const clearAllQuestions = async (): Promise<void> => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)
        const request = objectStore.clear()

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
    })
}

// Get question count
export const getQuestionCount = async (): Promise<number> => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const objectStore = transaction.objectStore(STORE_NAME)
        const request = objectStore.count()

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
    })
}
