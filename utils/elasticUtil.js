const elasticsearch = require('elasticsearch')
let client = new elasticsearch.Client({
    hosts: [CONFIG.elastic.url]
})

module.exports = {
    getStatus: async () => {
        try {
            let response = await client.cluster.health({})
            return response
        } catch (err) {
            throw new Error(err.message)
        }

    },
    // Create index
    initIndex: async (indexName) => {
        try {
            let response = await client.indices.create({
                index: indexName
            })
            console.log(response)
            return response
        } catch (err) {
            throw new Error(err.message)
        }
    },

    // Check if index exists
    indexExists: async (indexName) => {
        try {
            let response = await client.indices.exists({
                index: indexName
            })
            return response
        } catch (err) {
            throw new Error(err.message)
        }
    },
    // Preparing index and its mapping
    initMapping: async (indexName, docType, payload) => {
        try {
            let response = await client.indices.putMapping({
                index: indexName,
                type: docType,
                include_type_name: true,
                body: payload
            })
            return response
        } catch (err) {
            throw new Error(err.message)
        }
    },
    // Add/Update a document
    addOrUpdateDocument: async (indexName, _id, docType, payload) => {
        try {
            let response = await client.index({
                index: indexName,
                type: docType,
                id: _id,
                body: payload
            })
            return response
        } catch (err) {
            throw new Error(err.message)
        }
    },
    // Search
    search: async (indexName, docType, payload) => {
        try {
            let response = await client.search({
                index: indexName,
                type: docType,
                body: payload
            })
            return response
        } catch (err) {
            throw new Error(err.message)
        }
    },


    // Delete a document from an index
    deleteDocument: async (index, _id, docType) => {

        try {
            let response = await client.delete({
                index: index,
                type: docType,
                id: _id,
            })

            return response
        } catch (err) {
            throw new Error(err.message)
        }



    },

    // DANGER method, don't use this if no needed
    // Delete all
    deleteAll: async () => {
        try {
            let response = await client.indices.delete({
                index: '_all'
            })

            return response
        } catch (err) {
            throw new Error(err.message)
        }

    },

}