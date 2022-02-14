'use strict'
const db = require('./db')

exports.fetchIds = (tbl) => { //Ottiene Id di una tabella
    return new Promise((success, failure) => {
        const sql = `SELECT ID FROM ${tbl}`
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(-1)
                return
            }
            let vett = []
            rows.map((row) => {
                vett = vett.concat(row.ID)
            })
            success(vett)
        })
    })
}

exports.getCategories = () => {
    return new Promise((success, failure) => {
        const sql = 'SELECT * FROM CATEGORIES'
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const kats = rows.map((row) => ({
                ID: row.ID,
                name: row.name,
                image: row.image,
            }))
            success(kats)
        })
    })
}

exports.getCategory = (id) => {
    return new Promise((success, failure) => {
        const sql = `   SELECT *
                        FROM CATEGORIES
                        where ID=?
                        `
        db.get(sql, [id], (err, row) => {
            if (err) {
                failure(err)
                return
            }
            success(row)
        })
    })
}

exports.getSubCategories = (id) => {
    return new Promise((success, failure) => {
        let sql = ''
        if (id == 4) {
            sql = `SELECT *
                        FROM SUBCATEGORIES
                        where esse=?`
        } else {
            sql = `SELECT *
                        FROM SUBCATEGORIES
                        where catID=?`
        }
        db.all(sql, [id == 4 ? 1 : id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const skats = rows.map((row) => ({
                catID: row.catID,
                ID: row.ID,
                name: row.name,
                image: row.image,
                esse: row.esse
            }))
            success(skats)
        })
    })
}

exports.getCategoriesAndSubcategories = () => {
    return new Promise((success, failure) => {
        let kats = [];
        let sql = 'SELECT * FROM CATEGORIES';
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            kats = rows.map((row) => ({
                ID: row.ID,
                name: row.name,
                image: row.image,
            }))
        })
        sql = 'SELECT * FROM SUBCATEGORIES';
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            rows.forEach((row) => (kats.push({
                ID: row.ID,
                name: row.name,
                image: row.image,
                esse: row.esse,
                catID: row.catID
            })))
            success(kats)
        })
    })
}

exports.getGuide = (id) => {
    return new Promise((success, failure) => {
        const sql = `   SELECT text, imagepost
                        FROM SUBCATEGORIES
                        where ID=?
                        `
        db.get(sql, [id], (err, row) => {
            if (err) {
                failure(err)
                return
            }
            success(row)
        })
    })
}

exports.getTags = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT tag 
                        FROM POSTTAG LEFT JOIN TAGS
                        ON POSTTAG.tagID = TAGS.ID
                        where postID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            let tagz = []
            for (const r of rows) tagz.push(r.tag)
            success(tagz)
        })
    })
}

exports.deleteTags = (id) => {
    return new Promise((success, failure) => {
        const sql = 'DELETE FROM POSTTAG WHERE postID=?'
        db.run(sql, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        console.log('Deleted tags')
        success(null)
    })
}

exports.getAllTags = () => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM TAGS`
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const tags = rows.map((row) => ({
                ID: row.ID,
                tag: row.tag,
                parentTag: row.parentTag === null ? undefined : row.parentTag
            })
            )
            success(tags)
        })
    })
}

exports.getAllPosts = (filter) => {

    let filtersql = '';
    if (filter === 'declikes') {
        filtersql = ' ORDER BY likes DESC'
    }
    if (filter === 'decups') {
        filtersql = ' ORDER BY ups DESC'
    }
    if (filter === 'deccomments') {
        filtersql = ' ORDER BY comments DESC'
    }
    if (filter === 'newest') {
        filtersql = ' ORDER BY ID DESC'
    }

    return new Promise((success, failure) => {
        const sql = `SELECT * FROM FORUMPOST` + filtersql;
        db.all(sql, [], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const posts = rows.map((row) => ({
                ID: row.ID,
                author: row.author,
                text: row.text,
                likes: row.likes,
                dislikes: row.dislikes,
                ups: row.ups,
                comments: row.comments
            })
            )
            success(posts)
        })
    })
}

exports.getComments = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM COMMENTS
                        where postID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const comments = rows.map((row) => ({
                ID: row.ID,
                postID: id,
                userID: row.userID,
                text: row.text
            })
            )
            success(comments)
        })
    })
}

exports.getLiked = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM LIKED
                        where userID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const list = rows.map((row) => ({
                ID: row.ID,
                postID: row.postID,
                userID: id,
            })
            )
            success(list)
        })
    })
}

exports.getDisliked = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM DISLIKED
                        where userID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const list = rows.map((row) => ({
                ID: row.ID,
                postID: row.postID,
                userID: id,
            })
            )
            success(list)
        })
    })
}

exports.getSaved = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM SAVED
                        where userID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const list = rows.map((row) => ({
                ID: row.ID,
                postID: row.postID,
                userID: id,
            })
            )
            success(list)
        })
    })
}

exports.getSavedInfo = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM SAVED JOIN FORUMPOST
                        ON SAVED.postID = FORUMPOST.ID
                        where userID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const list = rows.map((row) => ({
                ID: row.ID,
                postID: row.postID,
                author: row.author,
                text: row.text,
                likes: row.likes,
                dislikes: row.dislikes,
                ups: row.ups,
                comments: row.comments
            })
            )
            success(list)
        })
    })
}

exports.getMine = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT * FROM FORUMPOST WHERE author=?`;
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const posts = rows.map((row) => ({
                ID: row.ID,
                author: row.author,
                text: row.text,
                likes: row.likes,
                dislikes: row.dislikes,
                ups: row.ups,
                comments: row.comments
            })
            )
            success(posts)
        })
    })
}

exports.getUpped = (id) => {
    return new Promise((success, failure) => {
        const sql = `SELECT *
                        FROM UPPED
                        where userID=?`
        db.all(sql, [id], (err, rows) => {
            if (err) {
                failure(err)
                return
            }
            const list = rows.map((row) => ({
                ID: row.ID,
                postID: row.postID,
                userID: id,
            })
            )
            success(list)
        })
    })
}

exports.getInfo = (id) => {
    return new Promise((success, failure) => {
        const sql = `   SELECT *
                        FROM USERS
                        where ID=?
                        `
        db.get(sql, [id], (err, row) => {
            if (err) {
                failure(err)
                return
            }
            success({
                id: row.ID,
                name: row.name,
                expert: row.expert ? "EXPERT" : "",
                icon: row.icon,
                nlog: row.nlog
            })
        })
    })
}

exports.updateAssociate = (val, id, i) => {
    return new Promise((resolve, reject) => {

        if (!(val === 'likes' || val === 'dislikes' || val === 'ups' || val === 'comments')) failure('Not a valid field to update')

        const sql = `UPDATE FORUMPOST SET ${val}=${val}+? WHERE ID = ?`
        db.run(sql, [i, id], function (err) {
            if (err) {
                reject(err);
                console.log("error in updateAssociate")
                return;
            }
            resolve(true);
        });
    });
};

exports.insertPost = (p) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO 
                        FORUMPOST(author, text, likes, dislikes, ups, comments)
                            VALUES(?,?,?,?,?,?)`
        db.run(sql,
            [
                p.author,
                p.text,
                0,
                0,
                0,
                0
            ],
            function (err) {
                if (err) {
                    reject(err)
                }
                resolve(this.lastID);
            })
    })
}

exports.modifyPost = (p) => {

    return new Promise((success, failure) => {
        const sql = `UPDATE FORUMPOST SET text=? WHERE ID=?`
        db.run(sql,
            [p.text, p.ID],
            (err) => {
                if (err) {
                    failure(err)
                    return
                }
                success(null)
            })
    })
}

exports.modifyComment = (p) => {
    return new Promise((success, failure) => {
        const sql = `UPDATE COMMENTS SET text=? WHERE ID=?`
        db.run(sql,
            [p.text, p.ID],
            (err) => {
                if (err) {
                    failure(err)
                    return
                }
                success(null)
            })
    })
}

exports.insertTags = (tags, id) => {
    return new Promise((success, failure) => {
        const sql = `INSERT INTO 
                        POSTTAG( postID, tagID)
                            VALUES(?,?)`
        for (const tag of tags) {
            db.run(sql,
                [`${id}`,
                `${tag}`

                ],
                (err) => {
                    if (err) {
                        failure(err)
                        return
                    }
                    success(null)
                })
        }
        success(null)
    })
}

exports.insertComment = (c) => {
    return new Promise((success, failure) => {
        const sql = `INSERT INTO 
                        COMMENTS(postID, userID, text)
                            VALUES(?,?,?)`
        db.run(sql,
            [
                c.postID,
                c.userID,
                c.text
            ],
            (err) => {
                if (err) {
                    failure(err)
                    return
                }
                success(null)
            })
    })
}

exports.associate = (ass, postID, userID, ID) => {
    return new Promise((success, failure) => {
        if (!(ass === 'LIKED' || ass === 'SAVED' || ass === 'DISLIKED' || ass === 'UPPED')) failure('Not a valid ASS')
        const sql = `INSERT INTO ${ass} (ID, userID, postID) VALUES(?,?,?)`
        db.run(sql,
            [
                ID,
                userID,
                postID
            ],
            (err) => {
                if (err) {
                    failure(err)
                    console.log("error in associate")
                    return
                }
                success(null)
            })
    })
}


exports.killPost = (id) => {
    return new Promise((success, failure) => {
        const sql = 'DELETE FROM FORUMPOST WHERE ID=?'
        db.run(sql, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql2 = 'DELETE FROM POSTTAG WHERE postID=?'
        db.run(sql2, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql3 = 'DELETE FROM UPPED WHERE postID=?'
        db.run(sql3, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql4 = 'DELETE FROM SAVED WHERE postID=?'
        db.run(sql4, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql5 = 'DELETE FROM LIKED WHERE postID=?'
        db.run(sql5, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql6 = 'DELETE FROM DISLIKED WHERE postID=?'
        db.run(sql6, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        const sql7 = 'DELETE FROM COMMENTS WHERE postID=?'
        db.run(sql7, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        console.log('Killed')
        success(null)
    })
}

exports.killComment = (id) => {
    return new Promise((success, failure) => {
        const sql = 'DELETE FROM COMMENTS WHERE ID=?'
        db.run(sql, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        console.log('Killed')
        success(null)
    })
}

exports.killAss = (ass, id) => {
    return new Promise((success, failure) => {
        if (!(ass === 'LIKED' || ass === 'SAVED' || ass === 'DISLIKED' || ass === 'UPPED')) failure('Not a valid ASS')
        const sql = `DELETE FROM ${ass} WHERE ID=?`
        db.run(sql, [id], (err) => {
            if (err) {
                failure(err)
                return
            }
        })
        success(null)
    })
}

exports.userLog = (id) => {

    return new Promise((success, failure) => {
        const sql = `UPDATE USERS SET nlog=1 WHERE ID=?`
        db.run(sql,
            [id],
            (err) => {
                if (err) {
                    failure(err)
                    return
                }
                success(null)
            })
    })
}