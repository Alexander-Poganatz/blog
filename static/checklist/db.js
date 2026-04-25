/**
* Opens a connection to the checklist store and executes func.
* Func is expected to except the checklist store.
*/
function openAndProcessDBFunc(func) {
    const request = window.indexedDB.open("ChecklistDB", 1);
    const checklistStoreName = "checklist"
    request.onerror = function errorHandler(error) {
        console.error(error)
    }


    request.onupgradeneeded = function () {
        const db = request.result
        db.createObjectStore(checklistStoreName, { keyPath: "id" })
    }

    request.onsuccess = function() {
        const transaction = request.result.transaction(checklistStoreName, "readwrite")
        const store = transaction.objectStore(checklistStoreName)

        transaction.oncomplete = function() {
            request.result.close()
        }
        
        func(store)
    }
}
