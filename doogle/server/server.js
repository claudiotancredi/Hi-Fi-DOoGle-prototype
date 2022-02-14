'use strict'
const express = require('express')
const data = require('./database.js')
const morgan = require('morgan')

const app = express()
const port = 3001
app.use(morgan('dev'))
app.use(express.json())

/*** STATIC CONTENT ***/
//Serving static requests
app.use('/static', express.static('public'))


async function getId(tab) { //Creo un ID unico in base alla tabella passata
    try {
        let ids = await data.fetchIds(tab).catch(() => { console.log('upsies') })

        let result = 0
        do {
            result = Math.floor(Math.random() * 100)
        } while (ids.includes(result))
        return result
    } catch { return -1 }
}

// API

//TEST ID
app.get('/api/id/:tab', (req, res) => {
    getId(req.params.tab)
        .then(ris => res.status(200).json(ris))
        .catch((e) => res.status(500).send(e))
})

// Retrieve a list of all categories
app.get('/api/kats', (req, res) => {
    data.getCategories()
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Retrieve a category given its id
app.get('/api/kat/:catID', (req, res) => {
    data.getCategory(req.params.catID)
        .then(cat => res.status(200).json(cat))
        .catch((e) => res.status(500).send(e))
})

// Retrieve a list of all sub-categories given a category ID
app.get('/api/skats/:id', (req, res) => {
    data.getSubCategories(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

//Retrieve a list of all categories and subcategories
app.get('/api/allkats', (req, res) => {
    data.getCategoriesAndSubcategories()
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Retrieve text and image for a specific sub-category
app.get('/api/guide/:id', (req, res) => {
    data.getGuide(req.params.id)
        .then(ris => res.status(200).json(ris))
        .catch((e) => res.status(500).send(e))
})

// Retrieve a list of all forum posts
// Probabilmente è più semplice fare il filtering clientside tanto comunque la lista completa va scaricata 
// per mostrare nella homepage del forum il maggior numero possibile di post
app.get('/api/forum/:filter', (req, res) => {
    data.getAllPosts(req.params.filter)
        .then(posts => res.status(200).json(posts))
        .catch((e) => res.status(500).send(e))
})

app.get('/api/mine/:id', (req, res) => {
    data.getMine(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Retrieve a list of all tags belonging to one post
app.get('/api/tags/:id', (req, res) => {
    data.getTags(req.params.id)
        .then(tags => res.status(200).json(tags))
        .catch((e) => res.status(500).send(e))
})

app.get('/api/tags', (req, res) => {
    data.getAllTags()
        .then(tags => res.status(200).json(tags))
        .catch((e) => res.status(500).send(e))
})

// Get comments for a certain post
app.get('/api/comments/:id', (req, res) => {
    data.getComments(req.params.id)
        .then(coms => res.status(200).json(coms))
        .catch((e) => res.status(500).send(e))
})

// Get list of liked posts by a certain user using its id
app.get('/api/liked/:id', (req, res) => {
    data.getLiked(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Get list of saved posts by a certain user using its id
app.get('/api/saved/:id', (req, res) => {
    data.getSaved(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

app.get('/api/savedInfo/:id', (req, res) => {
    data.getSavedInfo(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})


// Get list of disliked posts by a certain user using its id
app.get('/api/disliked/:id', (req, res) => {
    data.getDisliked(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Get list of upped posts by a certain user using its id
app.get('/api/upped/:id', (req, res) => {
    data.getUpped(req.params.id)
        .then(list => res.status(200).json(list))
        .catch((e) => res.status(500).send(e))
})

// Get infos about a certain user using its id
app.get('/api/user/:id', (req, res) => {
    data.getInfo(req.params.id)
        .then(info => res.status(200).json(info))
        .catch((e) => res.status(500).send(e))
})
/*
// update dei valori in 'desync' (num commenti, likes, dislikes, saved and upped)
// Es. /api/ups/1/-1 diminuisce di 1 gli ups del post con ID=1
app.put('/api/:val/:id/:i', (req, res) => {
    data.update(req.params.val, req.params.id, req.params.i)
        .then(res.status(200).end())
        .catch((err) => res.status(503).json({ error: `Database error.` }))
})*/

// Insert new Post as the test user
// body {"text" : "Post di prova!", "tags":["0","4"]}
app.post('/api/addPost', async (req, res) => {
    const post = {
        author: req.body.author, //Test user
        text: req.body.text
    }
    try {
        let id = await data.insertPost(post)
        await data.insertTags(req.body.tags, id)
        res.status(201).send('Post Inserted')
    } catch (err) {
        res.status(500).json({ error: `Database error during the insertion of Post: ${err}` })
    }
})

// Modify Post as the test user
// body {"text" : "Post di prova!", "tags":["0","4"]}
app.post('/api/modifyPost', async (req, res) => {
    console.log("dal server", req.body)
    const post = {
        ID: req.body.ID,
        text: req.body.text
    }

    try {
        console.log("from server", post)
        await data.modifyPost(post)
        await data.deleteTags(req.body.ID)
        await data.insertTags(req.body.tags, req.body.ID)
        res.status(201).send('Post Modified')
    } catch (err) {
        res.status(500).json({ error: `Database error during the insertion of Post: ${err}` })
    }
})


app.post('/api/modifyComment', async (req, res) => {
    const comment = {
        ID: req.body.ID,
        text: req.body.text
    }

    try {
        await data.modifyComment(comment)
        res.status(201).send('Comment modified')
    } catch (err) {
        res.status(500).json({ error: `Database error during the insertion of Post: ${err}` })
    }
})


// DELETE association
// /api/LIKED/kill29

app.delete('/api/:ass/kill:code/:postid', async (req, res) => {
    const post = req.params.postid
    console.log("in server", post)
    try {
        if (req.params.ass === 'LIKED') { await data.updateAssociate('likes', req.params.postid, -1) }
        if (req.params.ass === 'DISLIKED') { await data.updateAssociate('dislikes', req.params.postid, -1) }
        if (req.params.ass === 'UPPED') { await data.updateAssociate('ups', req.params.postid, -1) }
        await data.killAss(req.params.ass, req.params.code)
        res.status(204).end()
    } catch {
        (err) => res.status(503).json({ error: `Database error` })
    }

});

//Insert new Comment to a Post as the test user
// body {"text" : "Post di prova!", "postID":"1"}
app.post('/api/addComment', async (req, res) => {
    const comment = {
        postID: req.body.postID,
        userID: req.body.userID,
        text: req.body.text
    }
    try {
        await data.insertComment(comment)
        await data.updateAssociate('comments', req.body.postID, +1)
        res.status(201).send('Comment Inserted')
    } catch (err) {
        res.status(500).json({ error: `Database error during the insertion of Comment: ${err}` })
    }
})

// Insert new Like/UP/Save/Dislike Association
// body {"val" : "LIKED", "id":"2"}
app.post('/api/associate', async (req, res) => {
    const fresh_id = await getId(req.body.VAL)
    try {

        if (req.body.VAL === 'LIKED') {
            await data.updateAssociate('likes', req.body.postID, +1)
        }
        if (req.body.VAL === 'DISLIKED') { await data.updateAssociate('dislikes', req.body.postID, +1) }
        if (req.body.VAL === 'UPPED') {
            await data.updateAssociate('ups', req.body.postID, +1)
        }
        await data.associate(req.body.VAL, req.body.postID, req.body.userID, fresh_id)
        res.status(201).send('Association Inserted')
    } catch (err) {
        res.status(500).json({ error: `Database error: ${err}` })
    }
})

app.post('/api/log/:id', async (req, res) => {
    try {
        await data.userLog(req.params.id)
        res.status(201).send('User logged for the first time')
    } catch (err) {
        res.status(500).json({ error: `Database error: ${err}` })
    }
})

// DELETE post
app.delete('/api/killpost/:code', (req, res) => {
    data.killPost(req.params.code)
        .then(res.status(204).end())
        .catch((err) => res.status(503).json({ error: `Database error` }))
});

// DELETE comment
app.delete('/api/killcomment/:code/:post', async (req, res) => {
    try {
        await data.killComment(req.params.code)
        await data.updateAssociate('comments', req.params.post, -1)
        res.status(204).send('Post Modified')
    } catch (err) {
        res.status(503).json({ error: `Database error during the insertion of Post: ${err}` })
    }
});




// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});